"use client";

import { Lock } from "lucide-react";
import type { Assistant, Tier } from "@/types/database";
import { TierBadge } from "@/components/shared/TierBadge";
import { hasAccess, tierLabel } from "@/lib/utils/tier";

interface AssistentCardProps {
  assistant: Assistant;
  userTier: Tier;
  onClick: (assistant: Assistant) => void;
}

export function AssistentCard({
  assistant,
  userTier,
  onClick,
}: AssistentCardProps) {
  const locked = !hasAccess(userTier, assistant.min_tier);

  function handleClick() {
    if (locked) return;
    onClick(assistant);
  }

  return (
    <button
      onClick={handleClick}
      disabled={locked}
      className={`relative w-full rounded-2xl border border-phoro-divider bg-white p-5 text-left transition-all duration-200 ${
        locked
          ? "cursor-not-allowed opacity-45 grayscale"
          : "hover:shadow-md hover:scale-[1.02]"
      }`}
    >
      {locked && (
        <Lock
          size={16}
          className="absolute right-4 top-4 text-phoro-text/40"
        />
      )}

      <div className="mb-3">
        <TierBadge tier={assistant.min_tier} />
      </div>

      <h3 className="text-base font-bold text-phoro-primary">
        {assistant.name}
      </h3>

      <p className="mt-1 text-sm text-phoro-text/60 line-clamp-2">
        {assistant.description}
      </p>

      {locked && (
        <p className="mt-3 text-xs text-phoro-text/40">
          Ab PHORO {tierLabel(assistant.min_tier)} verfügbar
        </p>
      )}
    </button>
  );
}
