export function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-phoro-divider/50 ${className ?? "h-4 w-full"}`}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-phoro-divider bg-white p-5 ${className ?? ""}`}
    >
      <SkeletonLine className="mb-3 h-4 w-16" />
      <SkeletonLine className="mb-2 h-5 w-3/4" />
      <SkeletonLine className="h-3 w-full" />
      <SkeletonLine className="mt-1 h-3 w-2/3" />
    </div>
  );
}

export function SkeletonMessage({
  align = "left",
}: {
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`animate-pulse rounded-2xl p-4 ${
          align === "right"
            ? "w-2/3 bg-phoro-primary/10"
            : "w-3/4 bg-phoro-divider/30"
        }`}
      >
        <SkeletonLine className="mb-2 h-3 w-full" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
    </div>
  );
}
