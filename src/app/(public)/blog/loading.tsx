import { SkeletonLine } from "@/components/shared/Skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SkeletonLine className="mb-8 h-8 w-24" />
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-phoro-divider bg-white p-6"
          >
            <SkeletonLine className="mb-2 h-3 w-28" />
            <SkeletonLine className="mb-3 h-5 w-3/4" />
            <SkeletonLine className="h-3 w-full" />
            <SkeletonLine className="mt-1 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
