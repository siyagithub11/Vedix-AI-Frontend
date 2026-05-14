import { getBlogPost, getToolsFeed, getNewsFeed } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { NewsItem, Tool } from '@/lib/types';
import AgentBannerCTA from '@/components/shared/AgentBannerCTA'; // Client component
import SafeImage from '@/components/shared/SafeImage';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    return { title: `${post.title} — Vedix Blog`, description: post.excerpt };
  } catch {
    return { title: 'Blog — Vedix' };
  }
}

// Helper to inject Ask AI CTA before every <h2> tag (except the very first one, optionally)
function injectAskAIBanners(htmlContent: string) {
  if (!htmlContent) return '';
  
  const ctaHtml = `
    <div class="my-8 flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-[#13162A] border border-[#2A2D4A] rounded-xl cursor-pointer hover:border-[#378ADD40] transition-colors" onclick="window.dispatchEvent(new CustomEvent('open-agent', {detail:{type:'general'}}))">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#378ADD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span class="text-[#8B8FA8] text-[14px]">Have questions about this section?</span>
      </div>
      <button class="btn-outline sm:ml-auto text-[13px] py-1.5 px-4 pointer-events-none mt-2 sm:mt-0 w-full sm:w-auto">
        Ask Vedix AI &rarr;
      </button>
    </div>
  `;
  
  // Inject before every <h2> except the first one to avoid immediate clutter
  let count = 0;
  return htmlContent.replace(/<h2/g, (match) => {
    count++;
    if (count === 1) return match; // skip first
    return `${ctaHtml}${match}`;
  });
}

// Extract h2 headings for TOC
function extractHeadings(htmlContent: string) {
  const headings = [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    // strip inner html tags if any
    const text = match[1].replace(/<[^>]*>?/gm, '');
    headings.push(text);
  }
  return headings;
}

