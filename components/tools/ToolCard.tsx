import Link from 'next/link';
import CategoryTag from '@/components/shared/CategoryTag';
import SafeImage from '@/components/shared/SafeImage';
import { Tool } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  // Pricing Badge Logic
  let pricingClass = '';
  switch (tool.pricing) {
    case 'FREE':
      pricingClass = 'bg-[#0F2A1F] border border-[#1A4A30] text-[#5DCAA5]';
      break;
    case 'FREEMIUM':
      pricingClass = 'bg-[#1A2A3A] border border-[#2A4A6A] text-[#85B7EB]';
      break;
    case 'PAID':
    default:
      pricingClass = 'bg-[#2A1F0A] border border-[#4A350A] text-[#EF9F27]';
      break;
  }

  // Skill Badge Logic
  let skillClass = '';
  switch (tool.skillLevel) {
    case 'BEGINNER':
      skillClass = 'bg-[#0F2A1F] text-[#5DCAA5]';
      break;
    case 'INTERMEDIATE':
      skillClass = 'bg-[#2A1F0A] text-[#EF9F27]';
      break;
    case 'ADVANCED':
      skillClass = 'bg-[#2A1A1A] text-[#F87171]';
      break;
    default:
      skillClass = 'bg-[#1A1D35] text-[#8B8FA8]';
      break;
  }

  const fallbackInitials = tool.name.substring(0, 2).toUpperCase();

  return (
    <article className="card-dark group relative overflow-hidden cursor-pointer flex flex-col h-full">
      <Link href={`/tools/${tool.slug}`} className="absolute inset-0 z-10" aria-label={`View ${tool.name}`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-20 pointer-events-none">
        {/* Left side: Logo + Name/Tag */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1A1D35] border border-[#2A2D4A] flex items-center justify-center overflow-hidden flex-shrink-0">
            {tool.logoUrl ? (
              <SafeImage src={tool.logoUrl} alt={`${tool.name} logo`} loading="lazy" className="w-full h-full object-contain p-1" />
            ) : (
              <span className="text-[#378ADD] font-bold text-[18px] tracking-wider">{fallbackInitials}</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold text-[16px] group-hover:text-[#85B7EB] transition-colors leading-tight mb-1 line-clamp-1">
              {tool.name}
            </h3>
            <CategoryTag category={tool.category} />
          </div>
        </div>

        {/* Right side: Pricing */}
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${pricingClass} whitespace-nowrap shrink-0 ml-2`}>
          {tool.pricing}
        </span>
      </div>

      {/* Description */}
      <p className="text-[#8B8FA8] text-[14px] line-clamp-2 leading-[1.6] mb-5">
        {tool.description}
      </p>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2A2D4A] mt-auto relative z-20">
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium uppercase tracking-[0.05em] ${skillClass}`}>
          {tool.skillLevel}
        </span>
        <button className="btn-outline text-[12px] py-1.5 px-3 hover:bg-[#378ADD20] pointer-events-auto transition-colors">
          View &rarr;
        </button>
      </div>
    </article>
  );
}
