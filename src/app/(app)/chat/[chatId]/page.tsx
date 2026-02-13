import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ActiveChat } from "@/components/chat/ActiveChat";
import type { ChatMessage as ChatMessageType } from "@/types/database";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Load chat with assistant info
  const { data: chat } = await supabase
    .from("chats")
    .select("*, assistants(id, name, slug)")
    .eq("id", chatId)
    .eq("user_id", user!.id)
    .single();

  if (!chat) {
    notFound();
  }

  // Load messages
  const { data: messages } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })
    .returns<ChatMessageType[]>();

  return (
    <ActiveChat
      chatId={chatId}
      assistantId={chat.assistant_id}
      assistantName={chat.assistants?.name ?? "Assistent"}
      initialMessages={messages ?? []}
    />
  );
}
