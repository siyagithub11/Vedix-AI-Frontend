import { NewsCardSkeleton } from '@/components/shared/Skeleton';

export default function NewsLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="h-10 w-48 bg-[#1A1D35] rounded-[8px] animate-pulse mb-3" />
        <div className="h-5 w-96 bg-[#1A1D35] rounded-[8px] animate-pulse" />
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-24 bg-[#1A1D35] rounded-[20px] animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
