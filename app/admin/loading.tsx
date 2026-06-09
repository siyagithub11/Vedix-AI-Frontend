export default function AdminLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-10 w-48 bg-[#1A1D35] rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-[#1A1D35] rounded-xl" />
        ))}
      </div>
      <div className="h-96 bg-[#1A1D35] rounded-xl" />
    </div>
  )
}
