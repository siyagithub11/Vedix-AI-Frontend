import { getNewsItem } from '@/lib/api';
import { notFound } from 'next/navigation';
import CategoryTag from '@/components/shared/CategoryTag';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Metadata } from 'next';
import SafeImage from '@/components/shared/SafeImage';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const news = await getNewsItem(params.slug);
    return { title: `${news.title} — Vedix`, description: news.summary };
  } catch {
    return { title: 'News — Vedix' };
  }
}

export default async function NewsDetailPage({ params }: Props) {
  let news;
  try {
    news = await getNewsItem(params.slug);
  } catch {
    notFound();
  }

  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true });

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      
      {/* Category & Meta */}
      <div className="flex items-center gap-3 text-[#5A5E7A] text-[13px] mt-3">
        <CategoryTag category={news.category} />
        <span>·</span>
        <span className="flex items-center gap-1.5"><Clock size={14} /> {news.readTime} min read</span>
        <span>·</span>
        <span>{timeAgo}</span>
      </div>

      {/* Title */}
      <h1 className="text-[48px] font-bold tracking-[-1px] text-white mt-4 leading-[1.2]">
        {news.title}
      </h1>

      {/* Hero image */}
      {news.imageUrl && (
        <div className="w-full h-80 rounded-[12px] overflow-hidden mt-8 bg-[#1A1D35]">
          <SafeImage src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      {/* Why It Matters */}
      <div className="bg-[#1A2A3A] border-l-4 border-[#378ADD] rounded-r-xl px-6 py-4 mt-8 mb-8">
        <p className="text-[13px] leading-[1.6]">
          <span className="text-white font-medium uppercase tracking-[0.05em]">Why it matters — </span>
          <span className="text-[#8B8FA8]">{news.whyItMatters}</span>
        </p>
      </div>

      {/* Markdown Body */}
      <div 
        className="prose prose-invert max-w-none
          prose-headings:text-white prose-headings:font-semibold
          prose-p:text-[#8B8FA8] prose-p:leading-[1.7] prose-p:text-[15px]
          prose-a:text-[#378ADD] prose-a:no-underline hover:prose-a:underline
          prose-code:bg-[#1A1D35] prose-code:text-[#85B7EB] prose-code:px-1.5 prose-code:rounded
          prose-blockquote:border-l-[#378ADD] prose-blockquote:text-[#8B8FA8]
          prose-img:rounded-[12px]"
        dangerouslySetInnerHTML={{ __html: news.summary }}
      />

      {/* Blog CTA Card */}
      {news.blogSlug && (
        <div className="bg-gradient-to-r from-[#1A2A3A] to-[#13162A] border border-[#2A4A6A] rounded-2xl p-8 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-[20px] font-semibold text-white mb-2">Want to learn how?</h3>
            <p className="text-[#8B8FA8] text-[15px]">We&apos;ve written a detailed step-by-step guide to help you master this.</p>
          </div>
          <Link href={`/blog/${news.blogSlug}`}>
            <button className="btn-primary flex items-center gap-2 px-6 shrink-0">
              Read the full guide <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
