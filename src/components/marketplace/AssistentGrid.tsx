"use client";

import { useRouter } from "next/navigation";
import type { Assistant, Tier } from "@/types/database";
import { AssistentCard } from "./AssistentCard";

interface AssistentGridProps {
  assistants: Assistant[];
  userTier: Tier;
}

export function AssistentGrid({ assistants, userTier }: AssistentGridProps) {
  const router = useRouter();

  function handleClick(assistant: Assistant) {
    // Phase 3: create chat and redirect
    // For now just log
    console.log("Start chat with:", assistant.slug);
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
        />
      ))}
    </div>
  );
}
