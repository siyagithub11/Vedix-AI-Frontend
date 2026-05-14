'use client';

import { useState } from 'react';
import NewsCard from '@/components/news/NewsCard';
import FilterPills from '@/components/news/FilterPills';
import { NewsCardSkeleton } from '@/components/shared/Skeleton';
import { NewsItem } from '@/lib/types';

interface NewsGridProps {
  initialNews: NewsItem[];
}

export default function NewsGrid({ initialNews }: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = async (cat: string) => {
    setActiveCategory(cat);
    setIsLoading(true);
    try {
      const params = cat === 'ALL' ? '' : `&category=${cat}`;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/news?limit=12${params}`
      );
      if (res.ok) {
        const data = await res.json();
        setNews(data.data ?? []);
      }
    } catch {
      // keep existing news on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <FilterPills active={activeCategory} onChange={handleCategoryChange} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)}
        </div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <div className="card-dark text-center py-20 text-[#5A5E7A]">
          No news found for this category.
        </div>
      )}
    </div>
  );
}
