import type { Metadata } from 'next';
import { PublicationsContentView } from '@/components/content/publications-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_INTERNATIONAL_PUBLICATIONS, type PublicationsContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'International Publications' };

export default async function InternationalPublicationsPage() {
  const content = await getBuildPageContent<PublicationsContent>('publications-international', DEFAULT_INTERNATIONAL_PUBLICATIONS);
  return <PublicationsContentView pageKey="publications-international" initialContent={content} />;
}
