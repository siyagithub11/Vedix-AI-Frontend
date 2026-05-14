import Link from 'next/link';
import { LayoutDashboard, Newspaper, BookOpen, Wrench, LogOut } from 'lucide-react';
import SafeImage from '@/components/shared/SafeImage';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/tools', label: 'Tools', icon: Wrench },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-[#0D0F1A] border-r border-[#2A2D4A] min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-[#2A2D4A]">
        <Link href="/" className="flex items-center gap-3">
          <SafeImage src="/logo.png" alt="Vedix" className="h-8" />
          <div>
            <span className="text-white font-semibold text-base tracking-wide block leading-none">VEDIX</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#C9A84C]">Admin</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-[8px] text-[#8B8FA8] hover:text-white hover:bg-[#13162A] transition-all duration-150 text-[15px]"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2A2D4A]">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-[8px] text-[#8B8FA8] hover:text-white hover:bg-[#13162A] transition-all duration-150 text-[15px]">
          <LogOut className="w-4 h-4" /> Back to Site
        </Link>
      </div>
    </aside>
  );
}
