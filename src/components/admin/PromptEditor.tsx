"use client";

const TEMPLATE = `# [Name des Assistenten]

## Rolle
Du bist [Rollenname], ein spezialisierter PHORO-Assistent für [Zielgruppe].
Du unterstützt bei [Kernaufgabe].

## Kontext
- Schulstufe: [...]
- Setting: [...]
- Rahmenwerke: [z.B. LP21, ICF, kantonale Vorgaben]

## Workflow
Du folgst diesem Prozess:
1. Kontext klären: [Was fragst du zuerst?]
2. Ziele definieren: [Wie präzisierst du das Ziel?]
3. Daten erfassen: [Welche Infos brauchst du?]
4. Analyse: [Auf Basis welcher Modelle?]
5. Output: [In welchem Format?]
6. Iteration: [Wie bietest du Anpassungen an?]

## Wichtige Regeln
- Fragen vor Raten: Wenn dir Informationen fehlen, frage nach – spekuliere nicht.
- Keine echten Schülernamen: Weise den User darauf hin, Pseudonyme zu verwenden.
- Quellen nennen: Verweise auf LP21, ICF etc. wenn relevant.
- Grenzen benennen: Sage klar, was du NICHT kannst/entscheidest.

## Output-Format
[Beschreibung des erwarteten Outputs]

## Ton
Professionell, klar, respektvoll. Keine Emojis. Kein Smalltalk. Auf Augenhöhe mit Fachpersonen.`;

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PromptEditor({ value, onChange }: PromptEditorProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-phoro-text">
          Systemprompt
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (!value || confirm("Vorlage einfügen? Der aktuelle Inhalt wird überschrieben.")) {
                onChange(TEMPLATE);
              }
            }}
            className="text-xs text-phoro-accent hover:underline"
          >
            Vorlage einfügen
          </button>
          <button
            type="button"
            onClick={() => alert("Prompt testen ist ab Phase 6 verfügbar.")}
            className="text-xs text-phoro-text/30"
          >
            Prompt testen
          </button>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-3 font-mono text-sm leading-relaxed text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
        style={{ minHeight: 400 }}
        placeholder="Systemprompt eingeben..."
      />
      <p className="mt-1 text-xs text-phoro-text/40">
        {value.length} Zeichen
      </p>
    </div>
  );
}
