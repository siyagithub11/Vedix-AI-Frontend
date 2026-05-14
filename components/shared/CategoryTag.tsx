// Category tag color tokens from design system
const TAG_STYLES: Record<string, string> = {
  // News categories
  MODEL:      'bg-[#1A2A3A] border-[#2A4A6A] text-[#85B7EB]',
  TOOLS:      'bg-[#0F2A1F] border-[#1A4A30] text-[#5DCAA5]',
  RESEARCH:   'bg-[#1F1A3A] border-[#3A2A6A] text-[#AFA9EC]',
  BUSINESS:   'bg-[#2A1F0A] border-[#4A350A] text-[#EF9F27]',
  // Tool categories
  WRITING:    'bg-[#1A2A3A] border-[#2A4A6A] text-[#85B7EB]',
  CODING:     'bg-[#0F2A1F] border-[#1A4A30] text-[#5DCAA5]',
  DESIGN:     'bg-[#1F1A3A] border-[#3A2A6A] text-[#AFA9EC]',
  VIDEO:      'bg-[#2A1F0A] border-[#4A350A] text-[#EF9F27]',
  OTHER:      'bg-[#1A1D35] border-[#2A2D4A] text-[#8B8FA8]',
};

const FALLBACK = 'bg-[#1A1D35] border-[#2A2D4A] text-[#8B8FA8]';

interface CategoryTagProps {
  category: string;
  className?: string;
}

export default function CategoryTag({ category, className = '' }: CategoryTagProps) {
  const style = TAG_STYLES[category] ?? FALLBACK;
  return (
    <span
      className={`
        inline-block text-[11px] font-medium uppercase tracking-[0.08em]
        px-2.5 py-1 rounded-[20px] border
        ${style}
        ${className}
      `}
    >
      {category}
    </span>
  );
}
