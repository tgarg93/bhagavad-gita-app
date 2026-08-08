// Remote win-back push (product-spec §4.1). Sends the day's Daily Chai atom to
// users whose LOCAL one-shot notification window has drained — the fully-dormant
// reader the local notifications can no longer reach.
//
// Unlike the per-user functions, this is a BATCH job with no user JWT: it's
// meant to be invoked by the pg_cron scheduler (or manually during testing), so
// verify_jwt = false and it is guarded instead by a shared secret header
// (x-cron-secret). It runs with the service role, which bypasses RLS to read the
// mirrored tokens and dormancy state.
//
// Content is precomputed by scripts/generate-winback-atoms.mjs into atoms.json
// (bundled at deploy time) so we reproduce getDailyAtom(date) exactly without
// running any RN code here. The deep-link `data` payload matches the local
// notifications, so App.tsx routes remote taps unchanged.
import { createClient } from "jsr:@supabase/supabase-js@2";
import atoms from "./atoms.json" with { type: "json" };

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Dormancy window (days) + re-ping cooldown. 30 = just past the 28-day local
// horizon, so remote never duplicates a locally-scheduled notification; 90 =
// stop nagging the long-gone; 30-day cooldown = at most a monthly touch.
const MIN_DAYS = Number(Deno.env.get("WINBACK_MIN_DAYS") ?? 30);
const MAX_DAYS = Number(Deno.env.get("WINBACK_MAX_DAYS") ?? 90);
const COOLDOWN_DAYS = Number(Deno.env.get("WINBACK_COOLDOWN_DAYS") ?? 30);

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";
const CHUNK = 100;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

type Target = { user_id: string; token: string };
type AtomEntry = { body: string; data: Record<string, unknown> };

// Today's atom (UTC date). Falls back to a generic win-back line if the
// precomputed window has run out (regenerate + redeploy atoms.json well ahead).
function todaysMessage(): { title: string; body: string; data: Record<string, unknown> } {
  const key = new Date().toISOString().slice(0, 10);
  const day = (atoms.days as Record<string, AtomEntry>)[key];
  if (day) return { title: atoms.title, body: day.body, data: day.data };
  return {
    title: atoms.title,
    body: "Your path is still here whenever you are. A few quiet minutes is all it takes.",
    data: { url: "journey" },
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  // Shared-secret guard (this function has no user JWT to verify).
  const secret = Deno.env.get("CRON_SECRET");
  if (!secret || req.headers.get("x-cron-secret") !== secret) {
    return json({ error: "unauthorized" }, 401);
  }

  const { data: targets, error } = await admin.rpc("dormant_push_targets", {
    p_min_days: MIN_DAYS,
    p_max_days: MAX_DAYS,
    p_cooldown_days: COOLDOWN_DAYS,
  });
  if (error) {
    console.error("dormant_push_targets failed:", error.message);
    return json({ error: "query_failed" }, 500);
  }

  const rows = (targets ?? []) as Target[];
  if (rows.length === 0) return json({ dormant: 0, sent: 0, pruned: 0 });

  const msg = todaysMessage();
  const sentUserIds: string[] = [];
  const deadTokens: string[] = [];

  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK);
    const messages = batch.map((r) => ({
      to: r.token,
      title: msg.title,
      body: msg.body,
      data: msg.data,
      channelId: "default",
      sound: null, // silent, matching the local handler
    }));

    let tickets: Array<{ status: string; details?: { error?: string } }> = [];
    try {
      const res = await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(messages),
      });
      const body = await res.json();
      tickets = body?.data ?? [];
    } catch (e) {
      console.error("expo push send failed:", (e as Error).message);
      continue; // leave this batch un-recorded; a later run retries it
    }

    // Tickets align to messages by index.
    batch.forEach((r, j) => {
      const t = tickets[j];
      if (t?.status === "ok") {
        sentUserIds.push(r.user_id);
      } else if (t?.details?.error === "DeviceNotRegistered") {
        deadTokens.push(r.user_id); // prune the dead token below
      }
    });
  }

  // Record the send so the cooldown holds; prune tokens Expo rejected.
  if (sentUserIds.length) {
    const now = new Date().toISOString();
    await admin
      .from("push_winback")
      .upsert(
        sentUserIds.map((user_id) => ({ user_id, last_sent_at: now })),
        { onConflict: "user_id" },
      );
  }
  if (deadTokens.length) {
    await admin
      .from("user_data")
      .delete()
      .eq("key", "push_registration")
      .in("user_id", deadTokens);
  }

  return json({ dormant: rows.length, sent: sentUserIds.length, pruned: deadTokens.length });
});
