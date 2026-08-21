import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Research' };

export default function ResearchPage() {
  return (
    <SectionPage
      eyebrow="Research"
      title="Two Directions, Open Questions"
      intro="SAIL investigates trustworthy learning systems and practical artificial intelligence for real-world domains."
    >
      <div className="research-track-grid">
        <article className="research-track">
          <span>Track 1</span>
          <h2>Trustworthy AI</h2>
          <p>Understanding and steering learning systems beyond surface-level benchmark scores.</p>
          <ul>
            <li>Mechanistic interpretability</li>
            <li>Machine unlearning and intervention</li>
            <li>Robust, reliable, and accountable AI</li>
          </ul>
        </article>
        <article className="research-track">
          <span>Track 2</span>
          <h2>AI for Real-World Domains</h2>
          <p>Building effective AI systems for meaningful problems under real operating constraints.</p>
          <ul>
            <li>Computer vision and multimodal learning</li>
            <li>Generative models and practical deep learning</li>
            <li>Field-oriented AI across diverse applications</li>
          </ul>
        </article>
      </div>
    </SectionPage>
  );
}
