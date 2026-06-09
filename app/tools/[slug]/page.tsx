import { getTool, getToolsFeed } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star, BookOpen, Wrench } from 'lucide-react';
import ToolCard from '@/components/tools/ToolCard';
import SafeImage from '@/components/shared/SafeImage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const tool = await getTool(slug);
    return { title: `${tool.name} — Vedix Tools`, description: tool.description };
  } catch {
    return { title: 'Tool — Vedix' };
  }
}

const PRICING_STYLE = {
  FREE:     'bg-[#0F2A1F] border-[#1A4A30] text-[#5DCAA5]',
  FREEMIUM: 'bg-[#1F1A3A] border-[#3A2A6A] text-[#AFA9EC]',
  PAID:     'bg-[#2A1F0A] border-[#4A350A] text-[#EF9F27]',
} as const;

const LEVEL_LABEL = {
  BEGINNER:     'Beginner-friendly',
  INTERMEDIATE: 'Intermediate level',
  ADVANCED:     'Advanced users',
} as const;

export default async function ToolDetailPage({ params }: Props) {
  let tool;
  try {
    const { slug } = await params;
    tool = await getTool(slug);
  } catch {
    notFound();
  }

  const relatedTools = await getToolsFeed({ limit: 8, category: tool.category })
    .then((r) => r.data.filter((t) => t.slug !== tool.slug).slice(0, 3))
    .catch(() => []);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-16">

        {/* ── Main Content ── */}
        <div className="flex-1 max-w-3xl">
          <Link href="/tools" className="inline-flex items-center gap-2 text-[#8B8FA8] hover:text-white transition-colors text-[13px] mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>

          {/* Hero Card */}
          <div className="card-dark mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-[12px] bg-[#1A1D35] border border-[#2A2D4A] flex items-center justify-center shrink-0 overflow-hidden">
                {tool.logoUrl
                  ? <SafeImage src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain p-2" />
                  : <Wrench className="w-8 h-8 text-[#5A5E7A]" />
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-[40px] font-semibold tracking-[-0.8px] text-white">{tool.name}</h1>
                  <span className={`text-[11px] font-medium uppercase tracking-[0.08em] px-2.5 py-1 rounded-[20px] border ${PRICING_STYLE[tool.pricing]}`}>
                    {tool.pricing}
                  </span>
                </div>
                <p className="text-[15px] text-[#8B8FA8] leading-[1.7] mb-4">{tool.description}</p>
                <div className="flex items-center gap-4">
                  {tool.rating && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-[#C9A84C] fill-[#C9A84C]" />
                      <span className="text-[15px] font-medium text-white">{tool.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <span className="text-[13px] text-[#8B8FA8]">{LEVEL_LABEL[tool.skillLevel]}</span>
                  <span className="text-[13px] text-[#8B8FA8]">{tool.category}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-[#2A2D4A]">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 py-3 px-6"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
              {tool.blogIds?.length > 0 && (
                <Link
                  href={`/blog`}
                  className="btn-outline flex items-center gap-2 py-3 px-6"
                >
                  <BookOpen className="w-4 h-4" /> View Guides
                </Link>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-dark text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] mb-2">Category</p>
              <p className="text-[18px] font-semibold text-white">{tool.category}</p>
            </div>
            <div className="card-dark text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] mb-2">Pricing</p>
              <p className="text-[18px] font-semibold text-white">{tool.pricing}</p>
            </div>
            <div className="card-dark text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] mb-2">Skill Level</p>
              <p className="text-[18px] font-semibold text-white">{tool.skillLevel}</p>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-80 shrink-0 space-y-8">
          {relatedTools.length > 0 && (
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8B8FA8] mb-4">Similar Tools</h3>
              <div className="flex flex-col gap-4">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
