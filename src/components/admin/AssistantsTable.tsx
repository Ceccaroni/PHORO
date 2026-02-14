"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, ArrowUpDown } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TierBadge } from "@/components/shared/TierBadge";
import type { Assistant, Category, Tier } from "@/types/database";

type SortKey = "name" | "category" | "min_tier" | "is_active" | "updated_at";
type SortDir = "asc" | "desc";

const categoryLabels: Record<Category, string> = {
  unterricht: "Unterricht",
  leadership: "Leadership",
  admin: "Admin",
};

interface AssistantsTableProps {
  assistants: Assistant[];
}

export function AssistantsTable({ assistants }: AssistantsTableProps) {
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [filterTier, setFilterTier] = useState<Tier | "all">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    let result = [...assistants];

    if (filterCategory !== "all") {
      result = result.filter((a) => a.category === filterCategory);
    }
    if (filterTier !== "all") {
      result = result.filter((a) => a.min_tier === filterTier);
    }
    if (filterStatus !== "all") {
      result = result.filter((a) =>
        filterStatus === "active" ? a.is_active : !a.is_active
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name, "de");
      else if (sortKey === "category") cmp = a.category.localeCompare(b.category);
      else if (sortKey === "min_tier") cmp = a.min_tier.localeCompare(b.min_tier);
      else if (sortKey === "is_active") cmp = Number(a.is_active) - Number(b.is_active);
      else if (sortKey === "updated_at") cmp = a.updated_at.localeCompare(b.updated_at);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [assistants, filterCategory, filterTier, filterStatus, sortKey, sortDir]);

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    return (
      <button
        onClick={() => toggleSort(field)}
        className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-phoro-text/50 hover:text-phoro-primary"
      >
        {label}
        <ArrowUpDown size={12} className={sortKey === field ? "text-phoro-primary" : ""} />
      </button>
    );
  }

  return (
    <div>
      {/* Header + filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as Category | "all")}
            className="rounded-lg border border-phoro-divider bg-white px-3 py-1.5 text-sm text-phoro-text"
          >
            <option value="all">Alle Kategorien</option>
            <option value="unterricht">Unterricht</option>
            <option value="leadership">Leadership</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value as Tier | "all")}
            className="rounded-lg border border-phoro-divider bg-white px-3 py-1.5 text-sm text-phoro-text"
          >
            <option value="all">Alle Tiers</option>
            <option value="dawn">Dawn</option>
            <option value="light">Light</option>
            <option value="beacon">Beacon</option>
            <option value="pharos">Pharos</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
            className="rounded-lg border border-phoro-divider bg-white px-3 py-1.5 text-sm text-phoro-text"
          >
            <option value="all">Alle Status</option>
            <option value="active">Aktiv</option>
            <option value="inactive">Inaktiv</option>
          </select>
        </div>

        <Link
          href="/admin/assistenten/new"
          className="flex items-center gap-2 rounded-lg bg-phoro-cta px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-phoro-cta/90"
        >
          <Plus size={16} />
          Neuer Assistent
        </Link>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-phoro-divider bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-phoro-divider">
              <th className="px-4 py-3 text-left">
                <SortHeader label="Name" field="name" />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader label="Kategorie" field="category" />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader label="Tier" field="min_tier" />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader label="Status" field="is_active" />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader label="Geändert" field="updated_at" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-phoro-text/50">
                  Keine Assistenten gefunden.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-phoro-divider/50 transition-colors last:border-0 hover:bg-phoro-bg/50"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/assistenten/${a.id}`}
                      className="font-medium text-phoro-primary hover:text-phoro-accent"
                    >
                      {a.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-phoro-text/70">
                    {categoryLabels[a.category]}
                  </td>
                  <td className="px-4 py-3">
                    <TierBadge tier={a.min_tier} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge active={a.is_active} />
                  </td>
                  <td className="px-4 py-3 text-phoro-text/50">
                    {new Date(a.updated_at).toLocaleDateString("de-CH")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-phoro-text/40">
        {filtered.length} von {assistants.length} Assistenten
      </p>
    </div>
  );
}
