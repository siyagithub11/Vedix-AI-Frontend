export default function ToolDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="w-24 h-24 rounded-2xl bg-[#1A1D35]" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-1/3 bg-[#1A1D35] rounded" />
          <div className="h-5 w-1/2 bg-[#1A1D35] rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-4 bg-[#1A1D35] rounded w-full" />
          <div className="h-4 bg-[#1A1D35] rounded w-5/6" />
          <div className="h-4 bg-[#1A1D35] rounded w-11/12" />
        </div>
        <div className="space-y-4">
          <div className="h-32 bg-[#1A1D35] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
