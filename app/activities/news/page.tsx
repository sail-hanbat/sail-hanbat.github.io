import type { Metadata } from 'next';
import { NewsContentView } from '@/components/content/news-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_NEWS_PAGE_CONTENT, type NewsPageContent } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'News',
  description: 'News and updates from the Safe & Applied Intelligence Lab.',
};

export default async function NewsPage() {
  const content = await getBuildPageContent<NewsPageContent>('news', DEFAULT_NEWS_PAGE_CONTENT);
  return <NewsContentView initialContent={content} />;
}
