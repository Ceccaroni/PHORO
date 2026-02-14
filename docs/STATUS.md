# PHORO – Session Status

## Letzte Session
- **Datum:** 2026-02-14
- **Phase:** 4 (Auth, Profil & Sicherheit) – CODE FERTIG, Migration 005 ausstehend
- **Bearbeiter:** Claude Opus 4.6

## Was wurde erledigt
### Phase 1 (Foundation) – FERTIG
- Next.js 16, Tailwind v4, Supabase Client, Auth, DB-Migrationen, Typen

### Phase 2 (Core App Shell) – FERTIG
- AppShell, Sidebars, Marketplace, AssistentCard, ChatInput, responsive Layout

### Phase 3 (Assistenten-Engine) – FERTIG
- LLM-Router (`src/lib/llm/router.ts`): Provider-agnostisch via Vercel AI SDK v6, OpenAI + Anthropic
- Prompt-Sicherheit: Automatischer `[SYSTEM SAFETY BLOCK]` um jeden Systemprompt (Anfang + Ende), dokumentiert in BRIEFING.md Abschnitt 17
- Chat-API-Route (`/api/chat`): Auth, Tier-Check, Chat-Verlauf aus DB, UIMessageStream-Streaming, speichert User- und Assistenten-Nachrichten, Auto-Titel nach erstem Austausch
- Chat-Erstellungs-API (`/api/chats`): Erstellt neuen Chat mit Tier-Prüfung
- ActiveChat-Komponente: AI SDK v6 (`DefaultChatTransport` + `sendMessage`), Streaming-Anzeige, Scroll-to-bottom
- ChatMessage-Komponente: User rechts (Pharos-Blau), Assistent links (weiss), Markdown-Rendering (Überschriften, Listen, Code-Blöcke, Fett/Kursiv)
- Chat-Seite `/chat/[chatId]`: Lädt Chat + Messages aus DB, rendert ActiveChat
- AssistentCard/Grid: Erstellen echte Chats via `/api/chats` und navigieren zu `/chat/[chatId]`, Loading-State mit Spinner
- Seed-Daten (`supabase/seed.sql`): Alle 45 Assistenten aus dem Briefing (15 Unterricht, 15 Leadership, 15 Admin), alle aktiv
- AI SDK v6 Kompatibilität: `@ai-sdk/react`, `sendMessage`, `DefaultChatTransport`, `toUIMessageStreamResponse`, `maxOutputTokens`
- Build erfolgreich (`npm run build` ohne Fehler)

### Supabase-Setup – FERTIG
- Supabase-Projekt erstellt (Organisation: Phoro, EU-Region Frankfurt, Free Plan)
- `.env.local` konfiguriert (Supabase URL, Anon Key, Service Role Key, OpenAI API Key)
- Migrationen 001–004 erfolgreich im SQL Editor ausgeführt
- Seed-Daten ausgeführt (45 Assistenten in DB, alle aktiv)

### End-to-End-Test – BESTANDEN
- Registrierung: FUNKTIONIERT (Account erstellt, Bestätigungs-E-Mail erhalten und bestätigt)
- Login: FUNKTIONIERT (Redirect zu `/chat`, AppShell mit 3-Spalten-Layout)
- Root-Redirect: FUNKTIONIERT (`/` → `/login` oder `/chat` je nach Auth-Status)
- Marketplace: FUNKTIONIERT (alle 15 Assistenten pro Kategorie sichtbar, Tier-Badges korrekt)
- Chat-Erstellung: FUNKTIONIERT (Klick auf AssistentCard → neuer Chat)
- Chat-Streaming: FUNKTIONIERT (Nachrichten senden, Streaming-Antwort empfangen, Markdown-Rendering)
- Chat-Historie: FUNKTIONIERT (Chats in linker Sidebar, Wechsel zwischen Chats)

### Phase 4 (Auth, Profil & Sicherheit) – CODE FERTIG
- **Registrierung erweitert:** Optionale Felder Organisation + Rolle, werden in `raw_user_meta_data` gespeichert
- **Passwort-Reset-Flow:** `/forgot-password` (E-Mail senden) + `/reset-password` (neues Passwort setzen via Auth-Callback)
- **Logout:** Icon-Button in RightPanel, `signOut()` → Redirect auf `/login`
- **Profil-API:** `PATCH /api/profile` (Name, Org, Rolle) + `POST /api/profile/password` (Passwort ändern)
- **ProfileDrawer:** Slide-in Drawer mit 3 Tabs: Profil (bearbeiten), Passwort (ändern), Sicherheit (2FA)
- **2FA (TOTP):** Aktivieren (QR-Code + Verifizierung), Deaktivieren, Login mit TOTP-Code als zweiter Schritt
- **Login mit MFA:** Prüft `aal1` → `aal2`, zeigt TOTP-Code-Eingabe
- **E-Mail-Templates:** 3 PHORO-gebrandete HTML-Templates (Bestätigung, Passwort-Reset, Magic Link) in `docs/EMAIL_TEMPLATES.md`
- **Migration 005:** Trigger `handle_new_user()` Update für Org-Felder aus Signup-Metadata
- Build erfolgreich (`npm run build` ohne Fehler)

