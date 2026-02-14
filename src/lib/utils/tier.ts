import type { Tier } from "@/types/database";

const TIER_ORDER: Record<Tier, number> = {
  dawn: 0,
  light: 1,
  beacon: 2,
  pharos: 3,
};

export function hasAccess(userTier: Tier, requiredTier: Tier): boolean {
  return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
}

export function tierLabel(tier: Tier): string {
  const labels: Record<Tier, string> = {
    dawn: "Dawn",
    light: "Light",
    beacon: "Beacon",
    pharos: "Pharos",
  };
  return labels[tier];
}

const TIER_COLORS: Record<Tier, string> = {
  dawn: "#E07A5F",
  light: "#1A3550",
  beacon: "#6B9080",
  pharos: "#C9A227",
};

export function tierColor(tier: Tier): string {
  return TIER_COLORS[tier];
}
