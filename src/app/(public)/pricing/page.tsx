import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "PHORO Tiers im Vergleich: Dawn (kostenlos), Light, Beacon und Pharos. KI-Assistenten für Bildungsprofis in der Schweiz.",
};

interface TierInfo {
  name: string;
  price: string;
  period: string;
  audience: string;
  color: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
}

const tiers: TierInfo[] = [
  {
    name: "Dawn",
    price: "0 CHF",
    period: "Kostenlos",
    audience: "Zum Kennenlernen",
    color: "#E07A5F",
    features: [
      "Zugriff auf Dawn-Assistenten",
      "Alle 3 Kategorien",
      "Unbegrenzte Chats",
      "Chat-Verlauf",
    ],
    cta: "Kostenlos starten",
    ctaHref: "/register",
  },
  {
    name: "Light",
    price: "19 CHF",
    period: "pro Monat",
    audience: "Für einzelne Lehrpersonen",
    color: "#1A3550",
    features: [
      "Alle Dawn-Assistenten",
      "Light-Assistenten freigeschaltet",
      "Erweiterte Workflows",
      "Prioritäts-Support",
    ],
    cta: "Upgrade auf Light",
    ctaHref: "/register",
    highlight: true,
  },
  {
    name: "Beacon",
    price: "Ab 2'400 CHF",
    period: "pro Jahr",
    audience: "Für Schulhäuser (15–35 LP)",
    color: "#6B9080",
    features: [
      "Alle Light-Assistenten",
      "Beacon-Assistenten freigeschaltet",
      "Teambasierte Nutzung",
      "Schulhaus-weite Lizenz",
      "Onboarding-Support",
    ],
    cta: "Kontakt aufnehmen",
    ctaHref: "/contact",
  },
  {
    name: "Pharos",
    price: "Ab 11'900 CHF",
    period: "pro Jahr",
    audience: "Für Gemeinden (80–180 LP)",
    color: "#C9A227",
    features: [
      "Alle Assistenten freigeschaltet",
      "Gemeinde-weite Lizenz",
      "Dedizierter Ansprechpartner",
      "Individuelle Anpassungen",
      "SLA-Garantie",
    ],
    cta: "Kontakt aufnehmen",
    ctaHref: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-phoro-primary">Preise</h1>
        <p className="mt-3 text-sm text-phoro-text/60">
          Vier Tiers für jede Schulgrösse. Starten Sie kostenlos mit Dawn.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-2xl border bg-white p-6 ${
              tier.highlight
                ? "border-phoro-primary shadow-md"
                : "border-phoro-divider"
            }`}
          >
            {/* Tier badge */}
            <span
              className="inline-block self-start rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                backgroundColor: `${tier.color}22`,
                color: tier.color,
              }}
            >
              {tier.name}
            </span>

            {/* Price */}
            <p className="mt-4 text-2xl font-bold text-phoro-primary">
              {tier.price}
            </p>
            <p className="text-xs text-phoro-text/50">{tier.period}</p>

            {/* Audience */}
            <p className="mt-3 text-sm text-phoro-text/70">{tier.audience}</p>

            {/* Features */}
            <ul className="mt-6 flex-1 space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-phoro-text/70">
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                    style={{ color: tier.color }}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={tier.ctaHref}
              className="mt-6 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: tier.color }}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-phoro-text/40">
        Alle Preise in CHF, exkl. MwSt. Beacon und Pharos auf Anfrage.
        Jahreslizenz Light: 190 CHF/Jahr (2 Monate gratis).
      </p>
    </div>
  );
}
