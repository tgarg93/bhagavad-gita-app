// Account deletion (App Store Guideline 5.1.1(v)). The gateway enforces a valid
// Supabase JWT before this runs (verify_jwt = true); we take the subject from
// it and hard-delete that user with the service role. The `on delete cascade`
// FKs on user_data and ai_usage wipe all of the user's rows automatically, so
// deleting the auth user is the single source of truth for "erase me".
import { createClient } from "jsr:@supabase/supabase-js@2";

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

  // Gateway already verified the JWT signature; we only need the subject. A
  // caller can therefore only ever delete THEIR OWN account.
  const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  let userId: string;
  try {
    userId = JSON.parse(atob(jwt.split(".")[1])).sub;
    if (!userId) throw new Error("no sub");
  } catch {
    return json({ error: "unauthorized" }, 401);
  }

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) {
    console.error("delete-account failed:", error.message);
    return json({ error: "delete_failed" }, 500);
  }
  return json({ deleted: true });
});
