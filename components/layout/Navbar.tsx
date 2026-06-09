'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import SafeImage from '@/components/shared/SafeImage';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAdmin, isLoggedIn, signOut } = useAuth();
  const router = useRouter();

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
            className="btn-primary text-[13px] px-4 py-2 hidden sm:block mr-2"
          >
            Try AI Agent
          </button>

          {/* Auth State */}
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#378ADD] flex items-center justify-center text-white text-[12px] font-semibold focus:outline-none"
              >
                {user?.user_metadata?.displayName?.[0]?.toUpperCase() || '?'}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#13162A] border border-[#2A2D4A] rounded-xl shadow-xl py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2 text-[14px] text-[#8B8FA8] hover:text-white hover:bg-[#1A1D35] transition-colors" onClick={() => setDropdownOpen(false)}>
                    My profile
                  </Link>
                  <Link href="/my-blogs" className="block px-4 py-2 text-[14px] text-[#8B8FA8] hover:text-white hover:bg-[#1A1D35] transition-colors" onClick={() => setDropdownOpen(false)}>
                    My blogs
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="block px-4 py-2 text-[14px] text-[#C9A84C] hover:text-[#E2C36D] hover:bg-[#1A1D35] transition-colors font-medium" onClick={() => setDropdownOpen(false)}>
                      Admin panel
                    </Link>
                  )}
                  <div className="border-t border-[#2A2D4A] my-1" />
                  <button 
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut();
                      router.push('/');
                    }}
                    className="w-full text-left px-4 py-2 text-[14px] text-[#F87171] hover:text-[#FCA5A5] hover:bg-[#1A1D35] transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login" className="btn-outline text-sm py-1.5 px-4">
                Sign in
              </Link>
              <Link href="/register" className="btn-primary text-sm py-1.5 px-4">
                Register
              </Link>
            </div>
          )}

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
        <div className="md:hidden border-t border-[#2A2D4A] bg-[#0D0F1A] absolute w-full left-0 top-16 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
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
            
            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              <div className="px-6 py-5 border-b border-[#2A2D4A] bg-[#13162A]/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#378ADD] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                    {user?.user_metadata?.displayName?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-[14px] truncate">
                      {user?.user_metadata?.displayName || 'User'}
                    </div>
                    <div className="text-[#8B8FA8] text-[12px] truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3.5 pl-0.5">
                  <Link 
                    href="/profile" 
                    className="text-[#8B8FA8] hover:text-white text-[14px] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My profile
                  </Link>
                  <Link 
                    href="/my-blogs" 
                    className="text-[#8B8FA8] hover:text-white text-[14px] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My blogs
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className="text-[#C9A84C] hover:text-[#E2C36D] text-[14px] transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin panel
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                      router.push('/');
                    }}
                    className="w-full text-left text-[#F87171] hover:text-[#FCA5A5] text-[14px] transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-5 border-b border-[#2A2D4A] flex flex-col gap-3">
                <Link 
                  href="/login" 
                  className="btn-outline w-full text-center py-2.5 text-[14px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  href="/register" 
                  className="btn-primary w-full text-center py-2.5 text-[14px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}

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
