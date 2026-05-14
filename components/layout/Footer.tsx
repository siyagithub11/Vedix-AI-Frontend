'use client';

import Link from 'next/link';
import { X as XIcon, GitBranch } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export default function Footer() {
  return (
    <footer className="bg-[#13162A] border-t border-[#2A2D4A] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1: Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <SafeImage src="/logo.png" alt="Vedix" className="h-8 w-auto" />
              <span className="text-white font-semibold text-[18px] tracking-wide">VEDIX</span>
            </Link>
            <p className="text-[#8B8FA8] text-[14px] mt-4 leading-[1.7] max-w-[250px]">
              Discover AI. Learn how to use it. Decide with confidence.
            </p>
          </div>
          
          {/* Col 2: Product */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] mb-5">
              Product
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/news" className="text-[15px] text-[#8B8FA8] hover:text-white transition-colors duration-150">News</Link>
              <Link href="/blog" className="text-[15px] text-[#8B8FA8] hover:text-white transition-colors duration-150">Blog</Link>
              <Link href="/tools" className="text-[15px] text-[#8B8FA8] hover:text-white transition-colors duration-150">Tools</Link>
            </div>
          </div>
          
          {/* Col 3: Company */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] mb-5">
              Company
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-[15px] text-[#8B8FA8] hover:text-white transition-colors duration-150">About</Link>
              <Link href="/contact" className="text-[15px] text-[#8B8FA8] hover:text-white transition-colors duration-150">Contact</Link>
              <Link href="/admin" className="text-[15px] text-[#8B8FA8] hover:text-white transition-colors duration-150">Admin</Link>
            </div>
          </div>
          
          {/* Col 4: Stay Updated */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#5A5E7A] mb-5">
              Stay Updated
            </h4>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email@example.com" 
                required
                className="bg-[#1A1D35] border border-[#2A2D4A] rounded-[8px] px-4 py-2 w-full text-white placeholder:text-[#5A5E7A] focus:border-[#378ADD] focus:outline-none transition-colors duration-150 text-[15px]"
              />
              <button type="submit" className="btn-primary w-full py-2.5">
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-[#2A2D4A] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-[#5A5E7A]">
            © 2025 Vedix. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#5A5E7A] hover:text-[#8B8FA8] transition-colors" aria-label="Twitter / X">
              <XIcon size={18} />
            </a>
            <a href="#" className="text-[#5A5E7A] hover:text-[#8B8FA8] transition-colors" aria-label="GitHub">
              <GitBranch size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
