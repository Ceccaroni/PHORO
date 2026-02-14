"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AdminNav } from "./AdminNav";

interface AdminShellProps {
  userName: string;
  children: React.ReactNode;
}

export function AdminShell({ userName, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-phoro-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-56 flex-col bg-phoro-sidebar p-4 transition-transform duration-200 lg:relative lg:z-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + close */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="text-xl font-bold text-phoro-primary"
          >
            PHORO
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-phoro-text/40 hover:text-phoro-primary lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin label */}
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-phoro-text/50">
          Admin-Panel
        </p>

        <AdminNav />

        {/* User info */}
        <div className="border-t border-phoro-divider pt-3">
          <p className="truncate text-xs text-phoro-text/50">{userName}</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex items-center gap-3 border-b border-phoro-divider bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1 text-phoro-text/60 hover:text-phoro-primary"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold text-phoro-primary">
            PHORO Admin
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
