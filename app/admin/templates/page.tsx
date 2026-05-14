'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Edit3 } from 'lucide-react';

const SUGGESTIONS = [
  'AI for Students',
  'AI in Healthcare',
  'Coding with AI',
  'AI Design Tools'
];

interface GeneratedOutline {
  title: string;
  sections: Array<{
    heading: string;
    bullets: string[];
  }>;
  tools: string[];
}

export default function TemplatesPage() {
  const [theme, setTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outline, setOutline] = useState<GeneratedOutline | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    
    setIsGenerating(true);
    setOutline(null);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock generated outline
    setOutline({
      title: `The Ultimate Guide to ${theme}`,
      sections: [
        {
          heading: '1. Introduction to the Ecosystem',
          bullets: [
            'Why this matters right now',
            'Key challenges being solved by AI',
            'Overview of the current landscape'
          ]
        },
        {
          heading: '2. Top Tools You Need to Know',
          bullets: [
            'Deep dive into the industry leader',
            'Best budget/open-source alternative',
            'Niche tool for specific workflows'
          ]
        },
        {
          heading: '3. Step-by-Step Implementation',
          bullets: [
            'Setting up your first workspace',
            'Prompting best practices',
            'Avoiding common beginner mistakes'
          ]
        }
      ],
      tools: ['ChatGPT', 'Midjourney', 'Notion AI', 'Claude 3']
    });
    
    setIsGenerating(false);
  };

  return (
    <div className="max-w-3xl mx-auto pb-24">
      
      {/* Header */}
      <h1 className="text-[32px] font-semibold mb-2 text-white tracking-tight flex items-center gap-3">
        Weekly Template Generator
      </h1>
      <p className="text-[#8B8FA8] text-[15px] mb-10">
        Generate a full blog outline with AI based on trending topics.
      </p>

      {/* STEP 1: Input Card */}
      <div className="card-dark p-8">
        <label className="text-[11px] uppercase tracking-[0.05em] text-[#8B8FA8] font-medium mb-3 block">
          This week&apos;s theme
        </label>
        <div className="relative">
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g. AI for Students, AI in Healthcare..."
            className="w-full bg-[#1A1D35] border border-[#2A2D4A] rounded-xl px-5 py-4 text-white text-[18px] focus:border-[#378ADD] outline-none placeholder:text-[#5A5E7A] transition-colors shadow-inner"
            disabled={isGenerating}
          />
        </div>

        {/* Suggestions Row */}
        <div className="flex gap-2 flex-wrap mt-4">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => setTheme(s)}
              disabled={isGenerating}
              className="bg-[#1A1D35] border border-[#2A2D4A] text-[#8B8FA8] text-[12px] px-4 py-1.5 rounded-full cursor-pointer hover:border-[#378ADD] hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        {isGenerating ? (
          <div className="mt-8 space-y-3">
            <div className="h-6 w-3/4 bg-[#1A1D35] rounded-lg animate-pulse"></div>
            <div className="h-6 w-full bg-[#1A1D35] rounded-lg animate-pulse animation-delay-150"></div>
            <div className="h-6 w-5/6 bg-[#1A1D35] rounded-lg animate-pulse animation-delay-300"></div>
            <p className="text-center text-[#5A5E7A] text-[13px] mt-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse text-[#C9A84C]" /> Groq is drafting...
            </p>
          </div>
        ) : (
          <button 
            onClick={handleGenerate}
            disabled={!theme.trim()}
            className="btn-primary w-full mt-8 py-4 text-[15px] font-medium flex items-center justify-center gap-2 disabled:opacity-50 group"
          >
            <Sparkles className="w-4 h-4 text-[#85B7EB] group-hover:text-white" />
            Generate outline with AI
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>

      {/* STEP 2: Results Card */}
      {outline && !isGenerating && (
        <div className="card-dark p-8 mt-6 border border-[#2A4A6A] bg-gradient-to-b from-[#13162A] to-[#0D0F1A] animate-in slide-in-from-bottom-4 fade-in duration-300">
          
          <h2 className="text-white text-[24px] font-semibold mb-6 tracking-tight leading-snug border-b border-[#2A2D4A] pb-4">
            {outline.title}
          </h2>

          {/* Sections */}
          <div className="space-y-4">
            {outline.sections.map((section, i) => (
              <div key={i} className="bg-[#1A1D35] rounded-xl p-5 border border-[#2A2D4A]">
                <h4 className="text-white font-medium mb-3 text-[16px]">{section.heading}</h4>
                <ul className="text-[#8B8FA8] text-[14px] space-y-1.5 pl-4 list-disc marker:text-[#378ADD]">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="pl-1">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tool Suggestions */}
          <div className="mt-8 border-t border-[#2A2D4A] pt-6">
            <h5 className="text-[#C9A84C] text-[11px] uppercase tracking-[0.08em] font-medium mb-3">
              Suggested Tools to Link
            </h5>
            <div className="flex gap-2 flex-wrap">
              {outline.tools.map(t => (
                <span key={t} className="bg-[#2A1F0A] border border-[#4A350A] text-[#EF9F27] text-[13px] px-3 py-1.5 rounded-full font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4">
            <button className="btn-primary py-3 px-6 flex-1 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(55,138,221,0.2)]">
              <Edit3 className="w-4 h-4" />
              Edit & Publish
            </button>
            <button 
              onClick={handleGenerate}
              className="btn-outline py-3 px-6 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
