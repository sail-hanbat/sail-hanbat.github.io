'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export function LegacyNewsRedirect({ slug }: { slug: string }) {
  const href = `/activities/news/post/?slug=${encodeURIComponent(slug)}`;

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return <p className="news-status">Opening the updated post… <Link href={href}>Continue</Link></p>;
}
