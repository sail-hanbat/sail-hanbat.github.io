export type GlobalContent = {
  logoPath: string;
  nav: {
    home: string;
    members: string;
    professor: string;
    students: string;
    research: string;
    publications: string;
    international: string;
    domestic: string;
    activities: string;
    challenges: string;
    lectures: string;
    news: string;
    contact: string;
  };
  footer: {
    acronym: string;
    labName: string;
    addressEn: string;
    addressKo: string;
    tel: string;
  };
};

export type HomeContent = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    images: string[];
  };
  latestNews: {
    title: string;
    viewAllLabel: string;
  };
  recruitment: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

export type ResearchContent = {
  title: string;
  intro: string;
  tracks: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
};

export type ProfessorContent = {
  title: string;
  sectionTitles: {
    education: string;
    experience: string;
    awards: string;
  };
  profile: {
    photoPath: string;
    photoAlt: string;
    name: string;
    role: string;
    department: string;
    university: string;
    email: string;
    linkedinUrl: string;
    scholarUrl: string;
  };
  education: Array<{ title: string; detail: string }>;
  experience: Array<{ title: string; detail: string }>;
  awards: Array<{ title: string; detail: string }>;
};

export type StudentsContent = {
  title: string;
  intro: string;
  placeholderTitle: string;
  placeholderBody: string;
};

export type PublicationType = 'Journal' | 'Conference' | 'Patent';
export type PublicationPresentation = 'Findings' | 'Oral' | 'Spotlight' | 'Special Track' | 'Workshop' | '';

export type PublicationRecord = {
  id: string;
  year: string;
  type: PublicationType;
  title: string;
  authors?: string;
  journal?: string;
  conference?: string;
  yearFirst?: boolean;
  presentation?: PublicationPresentation;
  date?: string;
  status?: 'Filed' | 'Issued';
};

export type PublicationsContent = {
  title: string;
  intro: string;
  patentSectionTitle?: string;
  publications: PublicationRecord[];
};

export type ChallengesContent = {
  title: string;
  intro: string;
  challenges: Array<{
    id: string;
    rank: string;
    percentile: string;
    year: string;
    title: string;
    url: string;
    description: string;
  }>;
};

export type LecturesContent = {
  title: string;
  terms: Array<{
    id: string;
    title: string;
    courses: string[];
  }>;
};

export type ContactContent = {
  title: string;
  intro: string;
  emailLabel: string;
  email: string;
  telLabel: string;
  tel: string;
  affiliationLabel: string;
  affiliationLine1: string;
  affiliationLine2: string;
  addressLabel: string;
  addressEn: string;
  addressKo: string;
  directionsTitle: string;
  mapUrl: string;
};

export type NewsPageContent = {
  title: string;
  intro: string;
  writeLabel: string;
};

export const DEFAULT_GLOBAL_CONTENT: GlobalContent = {
  logoPath: '/brand/04-lockup-fullname-2line-transparent.png',
  nav: {
    home: 'Home',
    members: 'Members',
    professor: 'Professor',
    students: 'Students',
    research: 'Research',
    publications: 'Publications',
    international: 'International',
    domestic: 'Domestic',
    activities: 'Activities',
    challenges: 'Challenges',
    lectures: 'Lectures',
    news: 'News',
    contact: 'Contact',
  },
  footer: {
    acronym: 'SAIL',
    labName: 'Safe & Applied Intelligence Lab',
    addressEn: '304, Building 8, Sejong Common Campus, 109, Jiphyeonbuk-ro, Sejong, Republic of Korea',
    addressKo: '세종특별자치시 집현북로 109, 세종공동캠퍼스 8동 304호',
    tel: 'Tel: 044-863-9268',
  },
};

export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero: {
    titleLine1: 'Safe & Applied',
    titleLine2: 'Intelligence Lab',
    description: 'Safe & Applied Intelligence Lab (SAIL) focuses on advancing trustworthy artificial intelligence and developing AI solutions for real-world applications. We explore generative AI (GenAI), natural language processing (NLP), and computer vision (CV). Our specific research interests include image enhancement, machine unlearning, and mechanistic interpretability. We aim to understand and improve how AI systems learn and behave while developing effective technologies that can address practical problems across diverse domains. Our research is not limited to these areas, and we continuously explore new and meaningful problems in artificial intelligence.',
    images: ['', '', '', ''],
  },
  latestNews: {
    title: 'Latest News',
    viewAllLabel: 'View All News',
  },
  recruitment: {
    title: 'Join SAIL',
    description: 'SAIL is recruiting graduate students and undergraduate research interns interested in trustworthy AI, generative AI, natural language processing, computer vision, and real-world AI applications. If you are interested in joining SAIL, please do not hesitate to contact Prof. Jaesin Ahn at ajs0420@hanbat.ac.kr.',
    buttonLabel: 'Contact Us',
  },
};

