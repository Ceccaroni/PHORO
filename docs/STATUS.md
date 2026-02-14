# PHORO – Session Status

## Letzte Session
- **Datum:** 2026-02-14
- **Phase:** 3 (Assistenten-Engine) – IN ARBEIT
- **Bearbeiter:** Claude Opus 4.6

## Was wurde erledigt
### Phase 1 (Foundation) – FERTIG
- Next.js 16, Tailwind v4, Supabase Client, Auth, DB-Migrationen, Typen

### Phase 2 (Core App Shell) – FERTIG
- AppShell, Sidebars, Marketplace, AssistentCard, ChatInput, responsive Layout

### Phase 3 (Assistenten-Engine) – IN ARBEIT
**Fertig:**
- LLM-Router (`src/lib/llm/router.ts`): Provider-agnostisch via Vercel AI SDK v6, OpenAI + Anthropic
- Prompt-Sicherheit: Jeder Systemprompt wird automatisch mit `[SYSTEM SAFETY BLOCK]` umschlossen (Anfang + Ende) – verhindert Prompt-Leaking. Dokumentiert in BRIEFING.md Abschnitt 17.
- LLM-Typen (`src/lib/llm/types.ts`): LLMConfig, ChatMessageInput
- Chat-API-Route (`/api/chat`): Auth, Tier-Check, Chat-Verlauf aus DB, UIMessageStream-Streaming, speichert User- und Assistenten-Nachrichten, Auto-Titel nach erstem Austausch
- Chat-Erstellungs-API (`/api/chats`): Erstellt neuen Chat mit Tier-Prüfung
- ActiveChat-Komponente: `useChat` Hook (AI SDK v6 mit `DefaultChatTransport` + `sendMessage`), Streaming-Anzeige, Scroll-to-bottom
- ChatMessage-Komponente: User rechts (Pharos-Blau), Assistent links (weiss), Markdown-Rendering
- Chat-Seite `/chat/[chatId]`: Lädt Chat + Messages aus DB, rendert ActiveChat
- AssistentCard/Grid: Erstellen jetzt echte Chats via API und navigieren zu `/chat/[chatId]`
- AI SDK v6 Kompatibilität: `@ai-sdk/react`, `sendMessage`, `DefaultChatTransport`, `toUIMessageStreamResponse`, `maxOutputTokens`
- Build erfolgreich (`npm run build` ohne Fehler)

**Noch offen:**
- Seed-SQL mit Test-Assistent (z.B. Inklusions-Architekt)
- Supabase muss eingerichtet werden für End-to-End-Test

## Nächster Schritt (PRÄZISE)
1. `supabase/seed.sql` erstellen mit mindestens einem Test-Assistenten
2. Supabase-Projekt erstellen (EU), `.env.local` setzen, Migrationen + Seed ausführen
3. End-to-End testen: Registrieren → Login → Marketplace → Chat starten → Streaming

**Dann Phase 4:** Auth, Tiers & Payments
Details: `docs/BRIEFING.md` Abschnitt 11 (Phase 4)

## Bekannte Issues
- Next.js 16 Middleware-Deprecation-Warning (funktioniert noch)
- Supabase noch nicht verbunden (`.env.local` muss eingerichtet werden)

## Geänderte Dateien in letzter Session
- `src/lib/llm/router.ts` (neu + aktualisiert – Safety Block, AI SDK v6 Fixes)
- `src/lib/llm/types.ts` (neu)
- `src/app/api/chat/route.ts` (neu + aktualisiert – UIMessageStreamResponse)
- `src/app/api/chats/route.ts` (neu)
- `src/app/(app)/chat/[chatId]/page.tsx` (neu)
- `src/components/chat/ActiveChat.tsx` (neu + aktualisiert – AI SDK v6 API)
- `src/components/chat/ChatMessage.tsx` (neu)
- `src/components/marketplace/AssistentCard.tsx` (aktualisiert – loading state)
- `src/components/marketplace/AssistentGrid.tsx` (aktualisiert – echte Chat-Erstellung)
- `docs/BRIEFING.md` (aktualisiert – Prompt-Sicherheitsregel Abschnitt 17)
- `package.json` (aktualisiert – @ai-sdk/react hinzugefügt)

---

## Session-Verlauf (chronologisch)

### Session 1 – 2026-02-13
- Briefing erstellt
- Status: Pre-Development → Bereit für Phase 1

### Session 2 – 2026-02-14
- Phase 1 (Foundation) komplett umgesetzt
- Phase 2 (Core App Shell) komplett umgesetzt
- Phase 3 (Assistenten-Engine) begonnen: LLM-Router, Chat-API, Streaming, ChatMessage
- Prompt-Sicherheit implementiert (automatischer Safety Block um jeden Systemprompt)
- AI SDK v6 Breaking Changes behoben
- Status: Phase 3 in Arbeit → Seed-Daten + Supabase-Setup ausstehend
