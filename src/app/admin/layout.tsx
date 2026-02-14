import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Profile } from "@/types/database";

export default async function AdminLayout({
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, display_name, email")
    .eq("id", user.id)
    .single<Pick<Profile, "is_admin" | "display_name" | "email">>();

  if (!profile?.is_admin) {
    redirect("/chat");
  }

  const userName = profile.display_name ?? profile.email ?? user.email ?? "";

  return <AdminShell userName={userName}>{children}</AdminShell>;
}
