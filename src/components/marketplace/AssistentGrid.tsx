"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Assistant, Tier } from "@/types/database";
import { AssistentCard } from "./AssistentCard";

interface AssistentGridProps {
  assistants: Assistant[];
  userTier: Tier;
}

export function AssistentGrid({ assistants, userTier }: AssistentGridProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleClick(assistant: Assistant) {
    if (loading) return;
    setLoading(assistant.id);

    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantId: assistant.id }),
      });

      if (!res.ok) throw new Error("Failed to create chat");

      const { chatId } = await res.json();
      router.push(`/chat/${chatId}`);
    } catch {
      setLoading(null);
    }
  }

  if (assistants.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-phoro-text/40">
        Keine Assistenten in dieser Kategorie verfügbar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {assistants.map((assistant) => (
        <AssistentCard
          key={assistant.id}
          assistant={assistant}
          userTier={userTier}
          onClick={handleClick}
          loading={loading === assistant.id}
        />
      ))}
    </div>
  );
}
