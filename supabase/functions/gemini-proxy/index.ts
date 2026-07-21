// Authenticated Gemini proxy. The Gemini API key lives ONLY here (supabase
// secrets); the app ships no AI credentials. The gateway enforces a valid
// Supabase JWT before this code runs (verify_jwt = true — anonymous users
// have real JWTs and pass). This is a dumb proxy by design: prompts and the
// Krishna persona stay client-built, so prompt iteration never needs a deploy.
import { createClient } from "jsr:@supabase/supabase-js@2";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
// gemini-2.0-flash: stable, non-thinking, with a far higher free-tier daily
// quota than the gemini-flash-latest alias (capped at 20 req/day). Override via
// the GEMINI_MODEL secret without a redeploy.
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-2.0-flash";
const MINUTE_LIMIT = Number(Deno.env.get("AI_MINUTE_LIMIT") ?? "10");
const DAY_LIMIT = Number(Deno.env.get("AI_DAY_LIMIT") ?? "60");
const MAX_BODY_BYTES = 64_000;

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!GEMINI_API_KEY) return json({ error: "proxy_not_configured" }, 500);

  // Gateway already verified the JWT signature; we only need the subject.
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  let userId: string;
  try {
    userId = JSON.parse(atob(jwt.split(".")[1])).sub;
    if (!userId) throw new Error("no sub");
  } catch {
    return json({ error: "unauthorized" }, 401);
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);
  let body: {
    contents?: unknown;
    generationConfig?: unknown;
    safetySettings?: unknown;
    stream?: boolean;
    warm?: boolean;
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  // Container warm-up: the caller just wants a live instance. Returns before
  // the rate-limit RPC and Gemini so it costs nothing but a cold start.
  if (body.warm === true) return json({ ok: true });

  if (!body.contents) return json({ error: "bad_request" }, 400);

  const { data: allowed, error: rpcError } = await admin.rpc(
    "check_and_increment_ai_usage",
    { p_user_id: userId, p_minute_limit: MINUTE_LIMIT, p_day_limit: DAY_LIMIT },
  );
  if (rpcError) {
    console.error("rate-limit rpc failed:", rpcError.message);
    return json({ error: "rate_limit_unavailable" }, 500);
  }
  if (!allowed) return json({ error: "rate_limited" }, 429);

  const geminiBody = JSON.stringify({
    contents: body.contents,
    ...(body.generationConfig ? { generationConfig: body.generationConfig } : {}),
    ...(body.safetySettings ? { safetySettings: body.safetySettings } : {}),
  });

  // Streaming path: pipe Gemini's SSE straight through so the client can render
  // tokens as they arrive. The chat surfaces opt in with { stream: true }; all
  // other callers (reflections, grading, summaries) fall through to the
  // buffered { text } path below, unchanged.
  if (body.stream === true) {
    const stream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: geminiBody,
      },
    );
    if (!stream.ok || !stream.body) {
      const detail = await stream.text().catch(() => "");
      console.error("gemini stream error", stream.status, detail.slice(0, 500));
      return json({ error: "upstream_error", status: stream.status }, 502);
    }
    return new Response(stream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  }

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: geminiBody,
    },
  );

  if (!upstream.ok) {
    const detail = await upstream.text();
    console.error("gemini upstream error", upstream.status, detail.slice(0, 500));
    return json({ error: "upstream_error", status: upstream.status }, 502);
  }

  const result = await upstream.json();
  const text: string = (result?.candidates?.[0]?.content?.parts ?? [])
    .map((p: { text?: string }) => p.text ?? "")
    .join("");
  if (!text) {
    // Safety block or empty candidate — surface the reason, never a blank reply
    const reason = result?.candidates?.[0]?.finishReason ?? result?.promptFeedback?.blockReason ?? "empty";
    return json({ error: "no_content", reason }, 502);
  }
  return json({ text });
});
