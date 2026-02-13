import { createClient } from "@/lib/supabase/server";
import { hasAccess } from "@/lib/utils/tier";
import type { Assistant, Tier } from "@/types/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { assistantId } = (await request.json()) as { assistantId: string };

  if (!assistantId) {
    return new Response("Missing assistantId", { status: 400 });
  }

  // Load assistant and check tier
  const { data: assistant } = await supabase
    .from("assistants")
    .select("id, min_tier, name")
    .eq("id", assistantId)
    .single<Pick<Assistant, "id" | "min_tier" | "name">>();

  if (!assistant) {
    return new Response("Assistant not found", { status: 404 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single<{ tier: Tier }>();

  if (!hasAccess(profile?.tier ?? "dawn", assistant.min_tier)) {
    return new Response("Tier insufficient", { status: 403 });
  }

  // Create chat
  const { data: chat, error } = await supabase
    .from("chats")
    .insert({
      user_id: user.id,
      assistant_id: assistantId,
    })
    .select("id")
    .single();

  if (error || !chat) {
    return new Response("Failed to create chat", { status: 500 });
  }

  return NextResponse.json({ chatId: chat.id });
}
