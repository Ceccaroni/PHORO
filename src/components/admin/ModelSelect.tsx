"use client";

import type { Provider } from "@/types/database";

const MODEL_OPTIONS: Record<Provider, { value: string; label: string }[]> = {
  openai: [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "o1", label: "o1" },
    { value: "o1-mini", label: "o1 Mini" },
  ],
  anthropic: [
    { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4" },
    { value: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5" },
    { value: "claude-opus-4-5-20250918", label: "Claude Opus 4.5" },
  ],
};

interface ModelSelectProps {
  provider: Provider;
  model: string;
  onProviderChange: (provider: Provider) => void;
  onModelChange: (model: string) => void;
}

export function ModelSelect({
  provider,
  model,
  onProviderChange,
  onModelChange,
}: ModelSelectProps) {
  const models = MODEL_OPTIONS[provider];

  function handleProviderChange(newProvider: Provider) {
    onProviderChange(newProvider);
    // Reset model to first option of new provider
    onModelChange(MODEL_OPTIONS[newProvider][0].value);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Provider
        </label>
        <select
          value={provider}
          onChange={(e) => handleProviderChange(e.target.value as Provider)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-phoro-text">
          Modell
        </label>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
        >
          {models.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
