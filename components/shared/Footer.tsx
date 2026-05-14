import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center mb-6">
           <div className="bg-primary text-white font-bold w-8 h-8 flex items-center justify-center rounded-lg">V</div>
           <span className="font-bold text-xl ml-2 text-foreground">VEDIX</span>
        </div>
        <p className="mb-6 max-w-md mx-auto text-sm">
          Discover AI. Learn how to use it. Decide with confidence. 
          Your guided platform for AI tools, news & guides.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/news" className="hover:text-primary transition-colors">News</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
          <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
        </div>
        <div className="mt-8 text-xs">
          &copy; {new Date().getFullYear()} Vedix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
