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
          <h2>Computer Vision</h2>
          <p>Advancing visual models from image understanding to image reconstruction.</p>
          <ul>
            <li>Vision transformers and interpretable classification</li>
            <li>Medical image generation and segmentation</li>
            <li>MRI reconstruction and image enhancement</li>
          </ul>
        </article>
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
          <h2>Applied AI</h2>
          <p>Translating AI methods into effective systems for real operating environments.</p>
          <ul>
            <li>Clinical and medical imaging AI</li>
            <li>Remote sensing and environmental analysis</li>
            <li>Reliable multi-agent and routed AI systems</li>
          </ul>
        </article>
      </div>

      <section className="content-section">
        <span className="section-kicker">Selected Experience</span>
        <h2>Research Projects</h2>
        <div className="project-list">
          <article>
            <div><time>2025–Present</time><span>IITP</span></div>
            <h3>Developing the Next-Generation General AI with Reliability, Ethics, and Adaptability</h3>
            <p>Research on reliable AGI architectures, stability in multi-agent interactions, model routing for efficient inference, and adaptability across specialized domains.</p>
          </article>
          <article>
            <div><time>2024</time><span>Personal Information Protection Commission</span></div>
            <h3>Evaluation of Privacy Risk Mitigation Technologies for Generative AI</h3>
            <p>Analysis of privacy leakage in Korean LLMs and evaluation of deduplication, filtering, differential privacy, and machine unlearning.</p>
          </article>
          <article>
            <div><time>2022–2023</time><span>MSKCC · IITP</span></div>
            <h3>Deep Learning-Based Unsupervised Domain Adaptation for MRI</h3>
            <p>Transformer-based correction of off-resonance artifacts in accelerated non-Cartesian MRI, leading to the GDoT study in Neurocomputing.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <span className="section-kicker">Research Output</span>
        <h2>Patents</h2>
        <ol className="patent-list">
          <li><span>2025 · KR 10-2025-0112676</span><strong>Mechanistic Interpretability-Based Backdoor Detection and Neutralization Apparatus and Method for Large Language Models</strong></li>
          <li><span>2025 · KR 10-2025-0111311</span><strong>Image Classification Apparatus, Attention-Based Classifier Head Thereof, and Image Classification Method Using the Same</strong></li>
          <li><span>2025 · KR 10-2025-0044952</span><strong>Apparatus for Content Generation and Learning Method Thereof</strong></li>
          <li><span>2025 · KR 10-2025-0044706</span><strong>Incremental Learning Device and Incremental Learning Method</strong></li>
          <li><span>2025 · KR 10-2024-0149695</span><strong>Apparatus and Method for Restoring Blurred 3D Magnetic Resonance Imaging</strong></li>
          <li><span>2023 · KR 10-2023-0096881</span><strong>Query, Key, and Value Embedding Technique Using Non-Linearity and Shared Features</strong></li>
          <li><span>2021 · KR 10-2343363-0000 · Granted</span><strong>Method and Device for Generating Rotated Hand-Bone 2D Projection Images from a Single Projection Image</strong></li>
        </ol>
      </section>
    </SectionPage>
  );
}
