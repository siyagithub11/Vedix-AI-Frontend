import { ToolCardSkeleton } from '@/components/shared/Skeleton';

export default function ToolsLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="h-10 w-64 bg-[#1A1D35] rounded-[8px] animate-pulse mb-3" />
        <div className="h-5 w-80 bg-[#1A1D35] rounded-[8px] animate-pulse" />
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-[#1A1D35] rounded-[20px] animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => <ToolCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
