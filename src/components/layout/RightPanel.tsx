"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProfileDrawer } from "@/components/profile/ProfileDrawer";
import type { Profile, Assistant, Category, Tier } from "@/types/database";
import { TierBadge } from "@/components/shared/TierBadge";
import { tierColor } from "@/lib/utils/tier";

interface RightPanelProps {
  profile: Profile;
  featuredAssistants: Assistant[];
  open: boolean;
  onClose: () => void;
}

const categories: { label: string; value: Category }[] = [
  { label: "Unterricht", value: "unterricht" },
  { label: "Leadership", value: "leadership" },
  { label: "Admin", value: "admin" },
];

function UserInitials({ name, tier }: { name: string; tier: Tier }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const color = tierColor(tier);

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
      style={{ backgroundColor: `${color}22`, color }}
    >
      {initials}
    </div>
  );
}

export function RightPanel({
  profile,
  featuredAssistants,
  open,
  onClose,
}: RightPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 xl:hidden"
          onClick={onClose}
        />
      )}

      <aside
        role="complementary"
        aria-label="Benutzer und Kategorien"
        className={`fixed right-0 top-0 z-50 flex h-full w-60 flex-col bg-phoro-sidebar transition-transform duration-200 xl:relative xl:z-0 xl:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* User info */}
        <div className="border-b border-phoro-divider p-4">
          <div className="flex items-center gap-3">
            <UserInitials name={profile.display_name ?? profile.email} tier={profile.tier} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-phoro-primary">
                {profile.display_name ?? profile.email}
              </p>
              <TierBadge tier={profile.tier} />
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setProfileOpen(true)}
                className="rounded-lg p-1.5 text-phoro-text/40 transition-colors hover:bg-phoro-bg hover:text-phoro-primary"
                aria-label="Einstellungen"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg p-1.5 text-phoro-text/40 transition-colors hover:bg-phoro-bg hover:text-phoro-error"
                aria-label="Abmelden"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Fokus-Tools */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-phoro-text/50">
            Fokus-Tools
          </p>
          {featuredAssistants.length === 0 ? (
            <p className="text-sm text-phoro-text/40">
              Keine Fokus-Tools verfügbar
            </p>
          ) : (
            <ul className="space-y-1">
              {featuredAssistants.map((assistant) => (
                <li key={assistant.id}>
                  <Link
                    href={`/marketplace/${assistant.category}?start=${assistant.slug}`}
                    onClick={onClose}
                    className="block rounded-lg px-3 py-2 text-sm text-phoro-text/70 transition-all duration-200 hover:text-phoro-accent"
                  >
                    {assistant.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category buttons */}
        <div className="border-t border-phoro-divider p-4 space-y-2">
          {categories.map((cat) => {
            const isActive = pathname === `/marketplace/${cat.value}`;
            return (
              <Link
                key={cat.value}
                href={`/marketplace/${cat.value}`}
                onClick={onClose}
                className={`block w-full rounded-lg px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
                  isActive
                    ? "bg-phoro-primary text-white"
                    : "text-phoro-text/60 hover:bg-phoro-primary/10 hover:text-phoro-primary"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Profile Drawer */}
      <ProfileDrawer
        profile={profile}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onProfileUpdate={() => router.refresh()}
      />
    </>
  );
}
