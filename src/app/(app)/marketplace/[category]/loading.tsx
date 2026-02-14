import { SkeletonCard, SkeletonLine } from "@/components/shared/Skeleton";

export default function MarketplaceLoading() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <SkeletonLine className="mb-6 h-7 w-40" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
