import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Lectures' };

export default function LecturesPage() {
  return (
    <SectionPage eyebrow="Activities" title="Lectures" intro="Lectures, seminars, reading groups, and educational materials from SAIL.">
      <div className="empty-panel"><p>Lecture information will be added here.</p></div>
    </SectionPage>
  );
}
