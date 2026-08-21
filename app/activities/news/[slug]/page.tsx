import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NewsBody } from '@/components/news-body';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { formatNewsDate, getAllNewsPosts, getNewsExcerpt, getNewsPost } from '@/lib/news';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNewsPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return { title: 'News' };

  const description = getNewsExcerpt(post, 155);
  return {
    title: post.title,
    description,
    openGraph: { title: post.title, description, images: [] },
    twitter: { title: post.title, description, images: [] },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  return (
    <main className="interior-page">
      <SiteHeader />
      <article className="news-article">
        <header className="news-article-header">
          <div className="container article-container">
            <Link className="back-link" href="/activities/news/">← News</Link>
            <h1>{post.title}</h1>
            <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
          </div>
        </header>
        <div className="container article-container news-article-content">
          <NewsBody body={post.body} />
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
