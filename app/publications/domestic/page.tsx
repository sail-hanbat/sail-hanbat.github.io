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
  {
    year: '2025',
    type: 'Conference',
    title: '안전한 디퓨전 모델을 위한 하이브리드 적대적 공격 방어 기법',
    authors: <><strong>안재신</strong>, 정희철</>,
    conference: '대한전자공학회 하계종합학술대회',
    yearFirst: true,
  },
  {
    year: '2024',
    type: 'Conference',
    title: 'LLM에서 개인정보 유출 위험성 분석 및 가명처리의 효과 연구',
    authors: <><strong>안재신</strong>, 정희철</>,
    conference: '한국통신학회 추계학술대회',
    yearFirst: true,
  },
  {
    year: '2024',
    type: 'Conference',
    title: 'Diffusion 모델에서의 효율적인 파라미터 튜닝을 위한 기법 비교',
    authors: <>김은지, <strong>안재신</strong>, 정희철</>,
    conference: '한국통신학회 추계학술대회',
    yearFirst: true,
  },
  {
    year: '2024',
    type: 'Conference',
    title: 'Dual Domain-aware Attention-based MRI Off-Resonance Correction with Selective Perceptual Loss and Test-time Translation-Merger',
    authors: <><strong>Jaesin Ahn</strong>, Heechul Jung</>,
    conference: '한국산업응용수학회 봄학술대회',
    yearFirst: true,
  },
  {
    year: '2021',
    type: 'Conference',
    title: 'SLIT: Shared Layers for Image Transformer',
    authors: <><strong>Jaesin Ahn</strong>, Heechul Jung</>,
    conference: '한국인공지능학회 추계공동학술대회',
    yearFirst: true,
  },
];

export default function DomesticPublicationsPage() {
  return (
    <SectionPage eyebrow="Publications" title="Domestic" intro="Peer-reviewed domestic publications.">
      <PublicationList publications={publications} />
    </SectionPage>
  );
}
