import { Skeleton } from '@/components/shared/Skeleton';

export default function NewsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <Skeleton className="h-[48px] w-3/4 max-w-md mb-4" />
        <Skeleton className="h-[20px] w-1/2 max-w-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-dark h-full flex flex-col p-6">
            <Skeleton className="h-[176px] w-full rounded-lg mb-4" />
            <Skeleton className="h-[16px] w-1/3 mb-4" />
            <Skeleton className="h-[24px] w-full mb-2" />
            <Skeleton className="h-[24px] w-4/5 mb-4" />
            <Skeleton className="h-[60px] w-full mb-6" />
            <div className="mt-auto border-t border-[#2A2D4A] pt-4 flex justify-between">
              <Skeleton className="h-[16px] w-1/4" />
              <Skeleton className="h-[32px] w-1/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
