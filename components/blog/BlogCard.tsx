import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import SafeImage from '@/components/shared/SafeImage';

export interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const dateFormatted = format(new Date(post.publishedAt), 'MMM d, yyyy');

  return (
    <article className={`card-dark group overflow-hidden cursor-pointer flex flex-col h-full relative ${featured ? 'lg:flex-row lg:gap-8' : ''}`}>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`} />
      
      {/* Cover Image */}
      {post.coverImage ? (
        <SafeImage
          loading="lazy"
          src={post.coverImage}
          alt={post.title}
          className="w-full aspect-video object-cover rounded-t-xl -mt-5 -mx-5 mb-5 group-hover:scale-[1.02] transition-transform duration-300 shrink-0"
          style={{ width: 'calc(100% + 2.5rem)', maxWidth: 'none' }}
        />
      ) : (
        <div 
          className="w-full aspect-video bg-[#1A1D35] rounded-t-xl flex items-center justify-center -mt-5 -mx-5 mb-5 shrink-0 overflow-hidden relative"
          style={{ width: 'calc(100% + 2.5rem)', maxWidth: 'none' }}
        >
          {/* Gradient placeholder with V node SVG pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#13162A] to-[#1A1D35]" />
          <svg width="60" height="50" viewBox="0 0 240 200" fill="none" className="opacity-20 relative z-0">
            <path d="M40 40 L120 160 L200 40" stroke="#378ADD" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="40" cy="40" r="12" fill="#378ADD" />
            <circle cx="200" cy="40" r="12" fill="#378ADD" />
            <circle cx="120" cy="160" r="14" fill="#C9A84C" />
          </svg>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3 shrink-0 relative z-20">
        {post.tags.map(tag => (
          <span 
            key={tag} 
            className="bg-[#1A1D35] border border-[#2A2D4A] text-[#8B8FA8] text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-[0.05em]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className={`text-white font-semibold line-clamp-2 leading-[1.4] group-hover:text-[#85B7EB] transition-colors shrink-0 ${featured ? 'text-[28px]' : 'text-[18px]'}`}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[#8B8FA8] text-[14px] line-clamp-3 mt-2 leading-[1.6] shrink-0">
        {post.excerpt}
      </p>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#2A2D4A] text-[#5A5E7A] text-[12px] shrink-0">
        <span className="flex items-center gap-1.5">
          <Calendar size={12} /> {dateFormatted}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} /> {post.readTime} min read
        </span>
      </div>
    </article>
  );
}
