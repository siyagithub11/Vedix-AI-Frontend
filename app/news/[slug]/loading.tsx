export default function NewsDetailLoading() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 animate-pulse">
      {/* Header meta row */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="h-5 w-20 bg-[#1A1D35] rounded-full" />
        <div className="h-4 w-16 bg-[#1A1D35] rounded" />
        <div className="h-4 w-20 bg-[#1A1D35] rounded" />
        <div className="h-4 w-12 bg-[#1A1D35] rounded" />
      </div>

      {/* Title */}
      <div className="space-y-3 mb-8">
        <div className="h-11 bg-[#1A1D35] rounded w-full" />
        <div className="h-11 bg-[#1A1D35] rounded w-3/4" />
      </div>

      {/* What happened card */}
      <div className="bg-[#13162A] border border-[#2A2D4A] rounded-xl p-6 mt-8">
        <div className="h-3 w-24 bg-[#1A1D35] rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-[#1A1D35] rounded w-full" />
          <div className="h-4 bg-[#1A1D35] rounded w-5/6" />
          <div className="h-4 bg-[#1A1D35] rounded w-4/5" />
        </div>
      </div>

      {/* Why it matters */}
      <div className="border-l-4 border-[#2A2D4A] bg-[#1A1D35] px-6 py-5 mt-4 rounded-r-xl">
        <div className="h-3 w-24 bg-[#2A2D4A] rounded mb-2" />
        <div className="h-4 bg-[#2A2D4A] rounded w-full" />
        <div className="h-4 bg-[#2A2D4A] rounded w-4/5 mt-1" />
      </div>

      {/* Real world impact */}
      <div className="border-l-4 border-[#2A1F0A] bg-[#1A1D35] px-6 py-5 mt-4 rounded-r-xl">
        <div className="h-3 w-28 bg-[#2A2D4A] rounded mb-2" />
        <div className="h-4 bg-[#2A2D4A] rounded w-full" />
        <div className="h-4 bg-[#2A2D4A] rounded w-3/4 mt-1" />
      </div>

      {/* Who is affected */}
      <div className="mt-10">
        <div className="h-6 w-56 bg-[#1A1D35] rounded mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card-dark space-y-2">
              <div className="h-3 w-20 bg-[#2A2D4A] rounded" />
              <div className="h-4 bg-[#2A2D4A] rounded w-full" />
              <div className="h-4 bg-[#2A2D4A] rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
