import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der PHORO-Plattform.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-phoro-primary">
        Datenschutzerklärung
      </h1>

      <div className="space-y-6 text-sm leading-relaxed text-phoro-text/80">
        <h2 className="text-lg font-semibold text-phoro-primary">
          1. Verantwortliche Stelle
        </h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Plattform ist
          der Betreiber von PHORO. Die Kontaktdaten finden Sie im{" "}
          <a href="/impressum" className="text-phoro-accent hover:underline">
            Impressum
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          2. Welche Daten wir erheben
        </h2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Kontodaten:</strong> E-Mail-Adresse, Anzeigename,
            Organisation und Rolle (bei Registrierung)
          </li>
          <li>
            <strong>Chat-Verläufe:</strong> Ihre Nachrichten und die
            Antworten der KI-Assistenten
          </li>
          <li>
            <strong>Nutzungsdaten:</strong> Welche Assistenten genutzt
            werden, Zeitstempel (anonymisiert)
          </li>
        </ul>

        <h2 className="text-lg font-semibold text-phoro-primary">
          3. Datenverarbeitung durch KI-Anbieter
        </h2>
        <p>
          PHORO nutzt API-Zugänge zu LLM-Anbietern (OpenAI, Anthropic). Bei
          der API-Nutzung werden die übermittelten Daten von diesen Anbietern{" "}
          <strong>nicht zum Training</strong> ihrer Modelle verwendet. Es
          gelten die jeweiligen API-Nutzungsbedingungen der Anbieter.
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          4. Datenspeicherung
        </h2>
        <p>
          Alle Daten werden in der EU (Rechenzentrum Frankfurt, AWS
          eu-central-1) gespeichert. Die Datenbank wird von Supabase
          betrieben und ist durch Row Level Security geschützt. Daten werden
          im Ruhezustand verschlüsselt.
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          5. Keine Schülerdaten
        </h2>
        <p>
          PHORO verarbeitet keine direkt identifizierbaren Schülerdaten. Die
          Systemprompts der Assistenten enthalten die Anweisung, dass
          Nutzer:innen pseudonymisierte Daten verwenden sollen. Geben Sie
          keine echten Namen, AHV-Nummern oder andere personenbezogene
          Schülerdaten ein.
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          6. Cookies und Tracking
        </h2>
        <p>
          PHORO setzt ausschliesslich technisch notwendige Session-Cookies
          ein. Wir verwenden kein Google Analytics und keine
          Werbe-Tracker. Für anonyme Nutzungsstatistiken kann eine
          datenschutzkonforme, EU-gehostete Lösung zum Einsatz kommen.
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          7. Ihre Rechte
        </h2>
        <ul className="list-inside list-disc space-y-1">
          <li>Auskunft über Ihre gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihres Kontos und aller zugehörigen Daten</li>
          <li>Datenportabilität</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an{" "}
          <a
            href="mailto:kontakt@phoro.ch"
            className="text-phoro-accent hover:underline"
          >
            kontakt@phoro.ch
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          8. Datenlöschung
        </h2>
        <p>
          Wenn Sie Ihr Konto löschen, werden alle damit verbundenen Daten
          (Profil, Chat-Verläufe, Nachrichten) unwiderruflich gelöscht
          (CASCADE-Löschung in der Datenbank).
        </p>

        <h2 className="text-lg font-semibold text-phoro-primary">
          9. Änderungen
        </h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
          anzupassen. Die aktuelle Version ist stets auf dieser Seite
          einsehbar.
        </p>

        <p className="pt-4 text-xs text-phoro-text/40">
          Stand: Februar 2026
        </p>
      </div>
    </div>
  );
}