export const DEFAULT_RESEARCH_CONTENT: ResearchContent = {
  title: 'Research',
  intro: 'SAIL advances trustworthy artificial intelligence and develops effective AI technologies for real-world applications.',
  tracks: [
    {
      title: 'Trustworthy AI',
      description: 'Understanding and controlling how modern AI systems learn and behave.',
      items: [
        'Mechanistic interpretability and backdoor analysis',
        'Machine unlearning and privacy risk mitigation',
        'Content safety for generative models, including NSFW content and copyright',
        'Hallucination detection and mitigation',
      ],
    },
    {
      title: 'Generative AI & NLP',
      description: 'Developing and evaluating language and generative models for reliable use.',
      items: [
        'Large language models (LLMs), vision-language models (VLMs), and vision-language-action models (VLAs)',
        'Diffusion models',
      ],
    },
    {
      title: 'Applied AI',
      description: 'Translating AI methods into effective systems for real operating environments.',
      items: [
        'Clinical and medical imaging AI',
        'Wafer image enhancement and defect detection',
        'Reliable multi-agent and routed AI systems',
      ],
    },
    {
      title: 'Computer Vision',
      description: 'Advancing visual models from image understanding to image reconstruction.',
      items: [
        'Vision transformers and interpretable classification',
        'Medical image generation and segmentation',
        'MRI reconstruction and image enhancement',
      ],
    },
  ],
};

export const DEFAULT_PROFESSOR_CONTENT: ProfessorContent = {
  title: 'Professor',
  sectionTitles: {
    education: 'Education',
    experience: 'Experience',
    awards: 'Honors & Awards',
  },
  profile: {
    photoPath: '/jaesin-ahn.jpg',
    photoAlt: 'Jaesin Ahn',
    name: 'Jaesin Ahn',
    role: 'Assistant Professor',
    department: 'Department of Artificial Intelligence Software',
    university: 'Hanbat National University',
    email: 'ajs0420@hanbat.ac.kr',
    linkedinUrl: 'https://www.linkedin.com/in/jaesin-ahn-a23a3614b/',
    scholarUrl: 'https://scholar.google.co.kr/citations?user=CY9LCBsAAAAJ&hl=ko',
  },
  education: [
    { title: 'Ph.D. in Artificial Intelligence', detail: 'Kyungpook National University, 2026' },
    { title: 'M.S. in Electronic & Electrical Engineering', detail: 'Kyungpook National University, 2021' },
    { title: 'B.S. in Electronics Engineering', detail: 'Kyungpook National University, 2019' },
  ],
  experience: [
    { title: 'Assistant Professor', detail: 'Department of Artificial Intelligence Software, Hanbat National University, Sep. 2026–Present' },
    { title: 'Postdoctoral Researcher', detail: 'Kyungpook National University, Daegu, Mar. 2026–Aug. 2026' },
    { title: 'Graduate Research Assistant', detail: 'Memorial Sloan Kettering Cancer Center, Apr. 2022–Mar. 2023' },
  ],
  awards: [
    { title: 'Selected Presenter, Doctoral Colloquium', detail: 'Korean Conference on Computer Vision (KCCV), 2026' },
    { title: "IITP President's Award", detail: 'AI CHAMPION Challenge, 2025' },
  ],
};

export const DEFAULT_STUDENTS_CONTENT: StudentsContent = {
  title: 'Students',
  intro: 'Students and research collaborators at SAIL.',
  placeholderTitle: 'Future SAIL Members',
  placeholderBody: 'Student profiles and research interests will be added here.',
};

