# PHORO – Session Status

## Letzte Session
- **Datum:** 2026-02-14
- **Phase:** 3 (Assistenten-Engine) – CODE FERTIG
- **Bearbeiter:** Claude Opus 4.6

## Was wurde erledigt
### Phase 1 (Foundation) – FERTIG
- Next.js 16, Tailwind v4, Supabase Client, Auth, DB-Migrationen, Typen

### Phase 2 (Core App Shell) – FERTIG
- AppShell, Sidebars, Marketplace, AssistentCard, ChatInput, responsive Layout

### Phase 3 (Assistenten-Engine) – CODE FERTIG
- LLM-Router (`src/lib/llm/router.ts`): Provider-agnostisch via Vercel AI SDK v6, OpenAI + Anthropic
- Prompt-Sicherheit: Automatischer `[SYSTEM SAFETY BLOCK]` um jeden Systemprompt (Anfang + Ende), dokumentiert in BRIEFING.md Abschnitt 17
- Chat-API-Route (`/api/chat`): Auth, Tier-Check, Chat-Verlauf aus DB, UIMessageStream-Streaming, speichert User- und Assistenten-Nachrichten, Auto-Titel nach erstem Austausch
- Chat-Erstellungs-API (`/api/chats`): Erstellt neuen Chat mit Tier-Prüfung
- ActiveChat-Komponente: AI SDK v6 (`DefaultChatTransport` + `sendMessage`), Streaming-Anzeige, Scroll-to-bottom
- ChatMessage-Komponente: User rechts (Pharos-Blau), Assistent links (weiss), Markdown-Rendering (Überschriften, Listen, Code-Blöcke, Fett/Kursiv)
- Chat-Seite `/chat/[chatId]`: Lädt Chat + Messages aus DB, rendert ActiveChat
- AssistentCard/Grid: Erstellen echte Chats via `/api/chats` und navigieren zu `/chat/[chatId]`, Loading-State mit Spinner
- Seed-Daten (`supabase/seed.sql`): Alle 45 Assistenten aus dem Briefing (15 Unterricht, 15 Leadership, 15 Admin), Inklusions-Architekt aktiv + featured mit vollem Systemprompt, Rest inaktiv
- AI SDK v6 Kompatibilität: `@ai-sdk/react`, `sendMessage`, `DefaultChatTransport`, `toUIMessageStreamResponse`, `maxOutputTokens`
- Build erfolgreich (`npm run build` ohne Fehler)

## Nächster Schritt (PRÄZISE)
**Supabase einrichten (manuell durch Gründer):**
1. Supabase-Projekt erstellen auf supabase.com (EU-Region Frankfurt)
2. `.env.local` anlegen mit den Keys aus dem Supabase-Dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```
3. Im Supabase SQL Editor die Migrationen der Reihe nach ausführen:
   - `supabase/migrations/001_profiles.sql`
   - `supabase/migrations/002_assistants.sql`
   - `supabase/migrations/003_chats.sql`
4. Dann `supabase/seed.sql` ausführen (45 Assistenten)
5. `npm run dev` starten, registrieren, einloggen, Marketplace öffnen, Chat mit Inklusions-Architekt testen
6. Für Chat-Streaming: `OPENAI_API_KEY` in `.env.local` setzen

**Danach Phase 4:** Auth, Tiers & Payments (Stripe, 2FA, Profil-Seite)
Details: `docs/BRIEFING.md` Abschnitt 11 (Phase 4)

## Bekannte Issues
- Next.js 16 Middleware-Deprecation-Warning (funktioniert noch)
- Supabase noch nicht verbunden (`.env.local` muss eingerichtet werden)

## Geänderte Dateien in Session 2
- `src/lib/llm/router.ts` (neu – LLM-Router mit Safety Block)
- `src/lib/llm/types.ts` (neu)
- `src/app/api/chat/route.ts` (neu – Chat-Streaming-Endpoint)
- `src/app/api/chats/route.ts` (neu – Chat-Erstellungs-Endpoint)
- `src/app/(app)/chat/[chatId]/page.tsx` (neu – aktiver Chat)
- `src/components/chat/ActiveChat.tsx` (neu – Streaming-UI)
- `src/components/chat/ChatMessage.tsx` (neu – Nachrichtenanzeige)
- `src/components/chat/ChatEmptyState.tsx` (neu)
- `src/components/chat/ChatInput.tsx` (neu)
- `src/components/layout/AppShell.tsx` (neu)
- `src/components/layout/Sidebar.tsx` (neu)
- `src/components/layout/RightPanel.tsx` (neu)
- `src/components/layout/Header.tsx` (neu)
- `src/components/marketplace/AssistentCard.tsx` (neu + aktualisiert)
- `src/components/marketplace/AssistentGrid.tsx` (neu + aktualisiert)
- `src/components/shared/TierBadge.tsx` (neu)
- `src/lib/utils/tier.ts` (neu)
- `src/app/(app)/layout.tsx` (überarbeitet – AppShell mit Daten)
- `src/app/(app)/marketplace/[category]/page.tsx` (neu)
- `docs/BRIEFING.md` (aktualisiert – Prompt-Sicherheitsregel)
- `supabase/seed.sql` (neu – 45 Assistenten)
- `package.json` (aktualisiert – @ai-sdk/react)

---

## Session-Verlauf (chronologisch)

### Session 1 – 2026-02-13
- Briefing erstellt
- Status: Pre-Development → Bereit für Phase 1

### Session 2 – 2026-02-14
- Phase 1 (Foundation) komplett umgesetzt
- Phase 2 (Core App Shell) komplett umgesetzt
- Phase 3 (Assistenten-Engine) Code komplett: LLM-Router, Chat-API, Streaming, 45 Seed-Assistenten
- Prompt-Sicherheit implementiert (automatischer Safety Block)
- AI SDK v6 Breaking Changes behoben
- Status: Phase 1–3 Code fertig → Supabase-Setup + End-to-End-Test ausstehend
