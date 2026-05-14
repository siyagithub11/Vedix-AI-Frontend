import { BlogCardSkeleton } from '@/components/shared/Skeleton';

export default function BlogLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="h-4 w-24 bg-[#1A1D35] rounded animate-pulse mb-3" />
        <div className="h-10 w-64 bg-[#1A1D35] rounded-[8px] animate-pulse mb-3" />
        <div className="h-5 w-96 bg-[#1A1D35] rounded-[8px] animate-pulse" />
      </div>
      <div className="h-72 w-full bg-[#1A1D35] rounded-[12px] animate-pulse mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
