"use client";

import { useState } from "react";
import {
  BookOpen, Brain, Shield, Users, FileText, Lightbulb, Target,
  BarChart3, MessageSquare, GraduationCap, Heart, Compass, Scale,
  Briefcase, Calculator, ClipboardList, Globe, Microscope, Palette,
  PenTool, Puzzle, Search, Settings, Star, TrendingUp, Zap,
  Building, Calendar, FolderOpen, HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: { name: string; icon: LucideIcon }[] = [
  { name: "book-open", icon: BookOpen },
  { name: "brain", icon: Brain },
  { name: "shield", icon: Shield },
  { name: "users", icon: Users },
  { name: "file-text", icon: FileText },
  { name: "lightbulb", icon: Lightbulb },
  { name: "target", icon: Target },
  { name: "bar-chart-3", icon: BarChart3 },
  { name: "message-square", icon: MessageSquare },
  { name: "graduation-cap", icon: GraduationCap },
  { name: "heart", icon: Heart },
  { name: "compass", icon: Compass },
  { name: "scale", icon: Scale },
  { name: "briefcase", icon: Briefcase },
  { name: "calculator", icon: Calculator },
  { name: "clipboard-list", icon: ClipboardList },
  { name: "globe", icon: Globe },
  { name: "microscope", icon: Microscope },
  { name: "palette", icon: Palette },
  { name: "pen-tool", icon: PenTool },
  { name: "puzzle", icon: Puzzle },
  { name: "search", icon: Search },
  { name: "settings", icon: Settings },
  { name: "star", icon: Star },
  { name: "trending-up", icon: TrendingUp },
  { name: "zap", icon: Zap },
  { name: "building", icon: Building },
  { name: "calendar", icon: Calendar },
  { name: "folder-open", icon: FolderOpen },
  { name: "help-circle", icon: HelpCircle },
];

interface IconPickerProps {
  value: string | null;
  onChange: (iconName: string | null) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = ICONS.find((i) => i.name === value);
  const filtered = search
    ? ICONS.filter((i) => i.name.includes(search.toLowerCase()))
    : ICONS;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-phoro-text">Icon</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-1 flex w-full items-center gap-2 rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text"
      >
        {selected ? (
          <>
            <selected.icon size={16} />
            <span>{selected.name}</span>
          </>
        ) : (
          <span className="text-phoro-text/40">Kein Icon</span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 w-72 rounded-xl border border-phoro-divider bg-white p-3 shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen..."
            className="mb-2 w-full rounded-lg border border-phoro-divider px-2 py-1.5 text-sm focus:border-phoro-accent focus:outline-none"
            autoFocus
          />
          <div className="grid max-h-48 grid-cols-6 gap-1 overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setOpen(false);
                setSearch("");
              }}
              className={`flex items-center justify-center rounded-lg p-2 text-phoro-text/30 hover:bg-phoro-bg ${
                !value ? "ring-2 ring-phoro-accent" : ""
              }`}
              title="Kein Icon"
            >
              ×
            </button>
            {filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onChange(item.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-phoro-bg ${
                    value === item.name ? "ring-2 ring-phoro-accent" : ""
                  }`}
                  title={item.name}
                >
                  <Icon size={18} className="text-phoro-text/70" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
