'use client';

import { PublicationList } from '@/components/publication-list';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { PublicationsContent } from '@/lib/site-content';

function PublicationsBody({ separatePatents }: { separatePatents: boolean }) {
  return (
    <>
      <EditableInteriorHero />
      <InteriorBody><PublicationList separatePatents={separatePatents} /></InteriorBody>
    </>
  );
}

export function PublicationsContentView({
  pageKey,
  initialContent,
  separatePatents = false,
}: {
  pageKey: string;
  initialContent: PublicationsContent;
  separatePatents?: boolean;
}) {
  return (
    <ContentShell pageKey={pageKey} initialContent={initialContent}>
      <PublicationsBody separatePatents={separatePatents} />
    </ContentShell>
  );
}
