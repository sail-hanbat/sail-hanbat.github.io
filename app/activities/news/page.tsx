import type { Metadata } from 'next';
import Link from 'next/link';
import { NewsFeed } from '@/components/news-feed';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'News',
  description: 'News and updates from the Safe & Applied Intelligence Lab.',
};

export default function NewsPage() {
  return (
    <main className="interior-page">
      <SiteHeader />
      <section className="interior-hero compact-interior-hero">
        <div className="container interior-hero-copy">
          <span className="eyebrow">Activities</span>
          <h1>News</h1>
          <p>Research, publication, and laboratory updates from SAIL.</p>
          <Link className="admin-button primary news-action-button" href="/activities/news/admin/?action=new">
            Write News
          </Link>
        </div>
      </section>
      <section className="news-index">
        <div className="container">
          <NewsFeed />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
