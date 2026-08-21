import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Research' };

export default function ResearchPage() {
  return (
    <SectionPage
      eyebrow="Research"
      title="Research Interests"
      intro="SAIL advances trustworthy artificial intelligence and develops effective AI technologies for real-world applications."
    >
      <div className="research-track-grid">
        <article className="research-track">
          <span>Research Area</span>
          <h2>Trustworthy AI</h2>
          <p>Understanding, evaluating, and improving the behavior of learning systems.</p>
          <ul>
            <li>Mechanistic interpretability</li>
            <li>Machine unlearning and intervention</li>
            <li>AI privacy and content safety</li>
          </ul>
        </article>
        <article className="research-track">
          <span>Research Area</span>
          <h2>Generative, Language &amp; Visual AI</h2>
          <p>Exploring advanced learning methods across text, images, and multiple modalities.</p>
          <ul>
            <li>Generative models</li>
            <li>Natural language processing and multimodal learning</li>
            <li>Computer vision and image enhancement</li>
          </ul>
        </article>
        <article className="research-track">
          <span>Research Area</span>
          <h2>AI for Real-World Applications</h2>
          <p>Developing effective AI solutions for meaningful problems under real operating conditions.</p>
          <ul>
            <li>Domain-aware learning and adaptation</li>
            <li>Efficient and field-ready AI systems</li>
            <li>Applications across diverse real-world domains</li>
          </ul>
        </article>
      </div>
    </SectionPage>
  );
}
