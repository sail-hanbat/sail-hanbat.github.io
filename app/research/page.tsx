import type { Metadata } from 'next';
import { ResearchContentView } from '@/components/content/research-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_RESEARCH_CONTENT, type ResearchContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Research' };

export default async function ResearchPage() {
  const content = await getBuildPageContent<ResearchContent>('research', DEFAULT_RESEARCH_CONTENT);
  return <ResearchContentView initialContent={content} />;
}
