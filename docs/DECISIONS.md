# PHORO – Architektur-Entscheidungen

Dieses Dokument hält alle wichtigen Architektur-Entscheidungen fest. Neue Einträge werden oben angefügt.

---

## ADR-005: Bezahlstrategie (2026-02-13)
**Entscheidung:** Stripe für Kreditkartenzahlung (Light-Tier). Beacon/Pharos per manueller Rechnung. Twint und SEPA perspektivisch.
**Begründung:** Schulen und Gemeinden zahlen in der Schweiz per Rechnung – das ist Branchenstandard. Für Einzelpersonen (Light) ist Stripe am schnellsten integriert. Twint hat noch keine stabile Stripe-Integration, daher MVP ohne Twint.

## ADR-004: Hosting-Strategie (2026-02-13)
**Entscheidung:** Vercel (Frontend) + Supabase EU/Frankfurt (Backend). Migration auf Schweizer Hosting wenn institutionelle Kunden (Beacon/Pharos) es erfordern.
**Begründung:** Kosteneffizient, schnell deploybar, EU-Datenresidenz. Supabase ist Open Source und later self-hostbar. Swisscom Cloud ist für MVP überdimensioniert.

## ADR-003: LLM-Agnostische Architektur (2026-02-13)
**Entscheidung:** Jeder Assistent kann individuell konfiguriert werden (Provider, Modell, Temperatur). Routing über zentralen LLM-Router mit Vercel AI SDK.
**Begründung:** Gründer will Flexibilität pro Assistent. Kein Lock-in bei OpenAI. Verschiedene Tasks brauchen verschiedene Modelle. Vercel AI SDK abstrahiert die Provider-Unterschiede elegant.

## ADR-002: Supabase als Backend (2026-02-13)
**Entscheidung:** Supabase (PostgreSQL + Auth + Storage + Realtime) statt eigenes Backend.
**Begründung:** Integrierte Auth mit 2FA-Support, Row Level Security, EU-Region verfügbar, schneller MVP-Aufbau, kein separater Auth-Service nötig. Open Source = Exit-Strategie vorhanden.

## ADR-001: Next.js App Router + TypeScript + Tailwind (2026-02-13)
**Entscheidung:** Next.js 14+ mit App Router als Framework. TypeScript im strict mode. Tailwind CSS für Styling.
**Begründung:** Server Components für DB-Zugriff, integrierte API Routes, Edge Runtime für Streaming, exzellentes Vercel-Deployment. TypeScript für Typsicherheit (Gründer ist kein Programmierer, Code muss selbsterklärend sein). Tailwind für konsistentes Design-System mit Custom Properties.
