const newsItems = [
  {
    title: 'SAIL begins its next chapter at Hanbat National University.',
    description:
      'The Safe & Applied Intelligence Lab is being established in the Department of Artificial Intelligence Software at Sejong Joint Campus. The laboratory will connect fundamental questions in AI safety with practical systems research.',
    href: '#faculty',
  },
  {
    title:
      'Our work on safer text-to-image generation appears at NeurIPS 2025.',
    description:
      'The study examines how targeted interventions in a model representation can reduce unsafe generation while preserving useful behavior.',
    href: 'https://github.com/amoeba04/des',
  },
  {
    title: 'GDoT is published in Neurocomputing.',
    href: 'https://scholar.google.com/citations?user=CY9LCBsAAAAJ&hl=en',
  },
  {
    title:
      'A self-attention classifier head improves image classification and interpretability of ViT.',
    description:
      'The approach makes the final decision process more transparent while retaining strong visual recognition performance across evaluation settings.',
    href: 'https://scholar.google.com/citations?user=CY9LCBsAAAAJ&hl=en',
  },
  {
    title:
      'SAIL investigates model behavior from internal mechanisms to real-world deployment.',
    description:
      'Our research connects mechanistic interpretability, machine unlearning, generative AI safety, privacy, and reliable applied intelligence.',
    href: '#research',
  },
  {
    title: 'Research in trustworthy AI expands across language and vision.',
    href: '#research',
  },
  {
    title:
      'Mechanistic interpretability offers a new way to diagnose privacy failures in clinical text.',
    description:
      'We study why language models fail to remove sensitive information and how their internal representations can guide safer interventions.',
    href: '#research',
  },
  {
    title: 'Applied intelligence meets AI safety at Sejong Joint Campus.',
    description:
      'The new laboratory brings mechanistic analysis, reliable learning, and domain-centered AI research into one shared program for students and collaborators.',
    href: '#contact',
  },
  {
    title: 'The first SAIL laboratory website is now online.',
    description:
      'This site will grow with the laboratory, its members, publications, projects, and research activities.',
    href: '#top',
  },
  {
    title:
      'Machine unlearning research targets safer and more accountable model updates.',
    description:
      'The work asks how unwanted knowledge can be removed without retraining a large model from the beginning.',
    href: '#research',
  },
  {
    title:
      'SAIL studies reliable artificial intelligence for medical and scientific applications.',
    description:
      'Our applied research asks how models can remain accurate, understandable, and dependable when evidence is incomplete and the cost of failure is high.',
    href: '#research',
  },
  {
    title:
      'A lightweight language-enhanced model advances forestry analysis in remote sensing imagery.',
    description:
      'The study connects visual representation learning with language guidance for practical environmental analysis.',
    href: 'https://scholar.google.com/citations?user=CY9LCBsAAAAJ&hl=en',
  },
  {
    title:
      'Research collaboration connects foundational AI safety with applied problems.',
    description:
      'SAIL welcomes conversations across language, vision, healthcare, science, and intelligent systems.',
    href: '#affiliates',
  },
  {
    title:
      'Students interested in trustworthy AI can follow new SAIL projects and activities here.',
    description:
      'Future updates will introduce open projects, seminars, reading groups, and opportunities to work with the laboratory.',
    href: '#contact',
  },
];

const updates = [
  {
    date: 'August 2026',
    text: 'SAIL is preparing a new research environment for safe and applied intelligence at Hanbat National University.',
    note: 'Research group update',
    media: true,
    quote:
      'A new laboratory environment for careful, testable, and useful artificial intelligence research.',
  },
  {
    date: 'Research focus',
    text: 'How can we understand model internals well enough to detect risk, remove unwanted behavior, and make reliable interventions?',
    note: 'Mechanistic interpretability · Machine unlearning',
    media: true,
  },
  {
    date: 'Selected work',
    text: 'Mitigating unsafe generation through targeted changes in the text embedding space.',
    note: 'NeurIPS 2025',
    compact: true,
  },
  {
    date: 'Applied AI',
    text: 'Reliable AI methods become most valuable when they remain understandable under the constraints of real scientific and engineering applications.',
    note: 'Vision · Language · Medical imaging',
    media: true,
  },
  {
    date: 'Open question',
    text: 'Can an AI system forget precisely what it should forget while preserving the useful structure it has learned?',
    note: 'Machine unlearning',
  },
  {
    date: 'Laboratory',
    text: 'The SAIL website will document publications, members, projects, seminars, and collaboration opportunities as the laboratory grows.',
    note: 'Sejong Joint Campus',
    media: true,
  },
];

