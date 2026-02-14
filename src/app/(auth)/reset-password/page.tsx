"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    if (password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-phoro-bg">
        <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-phoro-primary">
            Passwort geändert
          </h1>
          <p className="text-sm text-phoro-text/60">
            Dein Passwort wurde erfolgreich geändert. Du wirst zur Anmeldung
            weitergeleitet...
          </p>
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
            Neues Passwort festlegen
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-phoro-text"
            >
              Neues Passwort
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-phoro-text"
            >
              Passwort bestätigen
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Passwort wiederholen"
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
            {loading ? "Wird gespeichert..." : "Passwort ändern"}
          </button>
        </form>
      </div>
    </div>
  );
}
