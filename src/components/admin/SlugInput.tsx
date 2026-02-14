"use client";

import { useEffect, useState } from "react";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface SlugInputProps {
  name: string;
  value: string;
  onChange: (slug: string) => void;
  disabled?: boolean;
}

export function SlugInput({ name, value, onChange, disabled }: SlugInputProps) {
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!manual && name) {
      onChange(generateSlug(name));
    }
  }, [name, manual, onChange]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-phoro-text">
          Slug
        </label>
        <button
          type="button"
          onClick={() => setManual((m) => !m)}
          className="text-xs text-phoro-accent hover:underline"
        >
          {manual ? "Auto-generieren" : "Manuell bearbeiten"}
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setManual(true);
          onChange(e.target.value);
        }}
        disabled={disabled}
        readOnly={!manual}
        className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text/70 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent disabled:opacity-50"
      />
    </div>
  );
}