function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith('http');

  return (
    <a
      className="arrow"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="homepage">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="header-main">
        <div className="top-nav">
          <a href="#top">Login</a>
        </div>
        <div className="navbar">
          <div className="container nav-container">
            <a className="wordmark" href="#top" aria-label="Stanford AI Lab home">
              <span className="wordmark-symbol" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="wordmark-copy">
                <strong>Stanford</strong>
                <small>Artificial<br />Intelligence</small>
              </span>
            </a>
            <nav className="desktop-nav" aria-label="Primary navigation">
              <a href="#faculty">Faculty</a>
              <a href="#members">Postdoctoral Fellows</a>
              <a href="#research">Research Groups</a>
              <a href="#affiliates">Centers + Affiliates</a>
              <a href="#events">Events</a>
              <a href="#publications">Courses</a>
              <a href="#projects">Outreach</a>
              <a href="#news">Blog</a>
              <a href="#contact">About + Contact</a>
            </nav>
            <details className="mobile-nav">
              <summary aria-label="Toggle navigation">
                <span />
                <span />
                <span />
              </summary>
              <nav aria-label="Mobile navigation">
                <a href="#faculty">Faculty</a>
                <a href="#members">Members</a>
                <a href="#research">Research Groups</a>
                <a href="#affiliates">Centers + Affiliates</a>
                <a href="#news">News</a>
                <a href="#contact">About + Contact</a>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <div id="main">
        <section className="overview" id="top">
          <div className="hero-shape hero-shape-large" aria-hidden="true" />
          <div className="hero-shape hero-shape-mid" aria-hidden="true" />
          <div className="hero-shape hero-shape-small" aria-hidden="true" />
          <div className="container overview-grid">
            <div className="overview-copy">
              <h1><span>Stanford</span><br /><span>AI Lab</span></h1>
              <p>
                The Stanford Artificial Intelligence Laboratory (SAIL) has been
                a center of excellence for Artificial Intelligence research,
                teaching, theory, and practice since its founding in 1963.
              </p>
            </div>
            <div className="hexagon-wrapper" aria-label="Image placeholders">
              <div className="hex-img hex-1" aria-label="Image placeholder" />
              <div className="hex-img hex-2" aria-label="Image placeholder" />
              <div className="hex-img hex-3" aria-label="Image placeholder" />
              <div className="hex-img hex-4" aria-label="Image placeholder" />
              <div className="hex-img hex-5" aria-label="Image placeholder" />
            </div>
          </div>
        </section>

        <section className="latest-news" id="news">
          <div className="news-shape news-shape-blue" aria-hidden="true" />
          <div className="news-shape news-shape-purple" aria-hidden="true" />
          <div className="container">
            <h2>Latest News</h2>
            <div className="card-columns">
              {newsItems.map((item) => (
                <article className="card" key={item.title}>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                    <div className="read-more-sec">
                      <ArrowLink href={item.href}>Read More</ArrowLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div
          className="photo-break"
          role="img"
          aria-label="Wide laboratory photograph placeholder"
        />

        <section className="updates" id="research">
          <div className="container">
            <div className="updates-heading">
              <h2>Latest Tweets</h2>
              <a
                className="social-link"
                href="https://github.com/sail-hanbat"
                target="_blank"
                rel="noreferrer"
              >
                <span aria-hidden="true">◎</span> @StanfordAILab
              </a>
            </div>
            <div className="update-grid">
              {updates.map((update, index) => (
                <article
                  className={`update-card${'compact' in update && update.compact ? ' compact' : ''}`}
                  key={update.date}
                >
                  {index > 0 && (
                    <div className="update-context">↻ Stanford AI Lab Retweeted</div>
                  )}
                  <div className="update-author">
                    <span className="avatar-placeholder" aria-hidden="true" />
                    <span>
                      <strong>Stanford AI Lab</strong>
                      <small>@StanfordAILab</small>
                    </span>
                  </div>
                  <p>{update.text}</p>
                  {'quote' in update && update.quote && (
                    <div className="update-quote">{update.quote}</div>
                  )}
                  {'media' in update && update.media && (
                    <div
                      className="update-media-placeholder"
                      role="img"
                      aria-label="Update image placeholder"
                    />
                  )}
                  <p className="update-note">{update.note}</p>
                  <time>{update.date}</time>
                  <div className="update-actions" aria-hidden="true">
                    <span>↩</span><span>↻</span><span>♡</span><span>···</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="load-more" aria-hidden="true">
              Load More...
            </div>
          </div>
        </section>

        <section className="announcement" id="faculty">
          <div className="announcement-pattern" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="container announcement-grid">
            <div className="announcement-copy">
              <h2>We Are Pleased to Welcome New Members of Our Faculty</h2>
              <p>
                <strong>Jaesin Ahn</strong> leads research on AI safety,
                mechanistic interpretability, machine unlearning, generative AI,
                and computer vision.
              </p>
              <p>
                SAIL connects foundational understanding with applied research
                for intelligent systems that people can trust.
              </p>
              <ArrowLink href="https://amoeba04.github.io/">
                See the Faculty Profile
              </ArrowLink>
            </div>
            <div className="faculty-grid" id="members">
              <article className="faculty-item">
                <div
                  className="faculty-photo-placeholder"
                  role="img"
                  aria-label="Jaesin Ahn photograph placeholder"
                />
                <span className="faculty-name">Ludwig Schmidt</span>
                <span className="faculty-field">
                  Datasets, Reliable Generalization, and Foundation Models.
                </span>
              </article>
              <article className="faculty-item">
                <div
                  className="faculty-photo-placeholder"
                  role="img"
                  aria-label="Laboratory member photograph placeholder"
                />
                <span className="faculty-name">Yejin Choi</span>
                <span className="faculty-field">
                  Natural Language Processing and Deep Learning.
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="affiliates" id="affiliates">
          <div className="affiliate-pattern" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="container affiliates-copy">
            <h2>Affiliates Program</h2>
            <p className="subtitle">
              SAIL works with researchers, students, and organizations to
              understand and solve difficult problems in safe and applied
              artificial intelligence.
            </p>
            <a className="button white-button" href="mailto:amoeba04@gmail.com">
              Learn More
            </a>
          </div>
        </section>
      </div>

      <a className="back-to-top" href="#top" aria-label="Back to top">
        ↑
      </a>

      <footer className="global-footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-logo" aria-label="Stanford University">
            <strong>Stanford</strong>
            <span>University</span>
          </div>
          <div className="footer-content">
            <nav className="footer-top-links" aria-label="University links">
              <a href="https://www.stanford.edu/" target="_blank" rel="noreferrer">
                Stanford Home
              </a>
              <a href="https://visit.stanford.edu/plan/" target="_blank" rel="noreferrer">
                Maps &amp; Directions
              </a>
              <a href="https://www.stanford.edu/search/" target="_blank" rel="noreferrer">
                Search Stanford
              </a>
              <a href="https://emergency.stanford.edu/" target="_blank" rel="noreferrer">
                Emergency Info
              </a>
              <a href="#top">Internal</a>
            </nav>
            <nav className="footer-bottom-links" aria-label="Laboratory links">
              <a href="#top">Terms of Use</a>
              <a href="#top">Privacy</a>
              <a href="#top">Copyright</a>
              <a href="#top">Trademarks</a>
              <a href="#top">Non-Discrimination</a>
              <a href="#top">Accessibility</a>
            </nav>
            <p className="vcard">
              © Stanford University. Stanford, California 94305.
            </p>
          </div>
        </div>
      </footer>

      <span className="anchor-target" id="events" />
      <span className="anchor-target" id="publications" />
      <span className="anchor-target" id="projects" />
    </main>
  );
}
