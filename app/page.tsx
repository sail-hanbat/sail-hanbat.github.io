import Image from 'next/image';

const researchAreas = [
  {
    number: '01',
    title: 'AI Safety & Evaluation',
    description:
      'We study how advanced AI systems fail, how those failures can be measured, and how models can be made safer before deployment.',
    tags: ['Safety evaluation', 'Generative AI', 'Reliability'],
  },
  {
    number: '02',
    title: 'Mechanistic Interpretability',
    description:
      'We look inside learned representations and circuits to explain model behavior, diagnose hidden risks, and develop actionable interventions.',
    tags: ['Model internals', 'Representation analysis', 'Diagnostics'],
  },
  {
    number: '03',
    title: 'Machine Unlearning & Privacy',
    description:
      'We develop practical ways to remove unwanted knowledge and reduce privacy risks without rebuilding large models from the ground up.',
    tags: ['Unlearning', 'Privacy', 'Responsible AI'],
  },
  {
    number: '04',
    title: 'Applied & Multimodal AI',
    description:
      'We translate trustworthy AI methods into vision, language, medical imaging, remote sensing, and other high-impact domains.',
    tags: ['Computer vision', 'Multimodal AI', 'AI + X'],
  },
];

const publications = [
  {
    venue: 'NeurIPS 2025',
    title:
      'Mitigating Sexual Content Generation via Embedding Distortion in Text-conditioned Diffusion Models',
    authors: 'Jaesin Ahn, Heechul Jung',
    link: 'https://github.com/amoeba04/des',
    linkLabel: 'Code',
  },
  {
    venue: 'Electronics Letters 2025',
    title:
      'A Self-Attention Classifier Head for Improved Image Classification and Interpretability of ViT',
    authors: 'Jaesin Ahn, Heechul Jung',
  },
  {
    venue: 'Neurocomputing 2025',
    title:
      'GDoT: A Gated Dual Domain Transformer for Enhanced MRI Off-Resonance Correction',
    authors: 'Jaesin Ahn, Heechul Jung',
  },
];

