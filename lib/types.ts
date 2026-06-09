export interface NewsUseCases {
  tech?: string;
  business?: string;
  student?: string;
  general?: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  category: 'MODEL' | 'TOOLS' | 'RESEARCH' | 'BUSINESS';
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  publishedAt: string;
  readTime: number;
  isPublished: boolean;
  blogId?: string;
  blogSlug?: string;
  viewCount?: number;
  realWorldImpact?: string | null;
  useCases?: NewsUseCases | null;
  discussionPrompt?: string | null;
  relatedToolNames?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  isPublished: boolean;
  toolIds: string[];
  newsIds: string[];
  likeCount?: number;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  category: 'WRITING' | 'CODING' | 'DESIGN' | 'VIDEO' | 'RESEARCH' | 'OTHER';
  pricing: 'FREE' | 'FREEMIUM' | 'PAID';
  skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  rating?: number;
  blogIds: string[];
}

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}
