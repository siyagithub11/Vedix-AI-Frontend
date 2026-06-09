import { notFound } from 'next/navigation';
import { getNewsItem } from '@/lib/api';
import CategoryTag from '@/components/shared/CategoryTag';
import { format } from 'date-fns';
import { type NewsUseCases } from '@/lib/types';
import ViewTracker from '@/components/news/ViewTracker';
import DiscussButton from '@/components/news/DiscussButton';

function formatDate(isoString: string) {
  return format(new Date(isoString), 'MMM d, yyyy');
}

export default async function NewsDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params;
  let news;
  try {
    news = await getNewsItem(slug);
  } catch {
    notFound();
  }
  
  if (!news) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <ViewTracker slug={slug} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <CategoryTag category={news.category} />
          <span className="text-[#5A5E7A] text-[13px]">{news.source}</span>
          <span className="text-[#5A5E7A] text-[13px]">{formatDate(news.publishedAt)}</span>
          <span className="text-[#5A5E7A] text-[13px]">{news.readTime} min</span>
          <span className="text-[#5A5E7A] text-[13px]">👁 {news.viewCount || 0} views</span>
        </div>
        <h1 className="text-[48px] font-bold tracking-[-1px] text-white leading-[1.2]">
          {news.title}
        </h1>
      </div>

      {/* What happened */}
      <div className="bg-[#13162A] border border-[#2A2D4A] rounded-xl p-6 mt-8">
        <p className="text-[#85B7EB] text-[11px] uppercase font-medium mb-3">📰 What happened</p>
        <p className="text-white text-[16px] leading-[1.7]">{news.summary}</p>
      </div>

      {/* Why it matters */}
      {news.whyItMatters && (
        <div className="border-l-4 border-[#378ADD] bg-[#1A2A3A] px-6 py-5 mt-4 rounded-r-xl">
          <p className="text-[#85B7EB] text-[11px] uppercase font-medium mb-2">💡 Why it matters</p>
          <p className="text-white text-[15px] leading-[1.7]">{news.whyItMatters}</p>
        </div>
      )}

      {/* Real world impact */}
      {news.realWorldImpact && (
        <div className="border-l-4 border-[#C9A84C] bg-[#2A1F0A] px-6 py-5 mt-4 rounded-r-xl">
          <p className="text-[#EF9F27] text-[11px] uppercase font-medium mb-2">🌍 Real world impact</p>
          <p className="text-[#EF9F27]/80 text-[15px] leading-[1.7]">{news.realWorldImpact}</p>
        </div>
      )}

      {/* Who is affected */}
      {news.useCases && typeof news.useCases === 'object' && Object.keys(news.useCases).length > 0 && (
        <div className="mt-10">
          <h3 className="text-white text-[20px] font-semibold mb-5">How this affects different people</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { key: 'tech',     icon: '👨‍💻', label: 'Developers' },
              { key: 'business', icon: '💼',   label: 'Business'   },
              { key: 'student',  icon: '🎓',   label: 'Students'   },
              { key: 'general',  icon: '🌍',   label: 'Everyone'   },
            ] as { key: keyof NewsUseCases; icon: string; label: string }[]).map(({ key, icon, label }) => {
              const val = news.useCases?.[key];
              if (!val) return null;
              return (
                <div key={key} className="card-dark">
                  <p className="text-[#8B8FA8] text-[11px] uppercase font-medium mb-2">{icon} {label}</p>
                  <p className="text-white text-[15px] leading-[1.6]">{val}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Discussion prompt */}
      {news.discussionPrompt && (
        <div className="bg-[#13162A] border border-[#2A4A6A] rounded-2xl p-8 mt-12">
          <p className="text-[#8B8FA8] text-[13px] uppercase font-medium mb-3">💬 Join the discussion</p>
          <p className="text-[#85B7EB] text-[18px] italic leading-[1.5]">{news.discussionPrompt}</p>
          <DiscussButton title={news.title} slug={news.slug} />
        </div>
      )}

      {/* Blog CTA */}
      {news.blogSlug && (
        <div className="bg-gradient-to-r from-[#1A2A3A] to-[#13162A] border border-[#2A4A6A] rounded-2xl p-8 mt-8">
          <p className="text-[#8B8FA8] text-[13px] mb-2">Want to learn how to use this?</p>
          <h3 className="text-white text-[22px] font-semibold mb-5">Read the full guide</h3>
          <a href={`/blog/${news.blogSlug}`}>
            <button className="btn-primary">Read the full guide →</button>
          </a>
        </div>
      )}

    </main>
  );
}
