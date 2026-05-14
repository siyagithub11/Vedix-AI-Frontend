'use client';

import { NewsItem } from '@/lib/types';

const CATEGORIES: Array<'ALL' | NewsItem['category']> = ['ALL', 'MODEL', 'TOOLS', 'RESEARCH', 'BUSINESS'];

const ACTIVE_STYLES: Record<string, string> = {
  ALL:      'bg-[#378ADD] text-white border-[#378ADD]',
  MODEL:    'bg-[#1A2A3A] text-[#85B7EB] border-[#2A4A6A]',
  TOOLS:    'bg-[#0F2A1F] text-[#5DCAA5] border-[#1A4A30]',
  RESEARCH: 'bg-[#1F1A3A] text-[#AFA9EC] border-[#3A2A6A]',
  BUSINESS: 'bg-[#2A1F0A] text-[#EF9F27] border-[#4A350A]',
};

interface FilterPillsProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              text-[11px] font-medium uppercase tracking-[0.08em]
              px-4 py-2 rounded-[20px] border transition-all duration-150
              ${isActive
                ? ACTIVE_STYLES[cat]
                : 'bg-transparent text-[#8B8FA8] border-[#2A2D4A] hover:border-[#378ADD] hover:text-white'}
            `}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
