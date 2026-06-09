'use client'

export default function LoginError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center px-6">
      <div className="card-dark w-full max-w-md p-10 text-center space-y-6">
        <h2 className="text-xl font-semibold text-white">Login Error</h2>
        <p className="text-[#8B8FA8] text-sm">{error.message || 'An error occurred during login.'}</p>
        <button onClick={reset} className="btn-primary w-full py-3">Try again</button>
      </div>
    </div>
  )
}
