"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/chat");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-phoro-bg">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-phoro-primary">PHORO</h1>
          <p className="mt-2 text-sm text-phoro-text/60">
            Anmelden
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Passwort"
            />
          </div>

          {error && (
            <p className="text-sm text-phoro-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
          >
            {loading ? "Wird angemeldet..." : "Anmelden"}
          </button>
        </form>

        <p className="text-center text-sm text-phoro-text/60">
          Noch kein Konto?{" "}
          <Link
            href="/register"
            className="font-medium text-phoro-accent hover:underline"
          >
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