## Nächster Schritt (PRÄZISE)
1. **Migration 005 ausführen:** SQL aus `supabase/migrations/005_update_handle_new_user.sql` im Supabase SQL Editor ausführen
2. **E-Mail-Templates einfügen:** HTML aus `docs/EMAIL_TEMPLATES.md` in Supabase Dashboard → Authentication → Email Templates
3. **E2E-Test Phase 4:** Registrierung mit Org-Feldern, Passwort-Reset, Profil-Drawer, Logout, 2FA
4. **Phase 5 starten:** Admin-Backend (Gründer-Panel für Assistenten-Verwaltung)
5. **Stripe-Integration (separate Session):** Checkout, Webhooks, Abo-Verwaltung, Tier-Gating

## Bekannte Issues
- Next.js 16 Middleware-Deprecation-Warning (funktioniert noch)

## Offene Aufgaben
- [ ] **Migration 005 ausführen:** `supabase/migrations/005_update_handle_new_user.sql` im SQL Editor ausführen
- [ ] **E-Mail-Templates in Supabase einfügen:** 3 Templates aus `docs/EMAIL_TEMPLATES.md`
- [ ] **Custom SMTP konfigurieren:** Eigener Absender (noreply@phoro.ch) statt Supabase default
- [ ] **Alten Chat aufräumen:** Erster Chat (`ce5dc3fc...`) hat leere Messages wegen AI SDK v6 Bug (vor Fix) – kann manuell gelöscht werden
- [ ] **Stripe-Integration (Phase 4b):** Checkout, Webhooks, Abo-Verwaltung, Tier-Gating
- [ ] **Tier-abhängiges Branding (Phase 6):** Initialen-Kachel, Tier-Badge, "Neuer Chat"-Button und Favicon passen sich farblich dem User-Tier an (Dawn=#E07A5F, Light=#1A3550, Beacon=#6B9080, Pharos=#C9A227)
- [ ] **Animiertes Favicon beim Streaming (Phase 6):** Sun-O-Symbol pulsiert/animiert im Browser-Tab während LLM-Streaming als "Denk-Indikator"

## Geänderte Dateien

### Session 5 – 2026-02-14 (Phase 4: Auth, Profil & Sicherheit)
- `supabase/migrations/005_update_handle_new_user.sql` (neu – Trigger für Org-Felder aus Signup-Metadata)
- `src/app/(auth)/register/page.tsx` (optionale Felder Organisation + Rolle)
- `src/app/(auth)/forgot-password/page.tsx` (neu – Passwort-Reset E-Mail senden)
- `src/app/(auth)/reset-password/page.tsx` (neu – Neues Passwort setzen)
- `src/app/(auth)/login/page.tsx` (MFA-Support: TOTP-Code als zweiter Schritt, "Passwort vergessen?"-Link)
- `src/lib/supabase/middleware.ts` (neue Routes: `/forgot-password`, `/reset-password`)
- `src/app/api/profile/route.ts` (neu – PATCH: Profil-Felder updaten)
- `src/app/api/profile/password/route.ts` (neu – POST: Passwort ändern)
- `src/components/profile/ProfileDrawer.tsx` (neu – Slide-in Drawer mit 3 Tabs: Profil, Passwort, 2FA)
- `src/components/layout/RightPanel.tsx` (Logout + Settings-Buttons, ProfileDrawer eingebunden)
- `docs/EMAIL_TEMPLATES.md` (neu – 3 PHORO-gebrandete HTML-Templates)

### Session 4 – 2026-02-14 (E2E-Test + Bugfixes)
- `src/lib/supabase/middleware.ts` (Root-Redirect: `/` → `/login` oder `/chat`)
- `src/app/(auth)/register/page.tsx` (`emailRedirectTo` auf `/auth/callback` gesetzt)
- `src/app/api/chat/route.ts` (AI SDK v6 Fix: `parts[]` statt `content` für Messages)
- `src/app/(app)/marketplace/[category]/page.tsx` (Debug-Log entfernt)
- `supabase/migrations/004_fix_rls_recursion.sql` (neu – RLS infinite recursion fix via `is_admin()` SECURITY DEFINER Funktion)
- `supabase/seed.sql` (alle 45 Assistenten auf `is_active = true`)

### Session 3 – 2026-02-14
- `.env.local` konfiguriert (Supabase + OpenAI)
- `docs/BRIEFING.md` aktualisiert (E-Mail-Branding als Phase-4-Aufgabe)

### Session 2 – 2026-02-14
- Phase 1–3 Code komplett (alle Dateien siehe Session-Verlauf)

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
- Status: Phase 1–3 Code fertig → Supabase-Setup ausstehend

### Session 3 – 2026-02-14
- Supabase-Projekt erstellt (Phoro Org, EU Frankfurt, Free Plan)
- Migrationen 001–003 + Seed erfolgreich ausgeführt
- `.env.local` konfiguriert (Supabase Keys + OpenAI API Key)
- End-to-End-Test: Registrierung + E-Mail-Bestätigung funktionieren
- E-Mail-Branding als offene Aufgabe in BRIEFING.md Phase 4 eingetragen

### Session 4 – 2026-02-14
- Root-Redirect implementiert (`/` → `/login` oder `/chat`)
- E-Mail-Bestätigungs-Redirect gefixt (`emailRedirectTo` → `/auth/callback`)
- RLS infinite recursion gefixt (Migration 004: `is_admin()` SECURITY DEFINER Funktion)
- Alle 45 Assistenten aktiviert (`is_active = true`)
- AI SDK v6 Message-Format-Bug gefixt (Chat-API: `parts[]` statt `content`)
- Vollständiger E2E-Test bestanden: Auth → Marketplace → Chat-Streaming
- Status: Phase 1–3 vollständig abgeschlossen → Bereit für Phase 4
