import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Domestic Publications' };

export default function DomesticPublicationsPage() {
  return (
    <SectionPage eyebrow="Publications" title="Domestic" intro="Domestic journal and conference publications from SAIL.">
      <div className="empty-panel"><p>Publications will be added here.</p></div>
    </SectionPage>
  );
}
