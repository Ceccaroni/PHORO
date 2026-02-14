import { SkeletonMessage } from "@/components/shared/Skeleton";

export default function ChatDetailLoading() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <SkeletonMessage align="right" />
        <SkeletonMessage align="left" />
        <SkeletonMessage align="right" />
        <SkeletonMessage align="left" />
      </div>
    </div>
  );
}