export const DEFAULT_INTERNATIONAL_PUBLICATIONS: PublicationsContent = {
  title: 'International Publications',
  intro: 'Peer-reviewed international journal and conference publications.',
  publications: [
    { id: 'emnlp-2026', year: '2026', type: 'Conference', title: 'Do Backdoored LLMs Share Internal Trigger Representations? Evidence from Frozen SAE Feature Banks', authors: 'Minjeong Choi, Jaesin Ahn, and Heechul Jung', conference: 'EMNLP', presentation: 'Findings' },
    { id: 'leaf-2026', year: '2026', type: 'Journal', title: 'LEAF: A Lightweight Language-Enhanced Model for Forestry Analysis in Remote Sensing Imagery', authors: 'Sanjar Karshiev, Faisal Saeed, Jaesin Ahn, Abdul Rehman, Muhammad Diyan, Shrooq Alsenan, and Heechul Jung', journal: 'IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing' },
    { id: 'neurips-2025', year: '2025', type: 'Conference', title: 'Mitigating Sexual Content Generation via Embedding Distortion in Text-conditioned Diffusion Models', authors: 'Jaesin Ahn and Heechul Jung', conference: 'NeurIPS' },
    { id: 'electronics-letters-2025', year: '2025', type: 'Journal', title: 'A Self-Attention Classifier Head for Improved Image Classification and Interpretability of ViT', authors: 'Jaesin Ahn and Heechul Jung', journal: 'Electronics Letters' },
    { id: 'gdot-2025', year: '2025', type: 'Journal', title: 'GDoT: A Gated Dual Domain Transformer for Enhanced MRI Off-Resonance Correction', authors: 'Jaesin Ahn and Heechul Jung', journal: 'Neurocomputing' },
    { id: 'xcit-2023', year: '2023', type: 'Journal', title: 'Redesigning Embedding Layers for Queries, Keys, and Values in Cross-Covariance Image Transformers', authors: 'Jaesin Ahn, Jiuk Hong, Jeongwoo Ju, and Heechul Jung', journal: 'Mathematics' },
    { id: 'skip-stylegan-2020', year: '2020', type: 'Conference', title: 'Skip-StyleGAN: Skip-Connected Generative Adversarial Networks for Generating 3D Rendered Image of Hand Bone Complex', authors: 'Jaesin Ahn, Hyun-Joo Lee, Inchul Choi, and Minho Lee', conference: 'MICCAI' },
    { id: 'siamese-unet-2019', year: '2019', type: 'Conference', title: 'Siamese U-Net with Healthy Template for Accurate Segmentation of Intracranial Hemorrhage', authors: 'Doyoung Kwon, Jaesin Ahn, Jaeil Kim, Inchul Choi, Sungmoon Jeong, Young-Sup Lee, Jaechan Park, and Minho Lee', conference: 'MICCAI' },
  ],
};

export const DEFAULT_DOMESTIC_PUBLICATIONS: PublicationsContent = {
  title: 'Domestic Publications',
  intro: 'Peer-reviewed domestic publications.',
  patentSectionTitle: 'Patent',
  publications: [
    { id: 'phi-circuit-2026', year: '2026', type: 'Journal', title: '교차 레이어 트랜스코더 기반 Gemma-3-1B의 PHI 비식별화 결정 회로 분석', authors: 'Jaesin Ahn, Junhyun Bae, Jekyung Lee, and Heechul Jung', journal: '전자공학회논문지' },
    { id: 'diffusion-defense-2025', year: '2025', type: 'Conference', title: '안전한 디퓨전 모델을 위한 하이브리드 적대적 공격 방어 기법', authors: '안재신, 정희철', conference: '대한전자공학회 하계종합학술대회', yearFirst: true },
    { id: 'llm-privacy-2024', year: '2024', type: 'Conference', title: 'LLM에서 개인정보 유출 위험성 분석 및 가명처리의 효과 연구', authors: '안재신, 정희철', conference: '한국통신학회 추계학술대회', yearFirst: true },
    { id: 'diffusion-tuning-2024', year: '2024', type: 'Conference', title: 'Diffusion 모델에서의 효율적인 파라미터 튜닝을 위한 기법 비교', authors: '김은지, 안재신, 정희철', conference: '한국통신학회 추계학술대회', yearFirst: true },
    { id: 'mri-spring-2024', year: '2024', type: 'Conference', title: 'Dual Domain-aware Attention-based MRI Off-Resonance Correction with Selective Perceptual Loss and Test-time Translation-Merger', authors: 'Jaesin Ahn, Heechul Jung', conference: '한국산업응용수학회 봄학술대회', yearFirst: true },
    { id: 'slit-2021', year: '2021', type: 'Conference', title: 'SLIT: Shared Layers for Image Transformer', authors: 'Jaesin Ahn, Heechul Jung', conference: '한국인공지능학회 추계공동학술대회', yearFirst: true },
    { id: 'patent-backdoor-2025', year: '2025', type: 'Patent', title: '기계적 해석 기반 대규모 언어 모델 내 백도어 탐지 및 무력화 장치 및 방법', date: '2025.08.13', status: 'Filed' },
    { id: 'patent-classifier-2025', year: '2025', type: 'Patent', title: '이미지 분류 장치, 이를 위한 어텐션 기반 분류기 헤드 및 이를 이용한 이미지 분류 방법', date: '2025.08.12', status: 'Filed' },
    { id: 'patent-content-2025', year: '2025', type: 'Patent', title: '컨텐츠 생성 장치 및 그 학습 방법', date: '2025.04.07', status: 'Filed' },
    { id: 'patent-incremental-2025', year: '2025', type: 'Patent', title: '점진적 학습 장치 및 점진적 학습 방법', date: '2025.04.07', status: 'Filed' },
    { id: 'patent-mri-2025', year: '2025', type: 'Patent', title: '블러링을 포함하는 3D 자기 공명 영상을 블러링이 제거된 클린 MRI로 복원하는 장치 및 방법', date: '2025.01.23', status: 'Filed' },
    { id: 'patent-xcit-2023', year: '2023', type: 'Patent', title: '크로스-공분산 트랜스포머의 임베딩 장치, 방법 및 이를 구현하기 위한 컴퓨터로 판독 가능한 저장 매체', date: '2023.07.25', status: 'Filed' },
    { id: 'patent-handbone-2021', year: '2021', type: 'Patent', title: '2차원 손뼈 투영 이미지로부터 회전된 2차원 손뼈 투영 이미지 생성 방법, 이를 수행하기 위한 기록 매체 및 장치', date: '2021.12.21', status: 'Issued' },
  ],
};

