import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Professor' };

export default function ProfessorPage() {
  return (
    <SectionPage
      eyebrow="Members"
      title="Professor"
      intro="Research leadership at the Safe & Applied Intelligence Lab."
    >
      <div className="profile-layout">
        <div className="profile-placeholder" role="img" aria-label="Jaesin Ahn photograph placeholder" />
        <div>
          <h2>Jaesin Ahn</h2>
          <p className="profile-role">Assistant Professor</p>
          <p>Department of Artificial Intelligence Software<br />Hanbat National University</p>
          <h3>Research Interests</h3>
          <p>Broad areas: generative AI, natural language processing, computer vision, trustworthy AI, and AI for real-world domains. Specific interests: image enhancement, machine unlearning, and mechanistic interpretability.</p>
        </div>
      </div>
    </SectionPage>
  );
}
