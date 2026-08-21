import type { Metadata } from 'next';
import { PublicationList, type Publication } from '@/components/publication-list';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Domestic Publications' };

const publications: Publication[] = [
  {
    year: '2026',
    type: 'Journal',
    title: '교차 레이어 트랜스코더 기반 Gemma-3-1B의 PHI 비식별화 결정 회로 분석',
    authors: <><strong>Jaesin Ahn</strong>, Junhyun Bae, Jekyung Lee, and Heechul Jung</>,
    journal: '전자공학회논문지',
  },
];

export default function DomesticPublicationsPage() {
  return (
    <SectionPage eyebrow="Publications" title="Domestic" intro="Peer-reviewed domestic publications by Prof. Jaesin Ahn and SAIL members.">
      <PublicationList publications={publications} />
    </SectionPage>
  );
}
