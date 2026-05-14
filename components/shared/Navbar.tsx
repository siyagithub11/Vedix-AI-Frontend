import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-white font-bold w-8 h-8 flex items-center justify-center rounded-lg">V</div>
            <span className="font-bold text-xl tracking-tight text-primary">VEDIX</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/news" className="text-muted-foreground hover:text-foreground transition-colors">News</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">Tools</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <button className="hidden md:block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
            Try AI Agent
          </button>
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
