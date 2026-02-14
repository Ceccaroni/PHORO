# PHORO – Projekt-Kontext für Claude Code

> **LIES MICH ZUERST.** Diese Datei ist dein Einstiegspunkt bei jeder Session.

## Was ist PHORO?
Schweizer SaaS-Plattform für pädagogische KI-Assistenten. Dreispaltige Web-App (Sidebar links: Chat-Historie | Mitte: Chat/Marketplace | Sidebar rechts: User + Kategorien). Spezialisierte Workflow-Assistenten für Lehrpersonen, Heilpädagog:innen und Schulleitungen in der Deutschschweiz.

## Aktueller Status
- **Phase:** 5 CODE FERTIG (Admin-Backend) – Migration 005+006 in Supabase ausführen, Storage-Bucket "knowledge" erstellen
- **Zuletzt abgeschlossen:** Phase 5 – Admin-Dashboard, Assistenten-CRUD, User-Verwaltung, Blog-CRUD, Knowledge-Upload
- **Nächster Schritt:** Migrationen 005+006 ausführen, E-Mail-Templates einfügen, Storage-Bucket erstellen, E2E-Test Phase 4+5
- **Bekannte Issues:** Next.js 16 Middleware-Deprecation-Warning (funktioniert noch)

## Tech Stack
Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Supabase (Auth + DB + Storage + MFA/TOTP, EU-Region) · Vercel AI SDK v4 (`@ai-sdk/react`) · Stripe (noch nicht integriert) · Vercel Hosting

## Die 5 wichtigsten Regeln
1. **Farben & Font:** Alles über CSS Custom Properties in `globals.css`. Font: Lexend (dyslexie-optimiert). Siehe `docs/BRIEFING.md` Abschnitt 6.
2. **LLM-Architektur:** Provider-agnostisch. Jeder Assistent wählt sein Modell. Routing über `src/lib/llm/router.ts`. Vercel AI SDK für Streaming.
3. **Sprache:** UI-Texte auf Deutsch. Code (Variablen, Kommentare, Commits) auf Englisch.
4. **Begriffe:** "Assistent" (nicht Bot/GPT/Agent), "Kategorie" (nicht Bereich), "Tier" (Dawn/Light/Beacon/Pharos), "Marketplace" (Assistenten-Übersicht).
5. **Am Ende jeder Session:** `docs/STATUS.md` aktualisieren, committen.

## Datenbank-Tabellen
- `profiles` – User mit Tier, Org-Zuordnung, Stripe-Referenz
- `assistants` – Name, Kategorie, Tier, Provider, Modell, Systemprompt, Knowledge-Files
- `chats` – Verknüpft User ↔ Assistent
- `chat_messages` – Einzelne Nachrichten (role: user/assistant/system)
- `blog_posts` – Blog-Beiträge (Titel, Slug, Content, Veröffentlichungsstatus)

## Dokumentation
| Datei | Inhalt |
|-------|--------|
| `docs/BRIEFING.md` | **Vollständiges Briefing** – alle Phasen, alle Details, Design-System, DB-Schema |
| `docs/STATUS.md` | **Aktueller Stand** – was ist fertig, was kommt als nächstes, offene Bugs |
| `docs/DECISIONS.md` | **Architektur-Entscheidungslog** – warum was wie entschieden wurde |
| `docs/EMAIL_TEMPLATES.md` | **E-Mail-Templates** – PHORO-gebrandete HTML für Supabase Auth E-Mails |
| `docs/phases/PHASE-X-COMPLETE.md` | **Abschluss-Doku** pro Phase |

## Phasenplan (Übersicht)
```
Phase 1 – Foundation          ← Setup, DB, Auth-Basis          [FERTIG]
Phase 2 – Core App Shell      ← 3-Spalten-Layout, Navigation   [FERTIG]
Phase 3 – Assistenten-Engine  ← LLM-Router, Chat, Streaming    [FERTIG ✓ E2E]
Phase 4 – Auth, Profil & 2FA  ← Passwort-Reset, Profil, 2FA    [CODE FERTIG]
Phase 4b – Stripe             ← Checkout, Webhooks, Tiers       [AUSSTEHEND]
Phase 5 – Admin-Backend       ← Gründer-Panel für Assistenten   [CODE FERTIG]
Phase 6 – Polish & Content    ← Blog, öffentliche Seiten
Phase 7 – Marketing-Page      ← Landing Page (wenn App läuft)
```

## Wenn du unsicher bist
Lies den passenden Abschnitt in `docs/BRIEFING.md`. Die Phasen sind nummeriert (8–14 = Phase 1–7). Dort steht alles im Detail, inklusive SQL-Schema, Komponenten-Struktur und Definition of Done.
