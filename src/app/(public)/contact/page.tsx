import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nehmen Sie Kontakt mit dem PHORO-Team auf. Wir beraten Sie gerne zu Beacon- und Pharos-Lizenzen.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-phoro-primary">Kontakt</h1>

      <div className="rounded-2xl border border-phoro-divider bg-white p-8">
        <div className="space-y-6 text-sm leading-relaxed text-phoro-text/80">
          <p>
            Haben Sie Fragen zu PHORO, möchten eine Beacon- oder
            Pharos-Lizenz besprechen, oder benötigen Sie Unterstützung?
            Wir freuen uns auf Ihre Nachricht.
          </p>

          <div className="flex items-start gap-3 rounded-xl bg-phoro-bg p-4">
            <Mail size={20} className="mt-0.5 shrink-0 text-phoro-primary" />
            <div>
              <p className="font-medium text-phoro-primary">E-Mail</p>
              <a
                href="mailto:kontakt@phoro.ch"
                className="text-phoro-accent hover:underline"
              >
                kontakt@phoro.ch
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-phoro-primary">
              Für Schulen und Gemeinden
            </h2>
            <p>
              Sie interessieren sich für eine Beacon- oder Pharos-Lizenz für
              Ihr Schulhaus oder Ihre Gemeinde? Kontaktieren Sie uns für ein
              individuelles Angebot und eine persönliche Beratung.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-phoro-primary">
              Support
            </h2>
            <p>
              Bei technischen Fragen oder Problemen mit Ihrem Konto wenden
              Sie sich bitte ebenfalls per E-Mail an uns. Wir antworten in
              der Regel innerhalb eines Arbeitstags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
