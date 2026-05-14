import { getBlogFeed } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import BlogCard from '@/components/blog/BlogCard';

export const metadata = {
  title: 'Blog — Vedix',
  description: 'How-to guides and deep dives on AI tools, techniques, and trends.',
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    const data = await getBlogFeed({ limit: 12 });
    posts = data.data;
  } catch {
    // backend offline
  }

  const [featured, ...rest] = posts;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8B8FA8] mb-3">Editorial</p>
        <h1 className="text-section text-white mb-3">Intellectual Currents.</h1>
        <p className="text-[15px] text-[#8B8FA8] leading-[1.7] max-w-2xl">
          Exploring the intersection of artificial intelligence, minimalist design, and the future of human productivity.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="card-dark text-center py-20 text-[#5A5E7A]">
          Blog guides coming soon.
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <div className="mb-10">
              <BlogCard post={featured} featured={true} />
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
