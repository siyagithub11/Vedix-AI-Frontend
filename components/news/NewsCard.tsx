import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import CategoryTag from '@/components/shared/CategoryTag';
import { NewsItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import SafeImage from '@/components/shared/SafeImage';

interface NewsCardProps {
  news: NewsItem;
  isFeatured?: boolean;
}

export default function NewsCard({ news, isFeatured }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true });
  const hasBlog = !!news.blogSlug;

  return (
    <article className="card-dark group cursor-pointer relative overflow-hidden flex flex-col h-full">
      {/* Top gradient line (blue, only on featured) */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#378ADD] to-transparent" />
      )}

      {/* Image (optional, if exists) */}
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

      {/* ROW 1 */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <CategoryTag category={news.category} />
        <span className="text-[#5A5E7A] text-[11px]">·</span>
        <span className="text-[#5A5E7A] text-[11px]">{timeAgo}</span>
        <span className="text-[#5A5E7A] text-[11px]">·</span>
        <span className="text-[#5A5E7A] text-[11px] truncate max-w-[100px]">{news.source}</span>
      </div>

      {/* ROW 2 */}
      <h3 className="text-white text-[18px] font-semibold line-clamp-2 leading-[1.4] group-hover:text-[#85B7EB] transition-colors duration-150 shrink-0">
        <Link href={`/news/${news.slug}`} className="before:absolute before:inset-0">
          {news.title}
        </Link>
      </h3>

      {/* ROW 3 */}
      <p className="text-[#8B8FA8] text-[14px] line-clamp-3 mt-2 leading-[1.6] shrink-0">
        {news.summary}
      </p>

      {/* ROW 4: WhyItMatters box */}
      <div className="mt-4 border-l-2 border-[#378ADD] bg-[#1A2A3A] px-3 py-2.5 rounded-r-lg shrink-0">
        <p className="text-[12px] leading-[1.5]">
          <span className="text-white font-medium">Why it matters — </span>
          <span className="text-[#8B8FA8]">{news.whyItMatters}</span>
        </p>
      </div>

      <div className="flex-1" />

      {/* ROW 5 */}
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
