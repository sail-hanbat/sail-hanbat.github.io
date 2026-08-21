import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Lectures' };

export default function LecturesPage() {
  return (
    <SectionPage eyebrow="Activities" title="Lectures">
      <div className="empty-panel">
        <p>Coursework will be added here.</p>
      </div>
    </SectionPage>
  );
}
