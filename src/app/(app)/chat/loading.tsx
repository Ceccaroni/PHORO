import { SkeletonLine } from "@/components/shared/Skeleton";

export default function ChatLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <SkeletonLine className="mb-4 h-8 w-48" />
      <SkeletonLine className="h-4 w-64" />
    </div>
  );
}
