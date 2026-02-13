"use client";

import Link from "next/link";
import { Menu, PanelRight } from "lucide-react";

interface HeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

export function Header({
  onToggleLeftSidebar,
  onToggleRightSidebar,
}: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-phoro-divider bg-phoro-sidebar px-4 xl:hidden">
      <button
        onClick={onToggleLeftSidebar}
        className="rounded-lg p-2 text-phoro-text/60 transition-colors hover:bg-phoro-bg hover:text-phoro-primary"
        aria-label="Chat-Verlauf öffnen"
      >
        <Menu size={20} />
      </button>

      <Link href="/chat" className="text-lg font-bold text-phoro-primary">
        PHORO
      </Link>

      <button
        onClick={onToggleRightSidebar}
        className="rounded-lg p-2 text-phoro-text/60 transition-colors hover:bg-phoro-bg hover:text-phoro-primary"
        aria-label="Menü öffnen"
      >
        <PanelRight size={20} />
      </button>
    </header>
  );
}
