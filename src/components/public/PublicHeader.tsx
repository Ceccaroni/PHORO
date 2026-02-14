"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Preise", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/contact" },
  { label: "Über uns", href: "/about" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-phoro-divider bg-phoro-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-phoro-primary">
          PHORO
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                pathname === link.href
                  ? "font-medium text-phoro-primary"
                  : "text-phoro-text/60 hover:text-phoro-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-lg bg-phoro-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90"
          >
            Anmelden
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-phoro-text/60 hover:text-phoro-primary md:hidden"
          aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-phoro-divider px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm ${
                pathname === link.href
                  ? "font-medium text-phoro-primary"
                  : "text-phoro-text/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block w-full rounded-lg bg-phoro-primary px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Anmelden
          </Link>
        </nav>
      )}
    </header>
  );
}
