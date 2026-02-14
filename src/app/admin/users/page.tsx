import { createClient } from "@/lib/supabase/server";
import { UsersTable } from "@/components/admin/UsersTable";
import type { Profile } from "@/types/database";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const [profilesResult, chatsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<Profile[]>(),
    supabase.from("chats").select("user_id"),
  ]);

  const profiles = profilesResult.data ?? [];
  const chats = chatsResult.data ?? [];

  const chatCounts = new Map<string, number>();
  for (const c of chats) {
    chatCounts.set(c.user_id, (chatCounts.get(c.user_id) ?? 0) + 1);
  }

  const users = profiles.map((p) => ({
    ...p,
    chatCount: chatCounts.get(p.id) ?? 0,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-phoro-primary">Benutzer</h1>
      <p className="mt-1 text-sm text-phoro-text/60">
        {profiles.length} registrierte Benutzer
      </p>
      <div className="mt-6">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
