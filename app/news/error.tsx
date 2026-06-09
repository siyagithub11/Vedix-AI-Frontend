'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function NewsError({
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
    <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
      <AlertCircle className="w-16 h-16 text-[#F87171] mb-6" />
      <h2 className="text-[28px] font-bold text-white mb-4">Something went wrong</h2>
      <p className="text-[#8B8FA8] mb-8 max-w-md">
        We encountered an error while fetching the latest AI news. Please try again.
      </p>
      <button 
        onClick={() => reset()}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  );
}
