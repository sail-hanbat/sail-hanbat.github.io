import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Students' };

export default function StudentsPage() {
  return (
    <SectionPage
      eyebrow="Members"
      title="Students"
      intro="SAIL welcomes students who want to build reliable AI and apply it to meaningful real-world problems."
    >
      <div className="student-opening">
        <span className="section-kicker">Prospective Members</span>
        <h2>Research with SAIL</h2>
        <p>
          We are interested in working with motivated students across generative AI,
          natural language processing, computer vision, trustworthy AI, and applied AI.
          Student profiles will be added as the laboratory grows.
        </p>
        <a className="arrow" href="mailto:ajs0420@hanbat.ac.kr?subject=Prospective%20SAIL%20Student">Contact Prof. Jaesin Ahn</a>
      </div>

      <div className="interest-grid">
        <article>
          <span>01</span>
          <h3>Generative &amp; Language AI</h3>
          <p>LLMs, multimodal models, diffusion models, and domain-specialized AI.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Trustworthy AI</h3>
          <p>Mechanistic interpretability, machine unlearning, privacy, and content safety.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Visual &amp; Applied AI</h3>
          <p>Computer vision, medical imaging, image enhancement, and AI for real domains.</p>
        </article>
      </div>
    </SectionPage>
  );
}
