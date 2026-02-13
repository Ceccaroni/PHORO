import { createClient } from "@/lib/supabase/server";
import { ChatEmptyState } from "@/components/chat/ChatEmptyState";

export default async function ChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user!.id)
    .single();

  const displayName = profile?.display_name ?? "dort";

  return <ChatEmptyState displayName={displayName} />;
}
