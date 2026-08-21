import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'International Publications' };

export default function InternationalPublicationsPage() {
  return (
    <SectionPage eyebrow="Publications" title="International" intro="International journal and conference publications from SAIL.">
      <div className="empty-panel"><p>Publications will be added here.</p></div>
    </SectionPage>
  );
}
