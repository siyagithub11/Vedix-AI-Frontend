'use client';

export default function DiscussButton({ title, slug }: { title: string; slug: string }) {
  return (
    <button 
      className="btn-primary mt-6"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('open-agent', {
          detail: { type: 'news', title, slug }
        }));
      }}
    >
      Discuss with AI →
    </button>
  );
}
