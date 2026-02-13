# PHORO Repo Starter Kit

## Dateien für dein GitHub-Repo

Lege diese Dateien in dein leeres `phoro` Repo:

```
phoro/
├── CLAUDE.md              ← In den Root des Repos
└── docs/
    ├── BRIEFING.md        ← Das vollständige Briefing
    ├── STATUS.md          ← Wird nach jeder Session aktualisiert
    └── DECISIONS.md       ← Architektur-Entscheidungslog
```

## Erste Session mit Claude Code

Sage zu Claude Code:

```
Lies CLAUDE.md und docs/BRIEFING.md Abschnitt 8.
Initialisiere das Projekt gemäss Phase 1.
```

## Wichtig

- Die `CLAUDE.md` muss im ROOT des Repos liegen (nicht in docs/)
- Claude Code wird sie automatisch als Kontext-Anker nutzen
- Am Ende jeder Session: `docs/STATUS.md` aktualisieren lassen
