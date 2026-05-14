'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const AgentPanel = dynamic(() => import('./AgentPanel'), { ssr: false });

export default function AgentButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [contextType, setContextType] = useState('general');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleOpenAgent = (e: CustomEvent) => {
      if (e.detail?.type) {
        setContextType(e.detail.type);
      }
      setIsOpen(true);
    };

    window.addEventListener('open-agent', handleOpenAgent as EventListener);
    return () => window.removeEventListener('open-agent', handleOpenAgent as EventListener);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Tooltip (show on hover, before panel opens) */}
        {!isOpen && (
          <div 
            className={`bg-[#13162A] border border-[#2A2D4A] rounded-xl px-4 py-2 text-white text-[13px] font-medium whitespace-nowrap transition-all duration-200 shadow-lg
              ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            Ask Vedix AI &rarr;
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close AI Agent" : "Open AI Agent"}
          className="pointer-events-auto w-14 h-14 rounded-full bg-[#378ADD] flex items-center justify-center cursor-pointer shadow-[0_0_0_4px_rgba(55,138,221,0.15)] hover:shadow-[0_0_0_6px_rgba(55,138,221,0.2)] hover:scale-110 active:scale-95 transition-all duration-150"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white animate-[spin_0.2s_ease-out_reverse]" />
          ) : (
            <MessageSquare className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {isOpen && (
        <AgentPanel 
          contextType={contextType} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}
