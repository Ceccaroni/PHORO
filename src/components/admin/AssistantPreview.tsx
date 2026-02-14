"use client";

import { TierBadge } from "@/components/shared/TierBadge";
import type { Tier } from "@/types/database";

interface AssistantPreviewProps {
  name: string;
  description: string;
  minTier: Tier;
}

export function AssistantPreview({
  name,
  description,
  minTier,
}: AssistantPreviewProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-phoro-text">
        Vorschau (Marketplace-Kachel)
      </label>
      <div className="mt-2 w-full max-w-xs">
        <div className="rounded-2xl border border-phoro-divider bg-white p-5">
          <div className="mb-3">
            <TierBadge tier={minTier} />
          </div>
          <h3 className="text-base font-bold text-phoro-primary">
            {name || "Name des Assistenten"}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-phoro-text/60">
            {description || "Beschreibung des Assistenten"}
          </p>
        </div>
      </div>
    </div>
  );
}
