import type { Metadata } from 'next';
import { LegacyNewsRedirect } from '@/components/legacy-news-redirect';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: 'News',
  description: 'News and updates from the Safe & Applied Intelligence Lab.',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'sail-website-opens' }];
}

export default async function LegacyNewsPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="interior-page">
      <SiteHeader />
      <article className="news-article">
        <div className="container article-container news-article-content">
          <LegacyNewsRedirect slug={slug} />
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
