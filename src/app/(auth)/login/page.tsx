"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
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

    // Check if MFA is required
    const { data: aal } =
      await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    if (aal?.nextLevel === "aal2" && aal?.currentLevel === "aal1") {
      setStep("mfa");
      setLoading(false);
      return;
    }

    router.push("/chat");
    router.refresh();
  }

  async function handleMfaVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data: factors } = await supabase.auth.mfa.listFactors();
    const totp = factors?.totp?.[0];

    if (!totp) {
      setError("Kein 2FA-Faktor gefunden.");
      setLoading(false);
      return;
    }

    const { data: challenge, error: challengeErr } =
      await supabase.auth.mfa.challenge({ factorId: totp.id });

    if (challengeErr || !challenge) {
      setError("2FA-Challenge fehlgeschlagen.");
      setLoading(false);
      return;
    }

    const { error: verifyErr } = await supabase.auth.mfa.verify({
      factorId: totp.id,
      challengeId: challenge.id,
      code: totpCode,
    });

    if (verifyErr) {
      setError("Ungültiger Code. Bitte versuche es erneut.");
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
            {step === "credentials" ? "Anmelden" : "Zwei-Faktor-Authentifizierung"}
          </p>
        </div>

        {step === "credentials" ? (
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-phoro-text"
                >
                  Passwort
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-phoro-accent hover:underline"
                >
                  Passwort vergessen?
                </Link>
              </div>
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Anmelden"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMfaVerify} className="space-y-4">
            <p className="text-sm text-phoro-text/60">
              Gib den 6-stelligen Code aus deiner Authenticator-App ein.
            </p>

            <div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                autoFocus
                value={totpCode}
                onChange={(e) =>
                  setTotpCode(e.target.value.replace(/\D/g, ""))
                }
                className="block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-3 text-center text-xl tracking-[0.3em] text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
                placeholder="000000"
              />
            </div>

            {error && (
              <p className="text-sm text-phoro-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || totpCode.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Bestätigen"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("credentials");
                setTotpCode("");
                setError(null);
              }}
              className="w-full text-center text-sm text-phoro-accent hover:underline"
            >
              Zurück
            </button>
          </form>
        )}

        {step === "credentials" && (
          <p className="text-center text-sm text-phoro-text/60">
            Noch kein Konto?{" "}
            <Link
              href="/register"
              className="font-medium text-phoro-accent hover:underline"
            >
              Registrieren
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
