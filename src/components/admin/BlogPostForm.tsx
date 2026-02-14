"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/types/database";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface BlogPostFormProps {
  post?: BlogPost;
  mode: "create" | "edit";
}

export function BlogPostForm({ post, mode }: BlogPostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [manualSlug, setManualSlug] = useState(false);

  useEffect(() => {
    if (!manualSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, manualSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const body = {
      title,
      slug,
      content,
      excerpt: excerpt || null,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/blog"
          : `/api/admin/blog/${post!.id}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `Fehler ${res.status}`);
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-phoro-divider bg-white p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-phoro-text">
            Titel
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
            placeholder="Titel des Blog-Posts"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-phoro-text">
              Slug
            </label>
            <button
              type="button"
              onClick={() => setManualSlug((m) => !m)}
              className="text-xs text-phoro-accent hover:underline"
            >
              {manualSlug ? "Auto-generieren" : "Manuell bearbeiten"}
            </button>
          </div>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setManualSlug(true);
              setSlug(e.target.value);
            }}
            readOnly={!manualSlug}
            className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text/70 focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-phoro-text">
            Auszug (optional)
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
            placeholder="Kurzer Vorschautext für die Übersicht"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-phoro-text">
              Inhalt (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="text-xs text-phoro-accent hover:underline"
            >
              {preview ? "Bearbeiten" : "Vorschau"}
            </button>
          </div>
          {preview ? (
            <div className="prose prose-sm mt-1 max-w-none rounded-lg border border-phoro-divider bg-white p-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*Kein Inhalt*"}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="mt-1 block w-full rounded-lg border border-phoro-divider bg-phoro-bg px-3 py-2 font-mono text-sm text-phoro-text focus:border-phoro-accent focus:outline-none focus:ring-1 focus:ring-phoro-accent"
              placeholder="Blog-Post in Markdown schreiben..."
            />
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-phoro-text">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 rounded border-phoro-divider accent-phoro-primary"
          />
          Veröffentlicht
        </label>
      </div>

      {error && <p className="text-sm text-phoro-error">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || !title || !slug}
          className="flex items-center gap-2 rounded-lg bg-phoro-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90 disabled:opacity-50"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {mode === "create" ? "Beitrag erstellen" : "Änderungen speichern"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="rounded-lg px-4 py-2.5 text-sm text-phoro-text/60 hover:text-phoro-primary"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
