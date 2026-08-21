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
        <div className="profile-summary">
          <h2>Jaesin Ahn</h2>
          <p className="profile-role">Assistant Professor</p>
          <p>Department of Artificial Intelligence Software<br />Hanbat National University</p>
          <p>
            Jaesin Ahn leads SAIL, where he studies trustworthy AI and develops
            artificial intelligence for real-world applications. His work spans
            generative AI, language and visual intelligence, machine unlearning,
            mechanistic interpretability, and medical imaging.
          </p>
          <a className="profile-email" href="mailto:ajs0420@hanbat.ac.kr">ajs0420@hanbat.ac.kr</a>
          <h3>Research Interests</h3>
          <ul className="inline-topic-list">
            <li>AI safety and trustworthy AI</li>
            <li>Generative AI and natural language processing</li>
            <li>Computer vision and medical imaging</li>
            <li>Machine unlearning</li>
            <li>Mechanistic interpretability</li>
            <li>Image enhancement</li>
          </ul>
        </div>
      </div>

      <div className="profile-section-grid">
        <section className="profile-section">
          <span className="section-kicker">Experience</span>
          <h2>Academic &amp; Research Appointments</h2>
          <div className="timeline-list">
            <article>
              <time>2026–Present</time>
              <h3>Assistant Professor</h3>
              <p>Department of Artificial Intelligence Software, Hanbat National University</p>
            </article>
            <article>
              <time>2022–2023</time>
              <h3>Graduate Research Assistant</h3>
              <p>Memorial Sloan Kettering Cancer Center, New York, USA</p>
            </article>
          </div>
        </section>

        <section className="profile-section">
          <span className="section-kicker">Education</span>
          <h2>Degrees</h2>
          <div className="timeline-list">
            <article>
              <time>2026</time>
              <h3>Ph.D. in Artificial Intelligence</h3>
              <p>Kyungpook National University</p>
              <small>Thesis: Refining Embeddings in Transformers: Image Classification, MRI Reconstruction, and Safe Image Generation</small>
            </article>
            <article>
              <time>2021</time>
              <h3>M.S. in Electronic &amp; Electrical Engineering</h3>
              <p>Kyungpook National University</p>
              <small>Thesis: Neighborhood Skip-StyleGAN for Generating 3D Hand Bone Complex from a Single X-ray Image</small>
            </article>
            <article>
              <time>2019</time>
              <h3>B.S. in Electronics Engineering</h3>
              <p>Kyungpook National University</p>
            </article>
          </div>
        </section>
      </div>

      <section className="profile-section technical-section">
        <span className="section-kicker">Technical Expertise</span>
        <h2>Methods &amp; Tools</h2>
        <div className="expertise-groups">
          <div><strong>Deep Learning</strong><span>PyTorch · Hugging Face</span></div>
          <div><strong>Interpretability</strong><span>TransformerLens · NNsight</span></div>
          <div><strong>Development</strong><span>Python · Bash · Docker · Git · Linux</span></div>
        </div>
      </section>
    </SectionPage>
  );
}
