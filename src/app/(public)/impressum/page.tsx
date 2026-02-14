import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der PHORO-Plattform.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-phoro-primary">Impressum</h1>

      <div className="space-y-6 text-sm leading-relaxed text-phoro-text/80">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-phoro-primary">
            Betreiber
          </h2>
          <p>
            PHORO
            <br />
            {/* Gründer: Bitte hier die vollständigen Angaben einfügen */}
            [Name des Inhabers/der Firma]
            <br />
            [Strasse und Hausnummer]
            <br />
            [PLZ Ort]
            <br />
            Schweiz
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-phoro-primary">
            Kontakt
          </h2>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:kontakt@phoro.ch"
              className="text-phoro-accent hover:underline"
            >
              kontakt@phoro.ch
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-phoro-primary">
            Haftungsausschluss
          </h2>
          <p>
            Die Inhalte dieser Webseite wurden mit grösster Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
            können wir jedoch keine Gewähr übernehmen.
          </p>
          <p className="mt-2">
            PHORO bietet KI-gestützte Assistenten als Arbeitshilfe an. Die
            generierten Inhalte ersetzen keine professionelle Beratung und
            sind nicht als verbindliche Empfehlung zu verstehen. Die
            Verantwortung für die Nutzung der Ergebnisse liegt bei den
            Anwender:innen.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-phoro-primary">
            Urheberrecht
          </h2>
          <p>
            Die durch den Betreiber erstellten Inhalte und Werke auf dieser
            Webseite unterliegen dem schweizerischen Urheberrecht. Die
            Vervielfältigung, Bearbeitung oder Verbreitung ausserhalb der
            Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung
            des Betreibers.
          </p>
        </div>

        <p className="pt-4 text-xs text-phoro-text/40">
          Stand: Februar 2026
        </p>
      </div>
    </div>
  );
}
