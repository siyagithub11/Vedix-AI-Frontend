export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center px-6 animate-pulse">
      <div className="card-dark w-full max-w-md p-10 space-y-6 bg-[#13162A]">
        <div className="h-12 w-32 bg-[#1A1D35] rounded mx-auto" />
        <div className="h-8 w-48 bg-[#1A1D35] rounded mx-auto" />
        <div className="h-4 w-32 bg-[#1A1D35] rounded mx-auto" />
        <div className="space-y-4">
          <div className="h-12 bg-[#1A1D35] rounded-xl w-full" />
          <div className="h-12 bg-[#1A1D35] rounded-xl w-full" />
          <div className="h-12 bg-[#1A1D35] rounded-xl w-full" />
        </div>
      </div>
    </div>
  )
}
