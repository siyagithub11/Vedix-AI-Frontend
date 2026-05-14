'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import SafeImage from '@/components/shared/SafeImage';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'News', href: '/news' },
    { name: 'Blog', href: '/blog' },
    { name: 'Tools', href: '/tools' },
  ];

  const handleOpenAgent = () => {
    window.dispatchEvent(new CustomEvent('open-agent', { detail: { type: 'general' } }));
  };

  return (
    <nav 
      className={`sticky top-0 z-40 w-full bg-[#0D0F1A]/90 backdrop-blur-md border-b border-[#2A2D4A] transition-all duration-150 ${
        isScrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LEFT — Logo */}
        <Link href="/">
          <div className="flex items-center gap-2.5">
            <SafeImage src="/logo.png" alt="Vedix" className="h-9 w-auto" />
            <span className="text-white font-semibold text-[18px] tracking-wide">VEDIX</span>
          </div>
        </Link>
        
        {/* CENTER — Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-[15px] transition-colors duration-150 ${
                  isActive ? 'text-white font-medium' : 'text-[#8B8FA8] hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        {/* RIGHT — Actions */}
        <div className="flex items-center gap-4">
          <button className="text-[#8B8FA8] hover:text-white transition-colors duration-150" aria-label="Search">
            <Search size={20} strokeWidth={2} />
          </button>
          
          <button 
            onClick={handleOpenAgent}
            className="btn-primary text-[13px] px-4 py-2 hidden sm:block"
          >
            Try AI Agent
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#8B8FA8] hover:text-white transition-colors duration-150 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2D4A] bg-[#0D0F1A] absolute w-full left-0 top-16 shadow-xl">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`py-4 px-6 border-b border-[#2A2D4A] text-[15px] transition-colors duration-150 ${
                    isActive ? 'text-[#378ADD] bg-[#1A2A3A] font-medium' : 'text-[#8B8FA8] hover:text-white bg-[#0D0F1A]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="p-6">
              <button 
                onClick={() => {
                  handleOpenAgent();
                  setMobileMenuOpen(false);
                }}
                className="btn-primary w-full text-[15px] py-3"
              >
                Try AI Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
