'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Newspaper, BookOpen, Wrench, Sparkles, LogOut, User } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { name: 'News', href: '/admin/news', icon: Newspaper },
    { name: 'Blog', href: '/admin/blog', icon: BookOpen },
    { name: 'Tools', href: '/admin/tools', icon: Wrench },
    { name: 'Templates', href: '/admin/templates', icon: Sparkles },
  ];

  return (
    <div className="flex h-screen bg-[#0A0C16] overflow-hidden font-sans">
      
      {/* ── SIDEBAR ── */}
      <aside className="w-60 flex-shrink-0 bg-[#0A0C16] border-r border-[#2A2D4A] flex flex-col z-10">
        
        {/* Top Branding */}
        <div className="px-5 py-6 border-b border-[#2A2D4A]">
          <Link href="/">
            <SafeImage src="/logo.png" alt="Vedix" className="h-7 w-auto" />
          </Link>
          <span className="text-[#8B8FA8] text-[12px] block mt-1 tracking-wide">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-[14px] font-medium transition-all duration-150 ${
                    isActive 
                      ? 'bg-[#1A2A3A] text-[#378ADD]' 
                      : 'text-[#8B8FA8] hover:text-white hover:bg-[#13162A]'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom User Info */}
        <div className="px-4 py-4 border-t border-[#2A2D4A]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-[#1A1D35] border border-[#2A2D4A] flex items-center justify-center shrink-0">
              <User size={14} className="text-[#8B8FA8]" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-[13px] font-medium truncate">Admin User</p>
              <p className="text-[#5A5E7A] text-[11px] truncate">admin@vedix.ai</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-[#5A5E7A] text-[13px] hover:text-white transition-colors w-full px-2 py-1.5 rounded hover:bg-[#13162A]">
            <LogOut size={14} />
            Sign out
          </button>
        </div>

      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto bg-[#0D0F1A] p-8">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
