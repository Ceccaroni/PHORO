"use client";

import { useState, useEffect } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TierBadge } from "@/components/shared/TierBadge";
import type { Profile } from "@/types/database";

interface ProfileDrawerProps {
  profile: Profile;
  open: boolean;
  onClose: () => void;
  onProfileUpdate: () => void;
}

type Tab = "profile" | "password" | "security";

export function ProfileDrawer({
  profile,
  open,
  onClose,
  onProfileUpdate,
}: ProfileDrawerProps) {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/30"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-lg transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-phoro-divider px-5 py-4">
          <h2 className="text-lg font-semibold text-phoro-primary">
            Einstellungen
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-phoro-text/40 transition-colors hover:bg-phoro-bg hover:text-phoro-primary"
            aria-label="Schliessen"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 border-b border-phoro-divider">
          {(["profile", "password", "security"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-b-2 border-phoro-primary text-phoro-primary"
                  : "text-phoro-text/50 hover:text-phoro-text"
              }`}
            >
              {t === "profile"
                ? "Profil"
                : t === "password"
                  ? "Passwort"
                  : "Sicherheit"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "profile" && (
            <ProfileTab
              profile={profile}
              onSaved={onProfileUpdate}
            />
          )}
          {tab === "password" && <PasswordTab />}
          {tab === "security" && <SecurityTab />}
        </div>
      </div>
    </>
  );
}

// ---------- Profile Tab ----------

function ProfileTab({
  profile,
  onSaved,
}: {
  profile: Profile;
  onSaved: () => void;
}) {
  const [displayName, setDisplayName] = useState(
    profile.display_name ?? ""
  );
  const [orgName, setOrgName] = useState(
    profile.organization_name ?? ""
  );
  const [orgRole, setOrgRole] = useState(
    profile.organization_role ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!displayName.trim()) {
      setError("Anzeigename ist erforderlich.");
      return;
    }

    setSaving(true);
    setError(null);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: displayName.trim(),
        organization_name: orgName.trim(),
        organization_role: orgRole.trim(),
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Fehler beim Speichern.");
      return;
    }

    setSaved(true);
    onSaved();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Anzeigename
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-phoro-text">
          E-Mail
        </label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg/50 px-4 py-2.5 text-phoro-text/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Organisation
        </label>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
          placeholder="z.B. Primarschule Musterlingen"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Rolle
        </label>
        <input
          type="text"
          value={orgRole}
          onChange={(e) => setOrgRole(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
          placeholder="z.B. Lehrperson, Schulleitung, SHP"
        />
      </div>

      <div className="border-t border-phoro-divider pt-4">
        <label className="block text-sm font-medium text-phoro-text">
          Aktuelles Tier
        </label>
        <div className="mt-2">
          <TierBadge tier={profile.tier} />
        </div>
      </div>

      {error && <p className="text-sm text-phoro-error">{error}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : saved ? (
          <>
            <Check size={16} />
            Gespeichert
          </>
        ) : (
          "Speichern"
        )}
      </button>
    </div>
  );
}

// ---------- Password Tab ----------

function PasswordTab() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange() {
    setError(null);

    if (newPassword.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/profile/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Fehler beim Ändern.");
      return;
    }

    setSaved(true);
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Neues Passwort
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
          placeholder="Mindestens 8 Zeichen"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Passwort bestätigen
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-phoro-text placeholder:text-phoro-text/40 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
          placeholder="Passwort wiederholen"
        />
      </div>

      {error && <p className="text-sm text-phoro-error">{error}</p>}

      <button
        onClick={handleChange}
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : saved ? (
          <>
            <Check size={16} />
            Geändert
          </>
        ) : (
          "Passwort ändern"
        )}
      </button>
    </div>
  );
}

// ---------- Security Tab (2FA) ----------

interface TotpFactor {
  id: string;
  friendly_name?: string;
  factor_type: string;
  status: string;
}

function SecurityTab() {
  const [factors, setFactors] = useState<TotpFactor[]>([]);
  const [loading, setLoading] = useState(true);

  // Enrollment state
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    loadFactors();
  }, []);

  async function loadFactors() {
    const supabase = createClient();
    const { data } = await supabase.auth.mfa.listFactors();
    if (data) {
      setFactors(
        data.totp.filter(
          (f) => f.status === "verified"
        ) as TotpFactor[]
      );
    }
    setLoading(false);
  }

  async function startEnrollment() {
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "PHORO Authenticator",
    });

    if (error || !data) {
      setError(error?.message ?? "Fehler beim Einrichten.");
      return;
    }

    setQrCode(data.totp.qr_code);
    setTotpSecret(data.totp.secret);
    setFactorId(data.id);
    setEnrolling(true);
  }

  async function verifyEnrollment() {
    if (!factorId || !verifyCode) return;
    setError(null);
    setVerifying(true);

    const supabase = createClient();
    const { data: challenge, error: challengeErr } =
      await supabase.auth.mfa.challenge({ factorId });

    if (challengeErr || !challenge) {
      setError("Challenge fehlgeschlagen.");
      setVerifying(false);
      return;
    }

    const { error: verifyErr } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: verifyCode,
    });

    setVerifying(false);

    if (verifyErr) {
      setError("Ungültiger Code. Bitte versuche es erneut.");
      return;
    }

    setEnrolling(false);
    setQrCode(null);
    setTotpSecret(null);
    setVerifyCode("");
    loadFactors();
  }

  async function disableMfa(fId: string) {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.unenroll({ factorId: fId });
    if (error) {
      setError(error.message);
      return;
    }
    loadFactors();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={20} className="animate-spin text-phoro-text/40" />
      </div>
    );
  }

  // Enrollment flow
  if (enrolling) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-phoro-primary">
          2FA einrichten
        </h3>
        <p className="text-sm text-phoro-text/60">
          Scanne den QR-Code mit deiner Authenticator-App (z.B. Google
          Authenticator, Authy).
        </p>

        {qrCode && (
          <div className="flex justify-center rounded-lg border border-phoro-divider bg-white p-4">
            <img src={qrCode} alt="QR-Code für 2FA" className="h-48 w-48" />
          </div>
        )}

        {totpSecret && (
          <div>
            <p className="text-xs text-phoro-text/40">
              Manueller Schlüssel:
            </p>
            <code className="mt-1 block break-all rounded bg-phoro-bg p-2 text-xs text-phoro-text">
              {totpSecret}
            </code>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-phoro-text">
            6-stelliger Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={verifyCode}
            onChange={(e) =>
              setVerifyCode(e.target.value.replace(/\D/g, ""))
            }
            className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-4 py-2.5 text-center text-lg tracking-[0.3em] text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
            placeholder="000000"
          />
        </div>

        {error && <p className="text-sm text-phoro-error">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEnrolling(false);
              setQrCode(null);
              setTotpSecret(null);
              setVerifyCode("");
              setError(null);
            }}
            className="flex-1 rounded-lg border border-phoro-divider px-4 py-2.5 text-sm font-medium text-phoro-text transition-colors hover:bg-phoro-bg"
          >
            Abbrechen
          </button>
          <button
            onClick={verifyEnrollment}
            disabled={verifyCode.length !== 6 || verifying}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
          >
            {verifying ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Bestätigen"
            )}
          </button>
        </div>
      </div>
    );
  }

  // Main state
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-phoro-primary">
        Zwei-Faktor-Authentifizierung (2FA)
      </h3>

      {factors.length > 0 ? (
        <>
          <div className="flex items-center gap-2 rounded-lg border border-phoro-progress/30 bg-phoro-progress/10 px-4 py-3">
            <Check size={16} className="text-phoro-progress" />
            <p className="text-sm font-medium text-phoro-progress">
              2FA ist aktiv
            </p>
          </div>
          <p className="text-sm text-phoro-text/60">
            Dein Konto ist durch einen zweiten Faktor geschützt.
          </p>
          {factors.map((f) => (
            <button
              key={f.id}
              onClick={() => disableMfa(f.id)}
              className="w-full rounded-lg border border-phoro-error/30 px-4 py-2.5 text-sm font-medium text-phoro-error transition-colors hover:bg-phoro-error/5"
            >
              2FA deaktivieren
            </button>
          ))}
        </>
      ) : (
        <>
          <p className="text-sm text-phoro-text/60">
            Schütze dein Konto mit einem zweiten Faktor. Du benötigst eine
            Authenticator-App auf deinem Smartphone.
          </p>
          <button
            onClick={startEnrollment}
            className="w-full rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90"
          >
            2FA aktivieren
          </button>
        </>
      )}

      {error && <p className="text-sm text-phoro-error">{error}</p>}
    </div>
  );
}
