import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NewsAdmin } from '@/components/news-admin';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'News Administration',
  description: 'SAIL news administration.',
  robots: { index: false, follow: false },
};

export default function NewsAdminPage() {
  return (
    <main className="interior-page">
      <SiteHeader />
      <section className="interior-hero compact-interior-hero admin-hero">
        <div className="container interior-hero-copy">
          <h1>News</h1>
          <p>Publish and manage laboratory news.</p>
        </div>
      </section>
      <Suspense fallback={<section className="admin-shell"><div className="container"><p className="news-status">Checking access…</p></div></section>}>
        <NewsAdmin />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
