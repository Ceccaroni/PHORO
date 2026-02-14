"use client";

export default function ChatError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <p className="text-sm text-phoro-error">
        Fehler beim Laden des Chats.
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-phoro-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-phoro-primary/90"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
