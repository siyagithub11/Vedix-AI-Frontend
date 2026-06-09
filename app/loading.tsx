export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#378ADD]/20 border-t-[#378ADD] animate-spin mb-4" />
        <p className="text-[#8B8FA8] text-[15px] animate-pulse">Loading Vedix AI...</p>
      </div>
    </div>
  )
}
