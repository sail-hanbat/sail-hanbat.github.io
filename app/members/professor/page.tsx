import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Professor' };

export default function ProfessorPage() {
  return (
    <SectionPage title="Professor">
      <div className="profile-layout">
        <div className="profile-placeholder" role="img" aria-label="Jaesin Ahn photograph placeholder" />
        <div className="profile-summary">
          <h2>Jaesin Ahn</h2>
          <p className="profile-role">Assistant Professor</p>
          <p>
            Department of Artificial Intelligence Software
            <br />
            Hanbat National University
          </p>
          <a className="profile-email" href="mailto:ajs0420@hanbat.ac.kr">
            ajs0420@hanbat.ac.kr
          </a>
        </div>
      </div>

      <section className="professor-section">
        <h2>Research Interests</h2>
        <ul className="professor-list">
          <li>AI Safety</li>
          <li>Trustworthy AI</li>
          <li>Generative AI</li>
          <li>Machine Unlearning</li>
          <li>Computer Vision</li>
        </ul>
      </section>

      <section className="professor-section">
        <h2>Education</h2>
        <ul className="professor-list">
          <li>
            <strong>Ph.D. in Artificial Intelligence</strong>, Kyungpook National University, 2026
          </li>
          <li>
            <strong>M.S. in Electronic &amp; Electrical Engineering</strong>, Kyungpook National University, 2021
          </li>
          <li>
            <strong>B.S. in Electronics Engineering</strong>, Kyungpook National University, 2019
          </li>
        </ul>
      </section>

      <section className="professor-section">
        <h2>Experience</h2>
        <ul className="professor-list">
          <li>
            <strong>Assistant Professor</strong>, Department of Artificial Intelligence Software,
            Hanbat National University, 2026–Present
          </li>
          <li>
            <strong>Postdoctoral Researcher</strong>, Kyungpook National University, Daegu,
            Mar. 2026–Aug. 2026
          </li>
          <li>
            <strong>Graduate Research Assistant</strong>, Memorial Sloan Kettering Cancer Center,
            Apr. 2022–Mar. 2023
          </li>
        </ul>
      </section>
    </SectionPage>
  );
}
