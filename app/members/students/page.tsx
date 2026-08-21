import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Students' };

export default function StudentsPage() {
  return (
    <SectionPage
      eyebrow="Members"
      title="Students"
      intro="Students and research collaborators at SAIL."
    >
      <div className="empty-panel">
        <h2>Future SAIL Members</h2>
        <p>Student profiles and research interests will be added here.</p>
      </div>
    </SectionPage>
  );
}
