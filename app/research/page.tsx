import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Research' };

export default function ResearchPage() {
  return (
    <SectionPage
      title="Research"
      intro="SAIL advances trustworthy artificial intelligence and develops effective AI technologies for real-world applications."
    >
      <div className="research-track-grid research-track-grid-four">
        <article className="research-track">
          <h2>Trustworthy AI</h2>
          <p>Understanding and controlling how modern AI systems learn and behave.</p>
          <ul>
            <li>Mechanistic interpretability and backdoor analysis</li>
            <li>Machine unlearning and privacy risk mitigation</li>
            <li>Content safety for generative models, including NSFW content and copyright</li>
            <li>Hallucination detection and mitigation</li>
          </ul>
        </article>
        <article className="research-track">
          <h2>Generative AI &amp; NLP</h2>
          <p>Developing and evaluating language and generative models for reliable use.</p>
          <ul>
            <li>Large language models (LLMs), vision-language models (VLMs), and vision-language-action models (VLAs)</li>
            <li>Diffusion models</li>
          </ul>
        </article>
        <article className="research-track">
          <h2>Applied AI</h2>
          <p>Translating AI methods into effective systems for real operating environments.</p>
          <ul>
            <li>Clinical and medical imaging AI</li>
            <li>Wafer image enhancement and defect detection</li>
            <li>Reliable multi-agent and routed AI systems</li>
          </ul>
        </article>
        <article className="research-track">
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
