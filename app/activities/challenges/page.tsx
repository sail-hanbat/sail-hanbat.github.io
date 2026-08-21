import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Challenges' };

export default function ChallengesPage() {
  return (
    <SectionPage eyebrow="Activities" title="Challenges" intro="Research challenges, competitions, and shared problem-solving at SAIL.">
      <div className="empty-panel"><p>Challenge activities will be added here.</p></div>
    </SectionPage>
  );
}