export default async function BlogDetailPage({ params }: Props) {
  let post;
  try {
    post = await getBlogPost(params.slug);
  } catch {
    notFound();
  }

  // Fetch related content concurrently
  const [toolsRes, newsRes] = await Promise.allSettled([
    post.toolIds?.length > 0 ? getToolsFeed({ limit: 10 }) : Promise.resolve({ data: [] }),
    getNewsFeed({ limit: 3, category: post.tags[0] || 'ALL' })
  ]);

  const relatedTools = toolsRes.status === 'fulfilled' 
    ? toolsRes.value.data.filter((t: Tool) => post.toolIds.includes(t.id)) 
    : [];
    
  const relatedNews = newsRes.status === 'fulfilled' ? newsRes.value.data : [];

  const dateFormatted = format(new Date(post.publishedAt), 'MMMM d, yyyy');
  const processedContent = injectAskAIBanners(post.content);
  const headings = extractHeadings(post.content);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      
      {/* Cover */}
      {post.coverImage && (
        <div className="w-full aspect-[21/9] object-cover rounded-2xl overflow-hidden mb-12 bg-[#1A1D35]">
          <SafeImage src={post.coverImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        
        {/* ── LEFT COLUMN ── */}
        <div className="min-w-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium uppercase tracking-[0.08em] px-2.5 py-1 rounded-[20px] border bg-[#1F1A3A] border-[#3A2A6A] text-[#AFA9EC]">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-[48px] font-bold tracking-[-1.5px] leading-[1.1] text-white mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-4 mb-10 pb-8 border-b border-[#2A2D4A]">
            <span className="text-[#8B8FA8] text-[13px] flex items-center gap-1.5">
              <Calendar size={14} /> {dateFormatted}
            </span>
            <span className="text-[#5A5E7A] text-[13px]">·</span>
            <span className="text-[#8B8FA8] text-[13px] flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime} min read
            </span>
            <span className="text-[#5A5E7A] text-[13px]">·</span>
            <span className="text-[#8B8FA8] text-[13px]">By Vedix Editorial</span>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-invert max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-4 prose-h2:tracking-tight prose-h2:border-l-4 prose-h2:border-[#378ADD] prose-h2:pl-4
              prose-p:text-[#8B8FA8] prose-p:leading-[1.7] prose-p:text-[15px]
              prose-a:text-[#378ADD] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-code:bg-[#1A1D35] prose-code:text-[#AFA9EC] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px]
              prose-pre:bg-[#13162A] prose-pre:border prose-pre:border-[#2A2D4A] prose-pre:rounded-[12px]
              prose-blockquote:border-l-4 prose-blockquote:border-[#C9A84C] prose-blockquote:bg-[#13162A] prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-[8px] prose-blockquote:not-italic prose-blockquote:text-[#8B8FA8]
              prose-li:text-[#8B8FA8] prose-li:text-[15px]
              prose-hr:border-[#2A2D4A]
              prose-img:rounded-[12px]"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Related News at bottom */}
          {relatedNews.length > 0 && (
            <div className="border-t border-[#2A2D4A] pt-12 mt-12">
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#C9A84C] font-medium mb-6">
                Related News
              </p>
              <div className="flex flex-col gap-4">
                {relatedNews.map((newsItem: NewsItem) => (
                  <Link 
                    key={newsItem.id} 
                    href={`/news/${newsItem.slug}`}
                    className="card-dark group flex flex-col sm:flex-row gap-4 hover:border-[#378ADD40] transition-colors"
                  >
                    {newsItem.imageUrl && (
                      <div className="w-full sm:w-24 h-16 rounded-[8px] overflow-hidden shrink-0 bg-[#1A1D35]">
                        <SafeImage src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[15px] font-semibold text-white group-hover:text-[#85B7EB] transition-colors line-clamp-1 mb-1">
                        {newsItem.title}
                      </h4>
                      <p className="text-[13px] text-[#5A5E7A] flex items-center gap-2">
                        {format(new Date(newsItem.publishedAt), 'MMM d, yyyy')} <span className="text-[#378ADD] ml-auto group-hover:underline">Read article &rarr;</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <aside className="w-full">
          <div className="sticky top-24 space-y-6">
            
            {/* Ask AI Card */}
            <div className="card-dark text-center flex flex-col items-center">
              <MessageSquare className="w-8 h-8 text-[#378ADD] mb-4 opacity-80" />
              <h3 className="text-white font-semibold mb-2">Ask Vedix AI</h3>
              <p className="text-[#5A5E7A] text-[13px] mb-6">
                Get instant answers about the concepts and AI tools mentioned in this article.
              </p>
              <div className="w-full">
                 <AgentBannerCTA />
              </div>
            </div>

            {/* TOC Card */}
            {headings.length > 0 && (
              <div className="card-dark">
                <p className="text-[11px] uppercase text-[#8B8FA8] font-medium mb-4 tracking-[0.05em]">
                  In this article
                </p>
                <div className="flex flex-col">
                  {headings.map((heading, i) => (
                    <span 
                      key={i} 
                      className={`text-[13px] py-1.5 block cursor-pointer transition-colors ${
                        i === 0 
                          ? 'text-[#378ADD] font-medium border-l-2 border-[#378ADD] pl-3 -ml-[1.25rem] bg-[#378ADD]/5' 
                          : 'text-[#8B8FA8] hover:text-white border-l-2 border-transparent pl-3 -ml-[1.25rem]'
                      }`}
                      style={{ paddingLeft: 'calc(1.25rem + 2px)' }}
                    >
                      {heading}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Card */}
            {relatedTools.length > 0 && (
              <div className="card-dark">
                <p className="text-[11px] uppercase text-[#8B8FA8] font-medium mb-4 tracking-[0.05em]">
                  Tools mentioned
                </p>
                <div className="flex flex-col">
                  {relatedTools.map((tool: Tool) => (
                    <Link 
                      key={tool.id} 
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 py-3 border-b border-[#2A2D4A] last:border-0 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#1A1D35] border border-[#2A2D4A] flex items-center justify-center shrink-0 overflow-hidden">
                        {tool.logoUrl ? (
                          <SafeImage src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-[#5A5E7A] text-[11px] font-bold">{tool.name[0]}</span>
                        )}
                      </div>
                      <span className="text-white text-[14px] group-hover:text-[#85B7EB] transition-colors font-medium">
                        {tool.name}
                      </span>
                      <span className="text-[11px] text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-2 py-0.5 rounded ml-auto">
                      {tool.pricing}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
}
