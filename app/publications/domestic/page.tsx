import type { Metadata } from 'next';
import { PublicationsContentView } from '@/components/content/publications-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_DOMESTIC_PUBLICATIONS, type PublicationsContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Domestic Publications' };

export default async function DomesticPublicationsPage() {
  const content = await getBuildPageContent<PublicationsContent>('publications-domestic', DEFAULT_DOMESTIC_PUBLICATIONS);
  return <PublicationsContentView pageKey="publications-domestic" initialContent={content} separatePatents />;
}
