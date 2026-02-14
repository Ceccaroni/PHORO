import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "PHORO – spezialisierte KI-Assistenten für pädagogische Fachpersonen. Entwickelt von einem Heilpädagogen mit über 20 Jahren Praxis im Schweizer Schulsystem.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-phoro-primary">
        Über PHORO
      </h1>

      <div className="space-y-6 text-sm leading-relaxed text-phoro-text/80">
        <p>
          PHORO (von griechisch <em>φῶς</em> = Licht und <em>φέρω</em> =
          bringen; &laquo;The Light Bringer&raquo;) ist eine Schweizer
          SaaS-Plattform für professionelle pädagogische Fachpersonen.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-phoro-primary">
          Was PHORO anders macht
        </h2>
        <p>
          PHORO ist kein generischer Chatbot und kein weiteres
          &laquo;KI-für-Lehrer&raquo;-Tool. Unsere Plattform bietet
          spezialisierte Workflow-Assistenten, die reale Arbeitsprozesse in
          Schule, Diagnostik und Administration unterstützen.
        </p>
        <p>
          Jeder PHORO-Assistent folgt einer formalisierten Workflow-Struktur:
          Kontext klären, Ziele definieren, Daten erfassen, analysieren,
          strukturiert ausgeben und iterieren. So entstehen echte Arbeitshilfen
          statt generischer Textbausteine.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-phoro-primary">
          Für wen ist PHORO?
        </h2>
        <ul className="list-inside list-disc space-y-1">
          <li>Lehrpersonen (Primarstufe und Sekundarstufe I)</li>
          <li>Schulische Heilpädagog:innen (SHP)</li>
          <li>Schulleitungen</li>
          <li>Verwaltungsfachpersonen in Schulen und Gemeinden</li>
        </ul>
        <p>
          Der geografische Fokus liegt auf der Deutschschweiz, mit
          Erweiterungspotenzial in den gesamten DACH-Raum.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-phoro-primary">
          Vom Praktiker entwickelt
        </h2>
        <p>
          PHORO wurde von einem Heilpädagogen mit über 20 Jahren Praxis im
          Schweizer Schulsystem konzipiert. Die Assistenten basieren auf
          echten Workflows aus Unterricht, Diagnostik und Schulführung –
          nicht auf theoretischen Szenarien.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-phoro-primary">
          Datenschutz und Sicherheit
        </h2>
        <p>
          Alle Daten werden in der EU (Frankfurt) gespeichert. PHORO
          verarbeitet keine identifizierbaren Schülerdaten. Wir setzen kein
          Tracking ein und verwenden ausschliesslich API-Zugänge zu
          LLM-Anbietern, bei denen die übermittelten Daten nicht zum Training
          verwendet werden.
        </p>
      </div>
    </div>
  );
}
