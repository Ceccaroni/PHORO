"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SlugInput } from "./SlugInput";
import { ModelSelect } from "./ModelSelect";
import { TemperatureSlider } from "./TemperatureSlider";
import { PromptEditor } from "./PromptEditor";
import { IconPicker } from "./IconPicker";
import { KnowledgeUploader } from "./KnowledgeUploader";
import { AssistantPreview } from "./AssistantPreview";
import type { Assistant, Category, Tier, Provider } from "@/types/database";

interface AssistantFormProps {
  assistant?: Assistant;
  mode: "create" | "edit";
}

export function AssistantForm({ assistant, mode }: AssistantFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState(assistant?.name ?? "");
  const [slug, setSlug] = useState(assistant?.slug ?? "");
  const [description, setDescription] = useState(assistant?.description ?? "");
  const [longDescription, setLongDescription] = useState(
    assistant?.long_description ?? ""
  );
  const [category, setCategory] = useState<Category>(
    assistant?.category ?? "unterricht"
  );
  const [minTier, setMinTier] = useState<Tier>(assistant?.min_tier ?? "dawn");
  const [iconName, setIconName] = useState<string | null>(
    assistant?.icon_name ?? null
  );
  const [sortOrder, setSortOrder] = useState(assistant?.sort_order ?? 0);
  const [isActive, setIsActive] = useState(assistant?.is_active ?? false);
  const [isFeatured, setIsFeatured] = useState(assistant?.is_featured ?? false);

  // LLM config
  const [provider, setProvider] = useState<Provider>(
    assistant?.provider ?? "openai"
  );
  const [model, setModel] = useState(assistant?.model ?? "gpt-4o");
  const [temperature, setTemperature] = useState(assistant?.temperature ?? 0.7);
  const [maxTokens, setMaxTokens] = useState(assistant?.max_tokens ?? 4096);

  // System prompt
  const [systemPrompt, setSystemPrompt] = useState(
    assistant?.system_prompt ?? ""
  );

  // Knowledge base
  const [knowledgeFiles, setKnowledgeFiles] = useState<string[]>(
    assistant?.knowledge_files ?? []
  );
  const [knowledgeDescription, setKnowledgeDescription] = useState(
    assistant?.knowledge_description ?? ""
  );

  const handleSlugChange = useCallback((s: string) => setSlug(s), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const body = {
      name,
      slug,
      description,
      long_description: longDescription || null,
      category,
      min_tier: minTier,
      icon_name: iconName,
      sort_order: sortOrder,
      is_active: isActive,
      is_featured: isFeatured,
      provider,
      model,
      temperature,
      max_tokens: maxTokens,
      system_prompt: systemPrompt,
      knowledge_files: knowledgeFiles.length > 0 ? knowledgeFiles : null,
      knowledge_description: knowledgeDescription || null,
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/assistants"
          : `/api/admin/assistants/${assistant!.id}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `Fehler ${res.status}`);
      }

      router.push("/admin/assistenten");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Basic data */}
      <section className="rounded-2xl border border-phoro-divider bg-white p-6">
        <h2 className="text-lg font-semibold text-phoro-primary">
          Grunddaten
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-phoro-text">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="z.B. Inklusions-Architekt"
            />
          </div>

          <SlugInput
            name={name}
            value={slug}
            onChange={handleSlugChange}
            disabled={mode === "edit" && !!(assistant?.knowledge_files?.length)}
          />

          <div>
            <label className="block text-sm font-medium text-phoro-text">
              Beschreibung (kurz)
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Kurzbeschreibung für die Kachel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-phoro-text">
              Ausführliche Beschreibung
            </label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Detaillierte Beschreibung (Markdown möglich)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-phoro-text">
                Kategorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              >
                <option value="unterricht">Unterricht</option>
                <option value="leadership">Leadership</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-phoro-text">
                Minimum-Tier
              </label>
              <select
                value={minTier}
                onChange={(e) => setMinTier(e.target.value as Tier)}
                className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              >
                <option value="dawn">Dawn</option>
                <option value="light">Light</option>
                <option value="beacon">Beacon</option>
                <option value="pharos">Pharos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-phoro-text">
                Sortierung
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              />
            </div>

            <IconPicker value={iconName} onChange={setIconName} />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-phoro-text">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-phoro-divider accent-phoro-primary"
              />
              Aktiv
            </label>
            <label className="flex items-center gap-2 text-sm text-phoro-text">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-phoro-divider accent-phoro-primary"
              />
              Fokus-Tool
            </label>
          </div>
        </div>
      </section>

      {/* Section 2: LLM Config */}
      <section className="rounded-2xl border border-phoro-divider bg-white p-6">
        <h2 className="text-lg font-semibold text-phoro-primary">
          LLM-Konfiguration
        </h2>
        <div className="mt-4 space-y-4">
          <ModelSelect
            provider={provider}
            model={model}
            onProviderChange={setProvider}
            onModelChange={setModel}
          />
          <div className="grid grid-cols-2 gap-4">
            <TemperatureSlider value={temperature} onChange={setTemperature} />
            <div>
              <label className="block text-sm font-medium text-phoro-text">
                Max Tokens
              </label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value) || 4096)}
                min={256}
                max={128000}
                className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: System Prompt */}
      <section className="rounded-2xl border border-phoro-divider bg-white p-6">
        <h2 className="text-lg font-semibold text-phoro-primary">
          Systemprompt
        </h2>
        <div className="mt-4">
          <PromptEditor value={systemPrompt} onChange={setSystemPrompt} />
        </div>
      </section>

      {/* Section 4: Knowledge Base */}
      <section className="rounded-2xl border border-phoro-divider bg-white p-6">
        <h2 className="text-lg font-semibold text-phoro-primary">
          Knowledge Base
        </h2>
        <div className="mt-4 space-y-4">
          <KnowledgeUploader
            slug={slug}
            files={knowledgeFiles}
            onChange={setKnowledgeFiles}
          />
          <div>
            <label className="block text-sm font-medium text-phoro-text">
              Beschreibung der Wissensbasis
            </label>
            <textarea
              value={knowledgeDescription}
              onChange={(e) => setKnowledgeDescription(e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Was enthält die Wissensbasis dieses Assistenten?"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Preview */}
      <section className="rounded-2xl border border-phoro-divider bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-phoro-primary">
          Vorschau
        </h2>
        <AssistantPreview
          name={name}
          description={description}
          minTier={minTier}
        />
      </section>

      {/* Error + Submit */}
      {error && (
        <p className="text-sm text-phoro-error">{error}</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || !name || !slug || !description || !systemPrompt}
          className="flex items-center gap-2 rounded-lg bg-phoro-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {mode === "create" ? "Assistent erstellen" : "Änderungen speichern"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/assistenten")}
          className="rounded-lg px-4 py-2.5 text-sm text-phoro-text/60 hover:text-phoro-primary"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
