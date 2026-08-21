import type { Metadata } from 'next';
import { PublicationList, type Publication } from '@/components/publication-list';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'International Publications' };

const publications: Publication[] = [
  {
    year: '2026',
    type: 'Conference',
    title: 'Do Backdoored LLMs Share Internal Trigger Representations? Evidence from Frozen SAE Feature Banks',
    authors: <>Minjeong Choi, <strong>Jaesin Ahn</strong>, and Heechul Jung</>,
    conference: 'EMNLP',
    presentation: 'Findings',
  },
  {
    year: '2026',
    type: 'Journal',
    title: 'LEAF: A Lightweight Language-Enhanced Model for Forestry Analysis in Remote Sensing Imagery',
    authors: <>Sanjar Karshiev, Faisal Saeed, <strong>Jaesin Ahn</strong>, Abdul Rehman, Muhammad Diyan, Shrooq Alsenan, and Heechul Jung</>,
    journal: 'IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing',
  },
  {
    year: '2025',
    type: 'Conference',
    title: 'Mitigating Sexual Content Generation via Embedding Distortion in Text-conditioned Diffusion Models',
    authors: <><strong>Jaesin Ahn</strong> and Heechul Jung</>,
    conference: 'NeurIPS',
  },
  {
    year: '2025',
    type: 'Journal',
    title: 'A Self-Attention Classifier Head for Improved Image Classification and Interpretability of ViT',
    authors: <><strong>Jaesin Ahn</strong> and Heechul Jung</>,
    journal: 'Electronics Letters',
  },
  {
    year: '2025',
    type: 'Journal',
    title: 'GDoT: A Gated Dual Domain Transformer for Enhanced MRI Off-Resonance Correction',
    authors: <><strong>Jaesin Ahn</strong> and Heechul Jung</>,
    journal: 'Neurocomputing',
  },
  {
    year: '2023',
    type: 'Journal',
    title: 'Redesigning Embedding Layers for Queries, Keys, and Values in Cross-Covariance Image Transformers',
    authors: <><strong>Jaesin Ahn</strong>, Jiuk Hong, Jeongwoo Ju, and Heechul Jung</>,
    journal: 'Mathematics',
  },
  {
    year: '2020',
    type: 'Conference',
    title: 'Skip-StyleGAN: Skip-Connected Generative Adversarial Networks for Generating 3D Rendered Image of Hand Bone Complex',
    authors: <><strong>Jaesin Ahn</strong>, Hyun-Joo Lee, Inchul Choi, and Minho Lee</>,
    conference: 'MICCAI',
  },
  {
    year: '2019',
    type: 'Conference',
    title: 'Siamese U-Net with Healthy Template for Accurate Segmentation of Intracranial Hemorrhage',
    authors: <>Doyoung Kwon, <strong>Jaesin Ahn</strong>, Jaeil Kim, Inchul Choi, Sungmoon Jeong, Young-Sup Lee, Jaechan Park, and Minho Lee</>,
    conference: 'MICCAI',
  },
];

export default function InternationalPublicationsPage() {
  return (
    <SectionPage title="International Publications" intro="Peer-reviewed international journal and conference publications.">
      <PublicationList publications={publications} />
    </SectionPage>
  );
}
