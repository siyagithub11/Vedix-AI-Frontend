export default function BlogDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
      {/* Cover Skeleton */}
      <div className="w-full aspect-[21/9] bg-[#1A1D35] rounded-2xl mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        {/* Left Column */}
        <div>
          {/* Tags */}
          <div className="flex gap-2 mb-6">
            <div className="h-6 w-16 bg-[#1A1D35] rounded-[20px]" />
            <div className="h-6 w-20 bg-[#1A1D35] rounded-[20px]" />
          </div>

          {/* Title */}
          <div className="h-12 w-3/4 bg-[#1A1D35] rounded mb-6" />

          {/* Meta row */}
          <div className="h-5 w-1/2 bg-[#1A1D35] rounded mb-10 pb-8 border-b border-[#2A2D4A]" />

          {/* Body content skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-[#1A1D35] rounded w-full" />
            <div className="h-4 bg-[#1A1D35] rounded w-11/12" />
            <div className="h-4 bg-[#1A1D35] rounded w-4/5" />
            <div className="h-4 bg-[#1A1D35] rounded w-full" />
            <div className="h-4 bg-[#1A1D35] rounded w-5/6" />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 hidden lg:block">
          <div className="h-48 bg-[#1A1D35] rounded-xl" />
          <div className="h-64 bg-[#1A1D35] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
