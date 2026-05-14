import Link from 'next/link';
import FadeIn from '@/components/shared/FadeIn';
import SafeImage from '@/components/shared/SafeImage';
import { ArrowRight, Newspaper, BookOpen, Wrench, ArrowDown } from 'lucide-react';
import { getNewsFeed, getBlogFeed, getToolsFeed } from '@/lib/api';
import NewsCard from '@/components/news/NewsCard';
import BlogCard from '@/components/blog/BlogCard';
import ToolCard from '@/components/tools/ToolCard';
import AgentBannerCTA from '@/components/shared/AgentBannerCTA';
import { NewsItem, BlogPost, Tool } from '@/lib/types';

export const revalidate = 900;

export default async function HomePage() {
  const [newsResult, blogResult, toolsResult] = await Promise.allSettled([
    getNewsFeed({ limit: 3 }),
    getBlogFeed({ limit: 2 }),
    getToolsFeed({ limit: 4 }),
  ]);

  const news: NewsItem[]  = newsResult.status  === 'fulfilled' ? newsResult.value.data  : [];
  const blogs: BlogPost[] = blogResult.status  === 'fulfilled' ? blogResult.value.data  : [];
  const tools: Tool[]     = toolsResult.status === 'fulfilled' ? toolsResult.value.data : [];

  return (
    <>
      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <FadeIn delay={0}>
      <section className="min-h-[100vh] flex flex-col items-center justify-center bg-[#0D0F1A] relative overflow-hidden text-center px-6">
        {/* Background decoration */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#378ADD]/5 blur-[120px] -left-48 top-0 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-[120px] -right-48 bottom-0 pointer-events-none" />

        {/* Content */}
        <SafeImage 
          src="/logo.png" 
          alt="Vedix" 
          className="h-20 w-auto mx-auto mb-8 drop-shadow-[0_0_24px_rgba(55,138,221,0.4)] relative z-10" 
        />
        
        <div className="inline-flex items-center gap-2 bg-[#13162A] border border-[#2A2D4A] rounded-full px-4 py-1.5 mb-6 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#378ADD] animate-pulse"></span>
          <span className="text-[#8B8FA8] text-[12px] font-medium">500+ AI Tools Indexed</span>
        </div>

        <h1 className="text-[64px] font-bold tracking-[-1.5px] leading-[1.1] text-white max-w-[800px] mx-auto relative z-10">
          Discover AI.<br/>
          <span className="text-[#378ADD]">Learn How to Use It.</span>
        </h1>
        
        <p className="text-[#8B8FA8] text-[17px] max-w-[520px] mx-auto mt-6 leading-[1.7] relative z-10">
          Your guided platform for AI tools, news & guides.
          Find the right tool, learn how to use it, decide with confidence.
        </p>

        <div className="mt-10 flex gap-4 justify-center flex-wrap relative z-10">
          <Link href="/tools">
            <button className="btn-primary px-8 py-3 text-[15px] flex items-center gap-2">
              Explore Tools <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/news">
            <button className="btn-outline px-8 py-3 text-[15px]">
              Read Latest News
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce z-10">
          <ArrowDown className="w-5 h-5 text-[#5A5E7A]" />
        </div>
      </section>
      </FadeIn>

      {/* ── SECTION 2: STATS BAR ────────────────────────────────────────────── */}
      <FadeIn delay={100}>
      <section className="bg-[#13162A] border-y border-[#2A2D4A] py-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-y-8 gap-x-0 divide-x divide-[#2A2D4A] flex-wrap">
          <div className="text-center px-16">
            <div className="text-[32px] font-bold text-white">500+</div>
            <div className="text-[13px] text-[#8B8FA8] mt-1">AI Tools</div>
          </div>
          <div className="text-center px-16">
            <div className="text-[32px] font-bold text-white">Weekly</div>
            <div className="text-[13px] text-[#8B8FA8] mt-1">Guides</div>
          </div>
          <div className="text-center px-16">
            <div className="text-[32px] font-bold text-white">Daily</div>
            <div className="text-[13px] text-[#8B8FA8] mt-1">AI News</div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* ── SECTION 3: FEATURED NEWS ────────────────────────────────────────── */}
      <FadeIn delay={200}>
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#378ADD] mb-2 flex items-center gap-2">
              <Newspaper className="w-3.5 h-3.5" /> Latest Updates
            </p>
            <h2 className="text-[40px] font-semibold tracking-[-0.8px] text-white">
              What Happened in AI
            </h2>
          </div>
          <Link href="/news" className="text-[#378ADD] text-[14px] hover:text-[#85B7EB] flex items-center gap-1 transition-colors duration-150">
            View all news <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div 
                key={item.id} 
                className={index === 0 ? "relative before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[#378ADD] before:z-10 before:rounded-l-[12px] overflow-hidden rounded-[12px]" : ""}
              >
                <NewsCard news={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card-dark text-center py-16 text-[#5A5E7A] text-[15px]">
            News feed syncing — start the backend to see live articles.
          </div>
        )}
      </section>
      </FadeIn>

      {/* ── SECTION 4: FEATURED BLOG ────────────────────────────────────────── */}
      <FadeIn delay={300}>
      <section className="bg-[#13162A] border-y border-[#2A2D4A]">
        <div className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#C9A84C] mb-2 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" /> Step-by-step learning
              </p>
              <h2 className="text-[40px] font-semibold tracking-[-0.8px] text-white">
                How to Use AI
              </h2>
            </div>
            <Link href="/blog" className="text-[#378ADD] text-[14px] hover:text-[#85B7EB] flex items-center gap-1 transition-colors duration-150">
              Read all guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="card-dark text-center py-16 text-[#5A5E7A] text-[15px]">
              Blog guides coming soon.
            </div>
          )}
        </div>
      </section>
      </FadeIn>

      {/* ── SECTION 5: TOOLS SPOTLIGHT ──────────────────────────────────────── */}
      <FadeIn delay={400}>
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#AFA9EC] mb-2 flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5" /> Curated picks
            </p>
            <h2 className="text-[40px] font-semibold tracking-[-0.8px] text-white">
              Top AI Tools This Week
            </h2>
          </div>
          <Link href="/tools" className="text-[#378ADD] text-[14px] hover:text-[#85B7EB] flex items-center gap-1 transition-colors duration-150">
            Browse all tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        ) : (
          <div className="card-dark text-center py-16 text-[#5A5E7A] text-[15px]">
            Tools directory loading — start the backend to see live data.
          </div>
        )}
      </section>
      </FadeIn>

      {/* ── SECTION 6: AI AGENT BANNER ──────────────────────────────────────── */}
      <FadeIn delay={500}>
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#13162A] via-[#1A2A3A] to-[#13162A] border border-[#2A4A6A] rounded-[16px] px-8 lg:px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
          {/* Ambient glow in banner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#378ADD]/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#378ADD] font-medium mb-3">
              Powered by Groq AI
            </p>
            <h2 className="text-[36px] font-semibold text-white leading-[1.2]">
              Not sure which AI<br className="hidden lg:block"/> tool is right for you?
            </h2>
            <p className="text-[#8B8FA8] mt-4 text-[15px] max-w-[400px] mx-auto lg:mx-0">
              Ask our AI Agent. It understands your goal and recommends
              the perfect tools instantly.
            </p>
            <div className="flex justify-center lg:justify-start">
              <AgentBannerCTA />
            </div>
          </div>

          <div className="relative z-10 shrink-0 opacity-90 hidden sm:block">
            <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Lines forming V */}
              <path d="M40 40 L120 160 L200 40" stroke="#2A4A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Secondary connections */}
              <line x1="120" y1="160" x2="120" y2="40" stroke="#2A4A6A" strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />
              <line x1="40" y1="100" x2="200" y2="100" stroke="#2A4A6A" strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />
              
              {/* Nodes along the lines */}
              <circle cx="40" cy="40" r="5" fill="#378ADD" filter="url(#glowBlue)" />
              <circle cx="200" cy="40" r="5" fill="#378ADD" filter="url(#glowBlue)" />
              
              <circle cx="80" cy="100" r="4" fill="#85B7EB" opacity="0.8" />
              <circle cx="160" cy="100" r="4" fill="#85B7EB" opacity="0.8" />
              
              <circle cx="120" cy="160" r="6" fill="#378ADD" filter="url(#glowBlue)" />
              <circle cx="120" cy="40" r="4" fill="#C9A84C" filter="url(#glowGold)" />
            </svg>
          </div>
        </div>
      </section>
      </FadeIn>
    </>
  );
}
