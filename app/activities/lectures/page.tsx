import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Lectures' };

export default function LecturesPage() {
  return (
    <SectionPage eyebrow="Activities" title="Lectures" intro="Seminar themes and educational materials grounded in SAIL's research practice.">
      <div className="lecture-intro">
        <span className="section-kicker">Current Themes</span>
        <h2>From Foundations to Research Practice</h2>
        <p>Scheduled lectures and materials will be posted here. SAIL&apos;s current educational themes reflect the methods used across our research.</p>
      </div>
      <div className="lecture-topic-list">
        <article>
          <span>Trustworthy AI</span>
          <h3>Mechanistic Interpretability for Transformers</h3>
          <p>Tracing internal computation in language and vision models with tools such as TransformerLens and NNsight.</p>
        </article>
        <article>
          <span>AI Safety</span>
          <h3>Machine Unlearning, Privacy &amp; Content Safety</h3>
          <p>Removing unwanted information, evaluating privacy risks, and controlling unsafe behavior in generative models.</p>
        </article>
        <article>
          <span>Computer Vision</span>
          <h3>Vision Transformers &amp; Medical Imaging</h3>
          <p>Attention-based image classification, interpretable visual models, MRI reconstruction, and medical image analysis.</p>
        </article>
        <article>
          <span>Research Engineering</span>
          <h3>Building Reproducible Deep-Learning Systems</h3>
          <p>Research workflows using Python, PyTorch, Hugging Face, Docker, Git, and Linux.</p>
        </article>
      </div>
    </SectionPage>
  );
}
