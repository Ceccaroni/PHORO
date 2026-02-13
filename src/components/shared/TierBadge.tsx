import type { Tier } from "@/types/database";
import { tierLabel } from "@/lib/utils/tier";

const tierColors: Record<Tier, string> = {
  dawn: "bg-tier-dawn/15 text-tier-dawn",
  light: "bg-tier-light/15 text-tier-light",
  beacon: "bg-tier-beacon/15 text-tier-beacon",
  pharos: "bg-tier-pharos/15 text-tier-pharos",
};

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] ${tierColors[tier]}`}
    >
      {tierLabel(tier)}
    </span>
  );
}
