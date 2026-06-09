'use client'

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[70vh] bg-[#0D0F1A] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#C9A84C] mb-4">Application Error</p>
      <h1 className="text-[40px] font-semibold text-white mb-4 tracking-[-0.8px]">Something went wrong</h1>
      <p className="text-[15px] text-[#8B8FA8] max-w-md mb-8">{error.message || 'An unexpected error occurred. Please try again.'}</p>
      <button onClick={reset} className="btn-primary py-3 px-8">Try again</button>
    </div>
  )
}
