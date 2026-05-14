import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgentButton from '@/components/agent/AgentButton';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vedix.ai'),
  title: 'Vedix — Discover AI. Learn how to use it. Decide with confidence.',
  description: 'The premier AI discovery and learning platform.',
  openGraph: {
    title: 'Vedix — AI Discovery Platform',
    description: 'The premier AI discovery and learning platform.',
    url: 'https://vedix.ai',
    siteName: 'Vedix',
    images: [{ url: '/og-image.png' }],
  }
};

export const viewport = {
  themeColor: '#0D0F1A',
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="bg-[#0D0F1A] text-white min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <div className="animate-[fade-in_300ms_ease]">
            {children}
          </div>
        </main>
        <Footer />
        <AgentButton />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
