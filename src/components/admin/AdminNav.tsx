"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Users, FileText, ArrowLeft } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/assistenten", label: "Assistenten", icon: Bot },
  { href: "/admin/users", label: "Benutzer", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-phoro-primary text-white"
                    : "text-phoro-text/70 hover:bg-phoro-bg hover:text-phoro-primary"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto border-t border-phoro-divider pt-4">
        <Link
          href="/chat"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-phoro-text/50 transition-colors hover:text-phoro-primary"
        >
          <ArrowLeft size={18} />
          Zurück zur App
        </Link>
      </div>
    </nav>
  );
}
