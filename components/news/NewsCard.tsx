import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import CategoryTag from '@/components/shared/CategoryTag';
import { NewsItem, NewsUseCases } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import SafeImage from '@/components/shared/SafeImage';

interface NewsCardProps {
  news: NewsItem;
  isFeatured?: boolean;
}

const USE_CASE_LABELS: { key: keyof NewsUseCases; icon: string; label: string }[] = [
  { key: 'tech',     icon: '👨‍💻', label: 'Dev'      },
  { key: 'business', icon: '💼',   label: 'Business' },
  { key: 'student',  icon: '🎓',   label: 'Student'  },
  { key: 'general',  icon: '🌍',   label: 'General'  },
];

export default function NewsCard({ news, isFeatured }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true });
  const hasBlog = !!news.blogSlug;

  return (
    <article className="card-dark group cursor-pointer relative overflow-hidden flex flex-col h-full">
      {/* Top gradient accent line — featured only */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#378ADD] to-transparent" />
      )}

      {/* Image */}
      {news.imageUrl && (
        <div className="w-full h-44 rounded-[8px] overflow-hidden bg-[#1A1D35] mb-4 shrink-0">
          <SafeImage
            src={news.imageUrl}
            alt={news.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Row 1 — meta */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <CategoryTag category={news.category} />
        <span className="text-[#5A5E7A] text-[11px]">·</span>
        <span className="text-[#5A5E7A] text-[11px]">{timeAgo}</span>
        <span className="text-[#5A5E7A] text-[11px]">·</span>
        <span className="text-[#5A5E7A] text-[11px] truncate max-w-[100px]">{news.source}</span>
      </div>

      {/* Row 2 — title */}
      <h3 className="text-white text-[18px] font-semibold line-clamp-2 leading-[1.4] group-hover:text-[#85B7EB] transition-colors duration-150 shrink-0">
        <Link href={`/news/${news.slug}`} className="before:absolute before:inset-0">
          {news.title}
        </Link>
      </h3>

      {/* Row 3 — summary */}
      <p className="text-[#8B8FA8] text-[14px] line-clamp-3 mt-2 leading-[1.6] shrink-0">
        {news.summary}
      </p>

      {/* Row 4 — Why it matters */}
      <div className="mt-4 border-l-2 border-[#378ADD] bg-[#1A2A3A] px-3 py-2.5 rounded-r-lg shrink-0">
        <p className="text-[12px] leading-[1.5]">
          <span className="text-white font-medium">Why it matters — </span>
          <span className="text-[#8B8FA8]">{news.whyItMatters}</span>
        </p>
      </div>

      {/* Row 4.5 — Use cases grid */}
      {news.useCases && typeof news.useCases === 'object' && (
        <div className="grid grid-cols-2 gap-2 mt-3 shrink-0 relative z-10 pointer-events-auto">
          {USE_CASE_LABELS.map(({ key, icon, label }) => {
            const val = news.useCases?.[key];
            if (!val) return null;
            return (
              <div key={key} className="bg-[#1A1D35] rounded-lg px-3 py-2">
                <span className="text-[10px] text-[#5A5E7A] font-medium uppercase flex items-center gap-1">
                  {icon} {label}
                </span>
                <p className="text-[12px] text-[#8B8FA8] mt-0.5 line-clamp-2">{val}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex-1" />

      {/* Row 5 — footer / CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-5 pt-4 border-t border-[#2A2D4A] gap-3 shrink-0 relative z-10">
        <span className="text-[#5A5E7A] text-[12px] flex items-center gap-1">
          <Clock size={12} /> {news.readTime} min read
        </span>

        {hasBlog ? (
          <Link
            href={`/blog/${news.blogSlug}`}
            className="btn-outline text-[13px] py-1.5 px-4 flex items-center gap-1.5 justify-center"
          >
            Read full guide <ArrowRight size={14} />
          </Link>
        ) : (
          <button
            disabled
            className="btn-outline opacity-40 cursor-not-allowed border-[#2A2D4A] text-[#5A5E7A] text-[13px] py-1.5 px-4 flex items-center gap-1.5 justify-center"
          >
            Guide coming soon
          </button>
        )}
      </div>
    </article>
  );
}
