"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TierBadge } from "@/components/shared/TierBadge";
import type { Profile, Tier } from "@/types/database";

interface UserRow extends Profile {
  chatCount: number;
}

interface UsersTableProps {
  users: UserRow[];
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleTierChange(userId: string, newTier: Tier) {
    setUpdatingId(userId);

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: newTier }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "Fehler beim Aktualisieren");
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, tier: newTier } : u))
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-phoro-divider bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-phoro-divider">
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">
              Name
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">
              E-Mail
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">
              Tier
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">
              Registriert
            </th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50">
              Chats
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-phoro-text/50">
                Keine Benutzer gefunden.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-phoro-divider/50 last:border-0 hover:bg-phoro-bg/50"
              >
                <td className="px-4 py-3 font-medium text-phoro-text">
                  {user.display_name ?? "–"}
                  {user.is_admin && (
                    <span className="ml-2 rounded bg-phoro-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-phoro-primary">
                      Admin
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-phoro-text/70">{user.email}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={user.tier}
                      onChange={(e) =>
                        handleTierChange(user.id, e.target.value as Tier)
                      }
                      disabled={updatingId === user.id}
                      className="rounded-lg border border-phoro-divider bg-phoro-bg px-2 py-1 text-xs text-phoro-text focus:border-phoro-accent focus:outline-none disabled:opacity-50"
                    >
                      <option value="dawn">Dawn</option>
                      <option value="light">Light</option>
                      <option value="beacon">Beacon</option>
                      <option value="pharos">Pharos</option>
                    </select>
                    {updatingId === user.id && (
                      <Loader2 size={14} className="animate-spin text-phoro-accent" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-phoro-text/50">
                  {new Date(user.created_at).toLocaleDateString("de-CH")}
                </td>
                <td className="px-4 py-3 text-phoro-text/70">{user.chatCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