export const DEFAULT_CHALLENGES_CONTENT: ChallengesContent = {
  title: 'Challenges',
  intro: 'Research competitions and external recognition earned through practical AI problem-solving.',
  challenges: [
    { id: 'ai-champion-2025', rank: '6th', percentile: 'Top 0.95%', year: '2025', title: 'AI CHAMPION Challenge', url: 'https://ai-champion.or.kr/champion/video/2025', description: "Recipient of the IITP President's Award in the challenge hosted by the Ministry of Science and ICT (MSIT)." },
    { id: 'unlearning-2023', rank: '8th', percentile: 'Top 0.6%', year: '2023', title: 'NeurIPS Machine Unlearning Challenge', url: 'https://neurips.cc/virtual/2023/competition/66581', description: 'Placed eighth in the first Machine Unlearning Challenge organized with Google DeepMind as part of the NeurIPS 2023 Competition Track.' },
  ],
};

export const DEFAULT_LECTURES_CONTENT: LecturesContent = {
  title: 'Lectures',
  terms: [{ id: '2026-fall', title: '2026 Fall', courses: ['Operating Systems (Undergraduate)', 'Discrete Mathematics (Undergraduate)'] }],
};

export const DEFAULT_CONTACT_CONTENT: ContactContent = {
  title: 'Contact',
  intro: 'Research, student, and collaboration inquiries are welcome.',
  emailLabel: 'Email',
  email: 'ajs0420@hanbat.ac.kr',
  telLabel: 'Tel',
  tel: '044-863-9268',
  affiliationLabel: 'Affiliation',
  affiliationLine1: 'Department of Artificial Intelligence Software',
  affiliationLine2: 'Hanbat National University',
  addressLabel: 'Address',
  addressEn: '304, Building 8, Sejong Common Campus, 109, Jiphyeonbuk-ro, Sejong, Republic of Korea',
  addressKo: '세종특별자치시 집현북로 109, 세종공동캠퍼스 8동 304호',
  directionsTitle: 'Directions',
  mapUrl: 'https://maps.google.com/maps?q=%EC%84%B8%EC%A2%85%EA%B3%B5%EB%8F%99%EC%BA%A0%ED%8D%BC%EC%8A%A4&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const DEFAULT_NEWS_PAGE_CONTENT: NewsPageContent = {
  title: 'News',
  intro: 'Research, publication, and laboratory updates from SAIL.',
  writeLabel: 'Write News',
};

export const SITE_CONTENT_DEFAULTS = {
  global: DEFAULT_GLOBAL_CONTENT,
  home: DEFAULT_HOME_CONTENT,
  research: DEFAULT_RESEARCH_CONTENT,
  professor: DEFAULT_PROFESSOR_CONTENT,
  students: DEFAULT_STUDENTS_CONTENT,
  'publications-international': DEFAULT_INTERNATIONAL_PUBLICATIONS,
  'publications-domestic': DEFAULT_DOMESTIC_PUBLICATIONS,
  challenges: DEFAULT_CHALLENGES_CONTENT,
  lectures: DEFAULT_LECTURES_CONTENT,
  contact: DEFAULT_CONTACT_CONTENT,
  news: DEFAULT_NEWS_PAGE_CONTENT,
} as const;

export type SitePageKey = keyof typeof SITE_CONTENT_DEFAULTS;
