import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import type { Profile, Assistant, Chat } from "@/types/database";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile, chats, and featured assistants in parallel
  const [profileResult, chatsResult, featuredResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single<Profile>(),
    supabase
      .from("chats")
      .select("*, assistants(name)")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .returns<(Chat & { assistants: { name: string } })[]>(),
    supabase
      .from("assistants")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("sort_order")
      .returns<Assistant[]>(),
  ]);

  // Fallback profile if DB is not yet set up
  const profile: Profile = profileResult.data ?? {
    id: user.id,
    email: user.email ?? "",
    display_name: user.user_metadata?.display_name ?? user.email ?? "",
    tier: "dawn" as const,
    organization_name: null,
    organization_role: null,
    is_admin: false,
    stripe_customer_id: null,
    stripe_subscription_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const chats = (chatsResult.data ?? []).map((c) => ({
    ...c,
    assistant_name: c.assistants?.name,
  }));

  const featuredAssistants = featuredResult.data ?? [];

  return (
    <AppShell
      profile={profile}
      chats={chats}
      featuredAssistants={featuredAssistants}
    >
      {children}
    </AppShell>
  );
}
