"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationRole, setOrganizationRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          organization_name: organizationName || undefined,
          organization_role: organizationRole || undefined,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-phoro-bg">
        <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-phoro-primary">
            Bestätigungsmail gesendet
          </h1>
          <p className="text-sm text-phoro-text/60">
            Bitte überprüfe dein E-Mail-Postfach und klicke auf den
            Bestätigungslink.
          </p>
          <Link
            href="/login"
            className="inline-block text-sm font-medium text-phoro-accent hover:underline"
          >
            Zurück zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-phoro-bg">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-phoro-primary">PHORO</h1>
          <p className="mt-2 text-sm text-phoro-text/60">
            Konto erstellen
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-phoro-text"
            >
              Anzeigename
            </label>
            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Dein Name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-phoro-text"
            >
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="name@schule.ch"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-phoro-text"
            >
              Passwort
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Mindestens 8 Zeichen"
            />
          </div>

          {/* Optional fields */}
          <div className="border-t border-phoro-divider pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-phoro-text/40">
              Optional
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="organizationName"
                  className="block text-sm font-medium text-phoro-text"
                >
                  Organisation
                </label>
                <input
                  id="organizationName"
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
                  placeholder="z.B. Primarschule Musterlingen"
                />
              </div>

              <div>
                <label
                  htmlFor="organizationRole"
                  className="block text-sm font-medium text-phoro-text"
                >
                  Rolle
                </label>
                <input
                  id="organizationRole"
                  type="text"
                  value={organizationRole}
                  onChange={(e) => setOrganizationRole(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
                  placeholder="z.B. Lehrperson, Schulleitung, SHP"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-phoro-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
          >
            {loading ? "Wird erstellt..." : "Registrieren"}
          </button>
        </form>

        <p className="text-center text-sm text-phoro-text/60">
          Bereits ein Konto?{" "}
          <Link
            href="/login"
            className="font-medium text-phoro-accent hover:underline"
          >
            Anmelden
          </Link>
        </p>
      </div>
    </div>
  );
}
