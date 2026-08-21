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
  {
    year: '2025',
    type: 'Patent',
    title: '기계적 해석 기반 대규모 언어 모델 내 백도어 탐지 및 무력화 장치 및 방법',
    date: '2025.08.13',
    status: 'Filed',
  },
  {
    year: '2025',
    type: 'Patent',
    title: '이미지 분류 장치, 이를 위한 어텐션 기반 분류기 헤드 및 이를 이용한 이미지 분류 방법',
    date: '2025.08.12',
    status: 'Filed',
  },
  {
    year: '2025',
    type: 'Patent',
    title: '컨텐츠 생성 장치 및 그 학습 방법',
    date: '2025.04.07',
    status: 'Filed',
  },
  {
    year: '2025',
    type: 'Patent',
    title: '점진적 학습 장치 및 점진적 학습 방법',
    date: '2025.04.07',
    status: 'Filed',
  },
  {
    year: '2025',
    type: 'Patent',
    title: '블러링을 포함하는 3D 자기 공명 영상을 블러링이 제거된 클린 MRI로 복원하는 장치 및 방법',
    date: '2025.01.23',
    status: 'Filed',
  },
  {
    year: '2023',
    type: 'Patent',
    title: '크로스-공분산 트랜스포머의 임베딩 장치, 방법 및 이를 구현하기 위한 컴퓨터로 판독 가능한 저장 매체',
    date: '2023.07.25',
    status: 'Filed',
  },
  {
    year: '2021',
    type: 'Patent',
    title: '2차원 손뼈 투영 이미지로부터 회전된 2차원 손뼈 투영 이미지 생성 방법, 이를 수행하기 위한 기록 매체 및 장치',
    date: '2021.12.21',
    status: 'Issued',
  },
];

export default function DomesticPublicationsPage() {
  return (
    <SectionPage title="Domestic Publications" intro="Peer-reviewed domestic publications.">
      <PublicationList publications={publications} />
    </SectionPage>
  );
}
