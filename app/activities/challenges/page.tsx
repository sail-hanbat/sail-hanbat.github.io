import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Challenges' };

export default function ChallengesPage() {
  return (
    <SectionPage title="Challenges" intro="Research competitions and external recognition earned through practical AI problem-solving.">
      <div className="achievement-list">
        <article>
          <div className="achievement-rank"><strong>6th</strong><span>Top 0.95%</span></div>
          <div>
            <time>2025</time>
            <h2>
              <a href="https://ai-champion.or.kr/champion/video/2025" target="_blank" rel="noreferrer">
                AI CHAMPION Challenge
              </a>
            </h2>
            <p>Recipient of the IITP President&apos;s Award in the challenge hosted by the Ministry of Science and ICT (MSIT).</p>
          </div>
        </article>
        <article>
          <div className="achievement-rank"><strong>8th</strong><span>Top 0.6%</span></div>
          <div>
            <time>2023</time>
            <h2>
              <a href="https://neurips.cc/virtual/2023/competition/66581" target="_blank" rel="noreferrer">
                NeurIPS Machine Unlearning Challenge
              </a>
            </h2>
            <p>Placed eighth in the first Machine Unlearning Challenge organized with Google DeepMind as part of the NeurIPS 2023 Competition Track.</p>
          </div>
        </article>
      </div>
    </SectionPage>
  );
}
