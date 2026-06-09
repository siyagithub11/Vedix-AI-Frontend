'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function NewsDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#F87171]/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-[#F87171]" />
      </div>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#C9A84C] mb-3">
        Article Error
      </p>
      <h1 className="text-[32px] font-bold text-white mb-4 tracking-[-0.5px]">
        Could not load this article
      </h1>
      <p className="text-[#8B8FA8] text-[15px] max-w-md mb-10 leading-[1.6]">
        {error.message || 'An error occurred while loading this news article. It may have been removed or is temporarily unavailable.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={reset} className="btn-primary flex items-center gap-2 px-6 py-3">
          <RefreshCw size={16} /> Try again
        </button>
        <Link href="/news" className="btn-outline flex items-center gap-2 px-6 py-3">
          <Home size={16} /> Back to News
        </Link>
      </div>
    </main>
  );
}
