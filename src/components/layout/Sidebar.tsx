"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Chat, Tier } from "@/types/database";
import { tierColor } from "@/lib/utils/tier";

interface SidebarProps {
  chats: (Chat & { assistant_name?: string })[];
  tier: Tier;
  open: boolean;
  onClose: () => void;
}

function groupChatsByDate(chats: (Chat & { assistant_name?: string })[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);

  const groups: {
    label: string;
    chats: (Chat & { assistant_name?: string })[];
  }[] = [
    { label: "Heute", chats: [] },
    { label: "Gestern", chats: [] },
    { label: "Älter", chats: [] },
  ];

  for (const chat of chats) {
    const chatDate = new Date(chat.updated_at);
    if (chatDate >= today) {
      groups[0].chats.push(chat);
    } else if (chatDate >= yesterday) {
      groups[1].chats.push(chat);
    } else {
      groups[2].chats.push(chat);
    }
  }

  return groups.filter((g) => g.chats.length > 0);
}

export function Sidebar({ chats, tier, open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const groups = groupChatsByDate(chats);

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
        role="navigation"
        aria-label="Chat-Verlauf"
        className={`fixed left-0 top-0 z-50 flex h-full w-60 flex-col bg-phoro-sidebar transition-transform duration-200 xl:relative xl:z-0 xl:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* New Chat button */}
        <div className="p-4">
          <Link
            href="/chat"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: tierColor(tier) }}
          >
            <Plus size={18} />
            Neuer Chat
          </Link>
        </div>

        {/* Chat history */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {groups.length === 0 && (
            <p className="px-2 py-8 text-center text-sm text-phoro-text/40">
              Noch keine Chats
            </p>
          )}

          {groups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-phoro-text/50">
                {group.label}
              </p>
              {group.chats.map((chat) => {
                const isActive = pathname === `/chat/${chat.id}`;
                return (
                  <Link
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative mb-0.5 block truncate rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? "border-l-2 border-phoro-accent bg-phoro-bg font-medium text-phoro-primary"
                        : "text-phoro-text/70 hover:bg-phoro-bg/60"
                    }`}
                  >
                    {chat.title ?? "Neuer Chat"}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
