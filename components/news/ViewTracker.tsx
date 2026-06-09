'use client';

import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Fire-and-forget: increment view count on backend
    fetch(`${API_URL}/api/news/${slug}/view`, { method: 'PUT' }).catch(() => {});
  }, [slug]);

  return null;
}
