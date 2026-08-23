import type { Metadata } from 'next';
import { LecturesContentView } from '@/components/content/lectures-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_LECTURES_CONTENT, type LecturesContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Lectures' };

export default async function LecturesPage() {
  const content = await getBuildPageContent<LecturesContent>('lectures', DEFAULT_LECTURES_CONTENT);
  return <LecturesContentView initialContent={content} />;
}
