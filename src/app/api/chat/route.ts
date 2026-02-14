import { createClient } from "@/lib/supabase/server";
import { streamLLMResponse, generateChatTitle } from "@/lib/llm/router";
import { hasAccess } from "@/lib/utils/tier";
import type { Assistant, Tier } from "@/types/database";
import type { ChatMessageInput } from "@/lib/llm/types";

export async function POST(request: Request) {
  const supabase = await createClient();

  // 1. Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // useChat sends: { messages, ...body }
  // AI SDK v6 uses "parts" instead of "content" for message text
  const body = await request.json();
  const { messages: clientMessages, chatId, assistantId } = body as {
    messages: {
      role: string;
      content?: string;
      parts?: { type: string; text?: string }[];
    }[];
    chatId: string;
    assistantId: string;
  };

  if (!chatId || !assistantId || !clientMessages?.length) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Get the latest user message
  const lastMsg = clientMessages[clientMessages.length - 1];
  if (lastMsg.role !== "user") {
    return new Response("Last message must be from user", { status: 400 });
  }

  // Extract text: AI SDK v6 uses parts[], fallback to content
  const lastMessageContent =
    lastMsg.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("") || lastMsg.content || "";

  if (!lastMessageContent) {
    return new Response("Empty message", { status: 400 });
  }

  // 2. Load assistant config
  const { data: assistant } = await supabase
    .from("assistants")
    .select("*")
    .eq("id", assistantId)
    .single<Assistant>();

  if (!assistant) {
    return new Response("Assistant not found", { status: 404 });
  }

  // 3. Check tier access
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single<{ tier: Tier }>();

  if (!hasAccess(profile?.tier ?? "dawn", assistant.min_tier)) {
    return new Response(
      `Dieser Assistent ist ab PHORO ${assistant.min_tier} verfügbar.`,
      { status: 403 }
    );
  }

  // 4. Verify chat belongs to user
  const { data: chat } = await supabase
    .from("chats")
    .select("id, user_id")
    .eq("id", chatId)
    .single();

  if (!chat || chat.user_id !== user.id) {
    return new Response("Chat not found", { status: 404 });
  }

  // 5. Save user message to DB
  const { error: insertError } = await supabase.from("chat_messages").insert({
    chat_id: chatId,
    role: "user",
    content: lastMessageContent,
  });

  if (insertError) {
    return new Response("Failed to save message", { status: 500 });
  }

  // 6. Build messages for LLM (from DB for full history)
  const { data: history } = await supabase
    .from("chat_messages")
    .select("role, content")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  const messages: ChatMessageInput[] = (history ?? []).map((m) => ({
    role: m.role as ChatMessageInput["role"],
    content: m.content,
  }));

  // 7. Stream LLM response
  const result = streamLLMResponse(
    {
      provider: assistant.provider,
      model: assistant.model,
      systemPrompt: assistant.system_prompt,
      temperature: assistant.temperature,
      maxTokens: assistant.max_tokens,
    },
    messages
  );

  // 8. Return streaming response and save after completion
  const response = result.toUIMessageStreamResponse();

  result.text.then(async (fullText) => {
    // Save assistant message
    await supabase.from("chat_messages").insert({
      chat_id: chatId,
      role: "assistant",
      content: fullText,
    });

    // Update chat timestamp
    await supabase
      .from("chats")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", chatId);

    // Generate title after first exchange
    const { count } = await supabase
      .from("chat_messages")
      .select("*", { count: "exact", head: true })
      .eq("chat_id", chatId);

    if (count === 2) {
      try {
        const title = await generateChatTitle(lastMessageContent, fullText);
        await supabase.from("chats").update({ title }).eq("id", chatId);
      } catch {
        // Title generation is non-critical
      }
    }
  });

  return response;
}
