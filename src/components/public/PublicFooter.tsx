import Link from "next/link";

const footerLinks = [
  { label: "Preise", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/contact" },
  { label: "Über uns", href: "/about" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Impressum", href: "/impressum" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-phoro-divider bg-phoro-sidebar">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-phoro-primary/60"
          >
            PHORO
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-phoro-text/50 transition-colors hover:text-phoro-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-phoro-text/40">
          &copy; {new Date().getFullYear()} PHORO. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
