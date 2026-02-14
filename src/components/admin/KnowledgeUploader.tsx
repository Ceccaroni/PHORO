"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

const ACCEPTED_TYPES = [".md", ".txt", ".json", ".pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

interface KnowledgeUploaderProps {
  slug: string;
  files: string[];
  onChange: (files: string[]) => void;
}

export function KnowledgeUploader({ slug, files, onChange }: KnowledgeUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    if (!slug) {
      setError("Bitte zuerst einen Slug vergeben.");
      return;
    }

    setError(null);
    setUploading(true);

    const newFiles: string[] = [];

    try {
      for (const file of Array.from(fileList)) {
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!ACCEPTED_TYPES.includes(ext)) {
          setError(`Dateityp ${ext} nicht unterstützt. Erlaubt: ${ACCEPTED_TYPES.join(", ")}`);
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          setError(`${file.name} ist zu gross (max. 10 MB).`);
          continue;
        }

        const path = `knowledge/${slug}/${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("knowledge")
          .upload(path, file, { upsert: true });

        if (uploadError) {
          setError(`Fehler beim Hochladen von ${file.name}: ${uploadError.message}`);
          continue;
        }

        newFiles.push(path);
      }

      if (newFiles.length > 0) {
        onChange([...files, ...newFiles]);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(path: string) {
    const { error: deleteError } = await supabase.storage
      .from("knowledge")
      .remove([path]);

    if (deleteError) {
      setError(`Fehler beim Löschen: ${deleteError.message}`);
      return;
    }

    onChange(files.filter((f) => f !== path));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  }

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-phoro-divider p-6 transition-colors hover:border-phoro-accent hover:bg-phoro-bg/50"
      >
        {uploading ? (
          <Loader2 size={24} className="animate-spin text-phoro-accent" />
        ) : (
          <Upload size={24} className="text-phoro-text/30" />
        )}
        <p className="text-sm text-phoro-text/50">
          {uploading
            ? "Wird hochgeladen..."
            : "Dateien hierher ziehen oder klicken"}
        </p>
        <p className="text-xs text-phoro-text/30">
          {ACCEPTED_TYPES.join(", ")} – max. 10 MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(e) => handleUpload(e.target.files)}
        className="hidden"
      />

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-phoro-error">{error}</p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-3 space-y-1">
          {files.map((path) => {
            const fileName = path.split("/").pop() ?? path;
            return (
              <li
                key={path}
                className="flex items-center justify-between rounded-lg bg-phoro-bg px-3 py-2"
              >
                <div className="flex items-center gap-2 text-sm text-phoro-text">
                  <FileText size={14} className="text-phoro-text/40" />
                  <span className="truncate">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(path)}
                  className="rounded p-1 text-phoro-text/30 transition-colors hover:text-phoro-error"
                >
                  <X size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
