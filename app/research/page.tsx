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
      <div className="research-track-grid research-track-grid-four">
        <article className="research-track">
          <span>Research Area</span>
          <h2>Trustworthy AI</h2>
          <p>Understanding and controlling how modern AI systems learn and behave.</p>
          <ul>
            <li>Mechanistic interpretability and backdoor analysis</li>
            <li>Machine unlearning and privacy risk mitigation</li>
            <li>Content safety for generative models</li>
          </ul>
        </article>
        <article className="research-track">
          <span>Research Area</span>
          <h2>Generative AI &amp; NLP</h2>
          <p>Developing and evaluating language and generative models for reliable use.</p>
          <ul>
            <li>Large language and multimodal models</li>
            <li>Text-to-image diffusion models</li>
            <li>Efficient domain-specialized models</li>
          </ul>
        </article>
        <article className="research-track">
          <span>Research Area</span>
          <h2>Applied AI</h2>
          <p>Translating AI methods into effective systems for real operating environments.</p>
          <ul>
            <li>Clinical and medical imaging AI</li>
            <li>Remote sensing and environmental analysis</li>
            <li>Reliable multi-agent and routed AI systems</li>
          </ul>
        </article>
        <article className="research-track">
          <span>Research Area</span>
          <h2>Computer Vision</h2>
          <p>Advancing visual models from image understanding to image reconstruction.</p>
          <ul>
            <li>Vision transformers and interpretable classification</li>
            <li>Medical image generation and segmentation</li>
            <li>MRI reconstruction and image enhancement</li>
          </ul>
        </article>
      </div>
    </SectionPage>
  );
}
