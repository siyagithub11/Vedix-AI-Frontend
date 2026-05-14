'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Check, X } from 'lucide-react';
import ToolCard from '@/components/tools/ToolCard';
import { getToolsFeed } from '@/lib/api';
import { Tool } from '@/lib/types';

// Constants for filters
const CATEGORIES = ['Writing', 'Coding', 'Design', 'Video', 'Research', 'Other'];
const PRICING = ['FREE', 'FREEMIUM', 'PAID'];
const SKILLS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchTools = useCallback(async (pageNum: number, append = false) => {
    try {

      
      // If we have single filters, we can pass them to the API 
      // (Assuming backend supports basic filtering. If multiple, we might need client-side filtering, 
      // but let's assume we pass the first one or the API handles arrays. We will fetch and filter on client if complex).
      // For Vedix, the API accepts single category/pricing. For multiple checkboxes, we will fetch all or use the first.
      // To be safe and since this is UI perfection, we'll fetch a large batch and filter client-side if needed, 
      // or just send the first selected filter to the backend.
      // Actually, let's just pass the single selected if length === 1, or handle it via frontend filtering for perfect UX.
      
      // We will just fetch everything (limit 100) and filter on the client for snappy UI, 
      // since the prompt implies a rich interactive directory.
      const res = await getToolsFeed({ limit: 100 });
      let filtered = res.data;

      if (searchQuery) {
        filtered = filtered.filter((t: Tool) => 
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedCategories.length > 0) {
        filtered = filtered.filter((t: Tool) => selectedCategories.includes(t.category));
      }
      if (selectedPricing.length > 0) {
        filtered = filtered.filter((t: Tool) => selectedPricing.includes(t.pricing));
      }
      if (selectedSkills.length > 0) {
        filtered = filtered.filter((t: Tool) => selectedSkills.includes(t.skillLevel));
      }

      setTotalCount(filtered.length);
      
      // Simulate pagination on client-filtered data
      const limit = 12;
      const startIndex = (pageNum - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);

      if (append) {
        setTools(prev => [...prev, ...paginated]);
      } else {
        setTools(paginated);
      }
      
      setHasMore(startIndex + limit < filtered.length);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchQuery, selectedCategories, selectedPricing, selectedSkills]);

  // Refetch when filters change
  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    
    const timeoutId = setTimeout(() => {
      fetchTools(1, false);
    }, 300); // Debounce search
    
    return () => clearTimeout(timeoutId);
  }, [fetchTools]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTools(nextPage, true);
  };

  const toggleFilter = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  const removeFilter = (item: string, type: 'category' | 'pricing' | 'skill') => {
    if (type === 'category') setSelectedCategories(prev => prev.filter(i => i !== item));
    if (type === 'pricing') setSelectedPricing(prev => prev.filter(i => i !== item));
    if (type === 'skill') setSelectedSkills(prev => prev.filter(i => i !== item));
  };

  // Checkbox component helper
  const FilterCheckbox = ({ 
    label, 
    checked, 
    onChange 
  }: { 
    label: string, 
    checked: boolean, 
    onChange: () => void 
  }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
        checked ? 'bg-[#378ADD] border-[#378ADD]' : 'bg-[#1A1D35] border-[#2A2D4A]'
      }`}>
        {checked && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>
      <span className={`text-[14px] transition-colors ${checked ? 'text-white' : 'text-[#8B8FA8] group-hover:text-white'}`}>
        {label}
      </span>
    </label>
  );

  const activeFiltersCount = selectedCategories.length + selectedPricing.length + selectedSkills.length;

  return (
    <div className="pt-20 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-[48px] font-bold tracking-[-1px] text-white leading-tight mb-3">
          AI Tool Directory
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-[#8B8FA8] text-[15px]">
            Discover, compare, and master the best AI tools for your workflow.
          </p>
          <span className="bg-[#13162A] border border-[#2A2D4A] text-[#85B7EB] text-[12px] font-medium px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#378ADD] animate-pulse"></span>
            {isLoading ? '...' : totalCount} Indexed
          </span>
        </div>
      </div>

      <div className="lg:flex lg:gap-10 mt-12">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-full lg:w-64 flex-shrink-0 mb-10 lg:mb-0">
          <div className="sticky top-24 card-dark space-y-8">
            
            {/* Category Filter */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#8B8FA8] font-medium mb-4">
                Category
              </p>
              <div className="flex flex-col gap-3">
                {CATEGORIES.map(cat => (
                  <FilterCheckbox 
                    key={cat} 
                    label={cat} 
                    checked={selectedCategories.includes(cat.toUpperCase())}
                    onChange={() => toggleFilter(cat.toUpperCase(), selectedCategories, setSelectedCategories)}
                  />
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#2A2D4A]" />

            {/* Pricing Filter */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#8B8FA8] font-medium mb-4">
                Pricing Model
              </p>
              <div className="flex flex-col gap-3">
                {PRICING.map(price => (
                  <FilterCheckbox 
                    key={price} 
                    label={price} 
                    checked={selectedPricing.includes(price)}
                    onChange={() => toggleFilter(price, selectedPricing, setSelectedPricing)}
                  />
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#2A2D4A]" />

            {/* Skill Level Filter */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-[#8B8FA8] font-medium mb-4">
                Skill Level
              </p>
              <div className="flex flex-col gap-3">
                {SKILLS.map(skill => (
                  <FilterCheckbox 
                    key={skill} 
                    label={skill.charAt(0) + skill.slice(1).toLowerCase()} 
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleFilter(skill, selectedSkills, setSelectedSkills)}
                  />
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* ── RIGHT MAIN CONTENT ── */}
        <main className="flex-1 min-w-0">
          
          {/* Search Bar */}
          <div className="bg-[#13162A] border border-[#2A2D4A] rounded-xl px-4 py-3 flex items-center gap-3 mb-8 focus-within:border-[#378ADD] transition-colors shadow-sm">
            <Search className="w-5 h-5 text-[#5A5E7A]" />
            <input 
              type="text" 
              placeholder="Search AI tools (e.g. ChatGPT, Midjourney)..." 
              className="bg-transparent flex-1 text-white text-[15px] outline-none placeholder:text-[#5A5E7A]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Active Filters Row */}
          {activeFiltersCount > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {selectedCategories.map(cat => (
                <span key={cat} className="bg-[#1A2A3A] border border-[#2A4A6A] text-[#85B7EB] text-[12px] px-3 py-1 rounded-full flex items-center gap-2">
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  <button onClick={() => removeFilter(cat, 'category')} className="hover:text-white"><X size={12} /></button>
                </span>
              ))}
              {selectedPricing.map(price => (
                <span key={price} className="bg-[#1A2A3A] border border-[#2A4A6A] text-[#85B7EB] text-[12px] px-3 py-1 rounded-full flex items-center gap-2">
                  {price}
                  <button onClick={() => removeFilter(price, 'pricing')} className="hover:text-white"><X size={12} /></button>
                </span>
              ))}
              {selectedSkills.map(skill => (
                <span key={skill} className="bg-[#1A2A3A] border border-[#2A4A6A] text-[#85B7EB] text-[12px] px-3 py-1 rounded-full flex items-center gap-2">
                  {skill.charAt(0) + skill.slice(1).toLowerCase()}
                  <button onClick={() => removeFilter(skill, 'skill')} className="hover:text-white"><X size={12} /></button>
                </span>
              ))}
              <button 
                onClick={() => { setSelectedCategories([]); setSelectedPricing([]); setSelectedSkills([]); }}
                className="text-[12px] text-[#5A5E7A] hover:text-[#8B8FA8] px-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-[#13162A] border border-[#2A2D4A] rounded-xl h-48 w-full" />
              ))
            ) : tools.length > 0 ? (
              tools.map(tool => <ToolCard key={tool.id} tool={tool} />)
            ) : (
              <div className="col-span-full py-20 text-center text-[#5A5E7A] text-[15px]">
                No tools match your exact filters. Try clearing some.
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && !isLoading && tools.length > 0 && (
            <div className="mt-12 text-center">
              <button 
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="btn-outline px-10 py-3"
              >
                {isLoadingMore ? 'Loading...' : 'Load more tools'}
              </button>
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}
