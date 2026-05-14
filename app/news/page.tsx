'use client';

import { useState, useEffect, useCallback } from 'react';
import NewsCard from '@/components/news/NewsCard';
import { getNewsFeed } from '@/lib/api';
import { NewsItem } from '@/lib/types';

const CATEGORIES = ['All', 'Model', 'Tools', 'Research', 'Business'];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchNews = useCallback(async (pageNum: number, category: string, append = false) => {
    try {
      const params: { page: number; limit: number; category?: string } = { page: pageNum, limit: 12 };
      if (category !== 'All') {
        params.category = category.toUpperCase();
      }
      
      const res = await getNewsFeed(params);
      
      if (append) {
        setNews(prev => [...prev, ...res.data]);
      } else {
        setNews(res.data);
      }
      setHasMore(res.meta.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchNews(1, activeCategory, false);
  }, [activeCategory, fetchNews]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, activeCategory, true);
  };

  return (
    <div className="bg-[#0D0F1A] min-h-screen">
      <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#378ADD] font-medium mb-2">
              Updated continuously
            </p>
            <h1 className="text-[48px] font-bold tracking-[-1px] text-white leading-tight">
              AI News
            </h1>
            <p className="text-[#8B8FA8] text-[15px] mt-2">
              What&apos;s happening in artificial intelligence, daily.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#13162A] border border-[#2A2D4A] rounded-full px-4 py-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[#8B8FA8] text-[13px]">Live feed</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex gap-3 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-[20px] text-[13px] cursor-pointer transition-all ${
                activeCategory === cat
                  ? 'bg-[#378ADD20] border border-[#378ADD] text-[#85B7EB] font-medium'
                  : 'bg-transparent border border-[#2A2D4A] text-[#8B8FA8] hover:border-[#378ADD40]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#13162A] border border-[#2A2D4A] rounded-xl h-72 w-full" />
            ))
          ) : news.length > 0 ? (
            news.map((item, i) => (
              <NewsCard key={item.id} news={item} isFeatured={i === 0 && activeCategory === 'All' && page === 1} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-[#5A5E7A] text-[15px]">
              No news found in this category.
            </div>
          )}
        </div>

        {/* Load More */}
        {hasMore && !isLoading && news.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="btn-outline px-10 py-3 text-[15px]"
            >
              {isLoadingMore ? 'Loading...' : 'Load more news'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
