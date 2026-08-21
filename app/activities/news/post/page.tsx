import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NewsPostClient } from '@/components/news-post-client';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'News',
  description: 'News and updates from the Safe & Applied Intelligence Lab.',
};

export default function NewsPostPage() {
  return (
    <main className="interior-page">
      <SiteHeader />
      <article className="news-article">
        <Suspense fallback={<p className="news-status">Loading news…</p>}>
          <NewsPostClient />
        </Suspense>
      </article>
      <SiteFooter />
    </main>
  );
}
