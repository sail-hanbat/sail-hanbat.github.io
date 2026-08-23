'use client';

import { PublicationList } from '@/components/publication-list';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { PublicationsContent } from '@/lib/site-content';

function PublicationsBody() {
  return (
    <>
      <EditableInteriorHero />
      <InteriorBody><PublicationList /></InteriorBody>
    </>
  );
}

export function PublicationsContentView({ pageKey, initialContent }: { pageKey: string; initialContent: PublicationsContent }) {
  return (
    <ContentShell pageKey={pageKey} initialContent={initialContent}>
      <PublicationsBody />
    </ContentShell>
  );
}