const news = [
  {
    date: '2026',
    category: 'Lab',
    title: 'SAIL begins its next chapter at Hanbat National University.',
    text: 'Safe & Applied Intelligence Lab is being established in the Department of Artificial Intelligence Software at Sejong Joint Campus.',
  },
  {
    date: '2025',
    category: 'Publication',
    title: 'Our work on safer text-to-image generation appears at NeurIPS 2025.',
    text: 'The study mitigates sexual content generation through targeted distortion in the text embedding space.',
  },
  {
    date: '2025',
    category: 'Publication',
    title: 'GDoT is published in Neurocomputing.',
    text: 'The gated dual-domain transformer improves MRI off-resonance correction by connecting image and frequency-domain reasoning.',
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="SAIL home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-copy">
            <strong>SAIL</strong>
            <small>Safe &amp; Applied Intelligence Lab</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#people">People</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </nav>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#research">Research</a>
            <a href="#publications">Publications</a>
            <a href="#people">People</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Hanbat National University · Sejong</p>
            <h1>
              Applied intelligence,
              <br />
              <em>built to be safe.</em>
            </h1>
            <p className="hero-intro">
              We investigate how intelligent systems work, where they fail, and
              how to make them trustworthy in the real world.
            </p>
            <div className="hero-actions">
              <a className="text-link" href="#research">
                Explore our research <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link quiet"
                href="https://www.hanbat.ac.kr/aisw/"
                target="_blank"
                rel="noreferrer"
              >
                Department of AI Software <Arrow />
              </a>
            </div>
          </div>

          <div className="signal-field" aria-label="SAIL research themes">
            <div className="signal-orbit" aria-hidden="true" />
            <div className="hex hex-one">
              <span>Safe</span>
            </div>
            <div className="hex hex-two">
              <span>Applied</span>
            </div>
            <div className="hex hex-three">
              <span>Explain</span>
            </div>
            <div className="hex hex-four">
              <span>Unlearn</span>
            </div>
            <div className="hex hex-five">
              <span>Deploy</span>
            </div>
            <p className="signal-caption">Safety, from mechanism to impact.</p>
          </div>
        </section>

        <section className="manifesto section-pad">
          <p className="section-kicker">Our point of view</p>
          <p className="manifesto-copy">
            Intelligence is only useful when people can <strong>understand</strong>{' '}
            it, <strong>control</strong> it, and <strong>rely</strong> on it. SAIL
            connects foundational work on model behavior with applied research
            that matters beyond the lab.
          </p>
          <p className="manifesto-korean" lang="ko">
            지능을 이해하고 통제하며, 현실에서 신뢰할 수 있게 만드는 연구를
            합니다.
          </p>
        </section>

        <section className="research section-pad" id="research">
          <div className="section-heading">
            <div>
              <p className="section-kicker">What we study</p>
              <h2>Research</h2>
            </div>
            <p>
              From internal mechanisms to real-world systems, our work follows
              one question: what would make this AI meaningfully safer?
            </p>
          </div>

          <div className="research-grid">
            {researchAreas.map((area) => (
              <article className="research-item" key={area.number}>
                <p className="item-number">{area.number}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <ul aria-label={`${area.title} topics`}>
                  {area.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-band">
          <p aria-hidden="true">SAIL / SAFE / APPLIED / INTELLIGENCE</p>
          <blockquote>
            “Build systems that do more — and understand enough to know when
            they should not.”
          </blockquote>
        </section>

        <section className="publications section-pad" id="publications">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2>Publications</h2>
            </div>
            <a
              className="text-link"
              href="https://scholar.google.com/citations?user=CY9LCBsAAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar <Arrow />
            </a>
          </div>

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication" key={publication.title}>
                <p className="publication-venue">{publication.venue}</p>
                <div>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                </div>
                {publication.link ? (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${publication.linkLabel}: ${publication.title}`}
                  >
                    {publication.linkLabel} <Arrow />
                  </a>
                ) : (
                  <span aria-hidden="true">—</span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="people section-pad" id="people">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Who we are</p>
              <h2>People</h2>
            </div>
            <p>
              SAIL is growing at Hanbat National University&apos;s Sejong Joint
              Campus.
            </p>
          </div>

          <article className="person-feature">
            <div className="portrait-wrap">
              <Image
                src="/images/jaesin-ahn.jpg"
                alt="Jaesin Ahn"
                width="720"
                height="720"
              />
              <span className="portrait-label">Principal Investigator</span>
            </div>
            <div className="person-copy">
              <p className="section-kicker">Faculty</p>
              <h3>Jaesin Ahn</h3>
              <p className="person-role">
                Assistant Professor
                <br />
                Department of Artificial Intelligence Software
              </p>
              <p>
                His research focuses on AI safety and trustworthiness through
                mechanistic interpretability, machine unlearning, generative AI,
                and computer vision.
              </p>
              <div className="person-links">
                <a href="https://amoeba04.github.io/" target="_blank" rel="noreferrer">
                  Personal page <Arrow />
                </a>
                <a
                  href="https://scholar.google.com/citations?user=CY9LCBsAAAAJ&hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  Scholar <Arrow />
                </a>
                <a href="mailto:amoeba04@gmail.com">Email <Arrow /></a>
              </div>
            </div>
          </article>
        </section>

        <section className="news section-pad" id="news">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Updates</p>
              <h2>Latest news</h2>
            </div>
          </div>

          <div className="news-grid">
            {news.map((item, index) => (
              <article className={`news-card news-card-${index + 1}`} key={item.title}>
                <div className="news-meta">
                  <span>{item.category}</span>
                  <time>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div>
            <p className="section-kicker">Start a conversation</p>
            <h2>
              Curious minds,
              <br />
              meet SAIL.
            </h2>
          </div>
          <div className="contact-details">
            <p>
              For research collaboration and student inquiries, get in touch
              with us.
            </p>
            <a className="contact-email" href="mailto:amoeba04@gmail.com">
              amoeba04@gmail.com <Arrow />
            </a>
            <address>
              Department of Artificial Intelligence Software
              <br />
              Hanbat National University, Sejong Joint Campus
              <br />
              109 Jiphyeonbuk-ro, Sejong, Republic of Korea
            </address>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="footer-brand">
          <strong>SAIL</strong>
          <span>Safe &amp; Applied Intelligence Lab</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/sail-hanbat" target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href="https://www.hanbat.ac.kr/" target="_blank" rel="noreferrer">
            Hanbat National University <Arrow />
          </a>
        </div>
        <p>© 2026 SAIL. Sejong, Korea.</p>
      </footer>
    </main>
  );
}
