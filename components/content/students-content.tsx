'use client';

import { EditableText } from '@/components/cms/editable';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { StudentsContent } from '@/lib/site-content';

function StudentsBody() {
  return (
    <>
      <EditableInteriorHero />
      <InteriorBody>
        <div className="empty-panel">
          <EditableText as="h2" path="placeholderTitle" />
          <EditableText as="p" path="placeholderBody" multiline />
        </div>
      </InteriorBody>
    </>
  );
}

export function StudentsContentView({ initialContent }: { initialContent: StudentsContent }) {
  return (
    <ContentShell pageKey="students" initialContent={initialContent}>
      <StudentsBody />
    </ContentShell>
  );
}
