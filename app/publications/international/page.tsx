import type { Metadata } from 'next';
import { PublicationList, type Publication } from '@/components/publication-list';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'International Publications' };

const publications: Publication[] = [
  {
    year: '2026',
    type: 'Conference',
    note: 'Accepted',
    title: 'Do Backdoored LLMs Share Internal Trigger Representations? Evidence from Frozen SAE Feature Banks',
    authors: <>Minjeong Choi, <strong>Jaesin Ahn</strong>, and Heechul Jung</>,
    venue: 'Findings of the 2026 Conference on Empirical Methods in Natural Language Processing (EMNLP 2026), Budapest, Hungary.',
  },
  {
    year: '2026',
    type: 'Journal',
    title: 'LEAF: A Lightweight Language-Enhanced Model for Forestry Analysis in Remote Sensing Imagery',
    authors: <>Sanjar Karshiev, Faisal Saeed, <strong>Jaesin Ahn</strong>, Abdul Rehman, Muhammad Diyan, Shrooq Alsenan, and Heechul Jung</>,
    venue: 'IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing.',
    href: 'https://doi.org/10.1109/JSTARS.2026.3672196',
  },
  {
    year: '2025',
    type: 'Conference',
    title: 'Mitigating Sexual Content Generation via Embedding Distortion in Text-conditioned Diffusion Models',
    authors: <><strong>Jaesin Ahn</strong> and Heechul Jung</>,
    venue: 'Advances in Neural Information Processing Systems 38 (NeurIPS 2025), Main Conference Track.',
    href: 'https://proceedings.neurips.cc/paper_files/paper/2025/hash/002262941c9edfd472a79298b2ac5e17-Abstract-Conference.html',
  },
  {
    year: '2025',
    type: 'Journal',
    title: 'A Self-Attention Classifier Head for Improved Image Classification and Interpretability of ViT',
    authors: <><strong>Jaesin Ahn</strong> and Heechul Jung</>,
    venue: 'Electronics Letters, vol. 61, no. 1.',
    href: 'https://doi.org/10.1049/ell2.70478',
  },
  {
    year: '2025',
    type: 'Journal',
    title: 'GDoT: A Gated Dual Domain Transformer for Enhanced MRI Off-Resonance Correction',
    authors: <><strong>Jaesin Ahn</strong> and Heechul Jung</>,
    venue: 'Neurocomputing, vol. 634, article 129918.',
    href: 'https://doi.org/10.1016/j.neucom.2025.129918',
  },
  {
    year: '2023',
    type: 'Journal',
    title: 'Redesigning Embedding Layers for Queries, Keys, and Values in Cross-Covariance Image Transformers',
    authors: <><strong>Jaesin Ahn</strong>, Jiuk Hong, Jeongwoo Ju, and Heechul Jung</>,
    venue: 'Mathematics, vol. 11, no. 8, article 1933.',
    href: 'https://doi.org/10.3390/math11081933',
  },
  {
    year: '2020',
    type: 'Conference',
    title: 'Skip-StyleGAN: Skip-Connected Generative Adversarial Networks for Generating 3D Rendered Image of Hand Bone Complex',
    authors: <><strong>Jaesin Ahn</strong>, Hyun-Joo Lee, Inchul Choi, and Minho Lee</>,
    venue: '23rd International Conference on Medical Image Computing and Computer Assisted Intervention (MICCAI 2020), pp. 745–754.',
    href: 'https://doi.org/10.1007/978-3-030-59719-1_72',
  },
  {
    year: '2019',
    type: 'Conference',
    title: 'Siamese U-Net with Healthy Template for Accurate Segmentation of Intracranial Hemorrhage',
    authors: <>Doyoung Kwon, <strong>Jaesin Ahn</strong>, Jaeil Kim, Inchul Choi, Sungmoon Jeong, Young-Sup Lee, Jaechan Park, and Minho Lee</>,
    venue: '22nd International Conference on Medical Image Computing and Computer Assisted Intervention (MICCAI 2019), pp. 848–855.',
    href: 'https://doi.org/10.1007/978-3-030-32248-9_94',
  },
];

export default function InternationalPublicationsPage() {
  return (
    <SectionPage eyebrow="Publications" title="International" intro="Peer-reviewed international journal and conference publications by Prof. Jaesin Ahn and SAIL members.">
      <PublicationList publications={publications} />
    </SectionPage>
  );
}
