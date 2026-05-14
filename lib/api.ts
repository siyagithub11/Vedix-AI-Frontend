import { NewsItem, BlogPost, Tool, PaginatedResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ─── NEWS ────────────────────────────────────────────────────────────────────

export async function getNewsFeed(params?: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<PaginatedResponse<NewsItem>> {
  const query = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 12),
    ...(params?.category ? { category: params.category } : {}),
  });
  const res = await fetch(`${API_URL}/api/news?${query}`, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error('Failed to fetch news feed');
  return res.json();
}

export async function getNewsItem(slug: string): Promise<NewsItem> {
  const res = await fetch(`${API_URL}/api/news/${slug}`, { next: { revalidate: 900 } });
  if (!res.ok) throw new Error(`Failed to fetch news item: ${slug}`);
  const json = await res.json();
  return json.data;
}

// ─── BLOG ────────────────────────────────────────────────────────────────────

export async function getBlogFeed(params?: {
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<BlogPost>> {
  const query = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 12),
  });
  const res = await fetch(`${API_URL}/api/blog?${query}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch blog feed');
  return res.json();
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API_URL}/api/blog/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch blog post: ${slug}`);
  const json = await res.json();
  return json.data;
}

// ─── TOOLS ───────────────────────────────────────────────────────────────────

export async function getToolsFeed(params?: {
  page?: number;
  limit?: number;
  category?: string;
  pricing?: string;
}): Promise<PaginatedResponse<Tool>> {
  const query = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 24),
    ...(params?.category ? { category: params.category } : {}),
    ...(params?.pricing ? { pricing: params.pricing } : {}),
  });
  const res = await fetch(`${API_URL}/api/tools?${query}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch tools');
  return res.json();
}

export async function getTool(slug: string): Promise<Tool> {
  const res = await fetch(`${API_URL}/api/tools/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch tool: ${slug}`);
  const json = await res.json();
  return json.data;
}
