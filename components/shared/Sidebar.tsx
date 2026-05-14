import Link from 'next/link';
import { Home, Compass, Zap, Wrench, Newspaper, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-background border-r border-border h-screen flex flex-col fixed left-0 top-0 z-40 hidden md:flex">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="bg-primary text-white font-bold w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">V</div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none">Vedix</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">Illuminated Intel</span>
          </div>
        </Link>
        
        <nav className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Home className="w-5 h-5" /> Home
          </Link>
          
          <div className="mt-4 mb-2">
            <div className="bg-muted/50 rounded-xl p-1 relative overflow-hidden">
               {/* Active state indicator */}
               <div className="absolute inset-y-1 left-1 w-1 bg-accent rounded-full" />
               <Link href="/tools" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted text-foreground font-medium transition-colors ml-2">
                 <Compass className="w-5 h-5 text-accent" /> Discover
               </Link>
            </div>
          </div>

          <Link href="/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Zap className="w-5 h-5" /> Understand
          </Link>
          
          <Link href="/news" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Newspaper className="w-5 h-5" /> News
          </Link>

          <Link href="/tools" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Wrench className="w-5 h-5" /> Tools
          </Link>
        </nav>
      </div>
      
      <div className="mt-auto p-6 space-y-4">
        <button className="w-full bg-accent/10 hover:bg-accent/20 text-accent font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-accent/20 shadow-sm">
           <Zap className="w-4 h-4 fill-current" /> New Insight
        </button>
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </div>
    </aside>
  );
}
