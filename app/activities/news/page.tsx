import type { Metadata } from 'next';
import { NewsCard } from '@/components/news-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getAllNewsPosts } from '@/lib/news';

export const metadata: Metadata = {
  title: 'News',
  description: 'News and updates from the Safe & Applied Intelligence Lab.',
};

export default function NewsPage() {
  const posts = getAllNewsPosts();

  return (
    <main className="interior-page">
      <SiteHeader />
      <section className="interior-hero compact-interior-hero">
        <div className="container interior-hero-copy">
          <span className="eyebrow">Activities</span>
          <h1>News</h1>
          <p>Research, publication, and laboratory updates from SAIL.</p>
        </div>
      </section>
      <section className="news-index">
        <div className="container">
          {posts.length > 0 ? (
            <div className="news-grid news-index-grid">
              {posts.map((post) => <NewsCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <p className="empty-state">News will be posted here.</p>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
