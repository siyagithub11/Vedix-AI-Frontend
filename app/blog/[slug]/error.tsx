'use client'

export default function BlogDetailError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#C9A84C] mb-4">Error</p>
      <h2 className="text-[40px] font-semibold text-white mb-4 tracking-[-0.8px]">Could not load blog post</h2>
      <p className="text-[15px] text-[#8B8FA8] mb-8">{error.message || 'An error occurred while loading this blog post.'}</p>
      <button onClick={reset} className="btn-primary py-3 px-8">Try again</button>
    </div>
  )
}
