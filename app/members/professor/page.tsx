import type { Metadata } from 'next';
import Image from 'next/image';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Professor' };

export default function ProfessorPage() {
  return (
    <SectionPage title="Professor">
      <div className="profile-layout">
        <Image
          className="profile-photo"
          src="/jaesin-ahn.jpg"
          alt="Jaesin Ahn"
          width={354}
          height={472}
          priority
        />
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
          <div className="profile-social-links" aria-label="Professional profiles">
            <a
              href="https://www.linkedin.com/in/jaesin-ahn-a23a3614b/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <Image src="/icons/linkedin.svg" alt="" width={24} height={24} />
            </a>
            <a
              href="https://scholar.google.co.kr/citations?user=CY9LCBsAAAAJ&amp;hl=ko"
              target="_blank"
              rel="noreferrer"
              aria-label="Google Scholar profile"
            >
              <Image src="/icons/google-scholar.svg" alt="" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>

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
            Hanbat National University, Sep. 2026–Present
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
