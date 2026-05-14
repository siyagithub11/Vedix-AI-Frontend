'use client';

import { ArrowRight } from 'lucide-react';

export default function AgentBannerCTA() {
  return (
    <button 
      className="btn-primary mt-8 px-8 py-3 text-[15px] flex items-center gap-2"
      onClick={() => window.dispatchEvent(new CustomEvent('open-agent', { detail: { type: 'general' } }))}
    >
      Ask Vedix AI <ArrowRight className="w-4 h-4" />
    </button>
  );
}
