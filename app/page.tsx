import Link from 'next/link';
import { NewsCard } from '@/components/news-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getAllNewsPosts } from '@/lib/news';

export default function Home() {
  const latestNews = getAllNewsPosts().slice(0, 5);

  return (
    <main className="homepage">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader overlay />

      <div id="main">
        <section className="overview" id="top">
          <div className="hero-shape hero-shape-large" aria-hidden="true" />
          <div className="hero-shape hero-shape-mid" aria-hidden="true" />
          <div className="hero-shape hero-shape-small" aria-hidden="true" />
          <div className="container overview-grid">
            <div className="overview-copy">
              <h1><span>Safe &amp; Applied</span><br /><span>Intelligence Lab</span></h1>
              <p>
                Safe &amp; Applied Intelligence Lab (SAIL) focuses on advancing
                trustworthy artificial intelligence and developing AI solutions
                for real-world applications. We explore generative AI (GenAI),
                natural language processing (NLP), and computer vision (CV).
                Our specific research interests include image enhancement,
                machine unlearning, and mechanistic interpretability. We aim to
                understand and improve how AI systems learn and behave while
                developing effective technologies that can address practical
                problems across diverse domains. Our research is not limited to
                these areas, and we continuously explore new and meaningful
                problems in artificial intelligence.
              </p>
            </div>
            <div className="hexagon-wrapper" aria-label="Image placeholders">
              <div className="hex-img hex-1" aria-label="Image placeholder" />
              <div className="hex-img hex-2" aria-label="Image placeholder" />
              <div className="hex-img hex-3" aria-label="Image placeholder" />
              <div className="hex-img hex-4" aria-label="Image placeholder" />
            </div>
          </div>
        </section>

        <section className="latest-news" id="news">
          <div className="news-shape news-shape-blue" aria-hidden="true" />
          <div className="news-shape news-shape-purple" aria-hidden="true" />
          <div className="container">
            <div className="section-heading-row">
              <h2>Latest News</h2>
              <Link className="arrow view-all-link" href="/activities/news/">View All News</Link>
            </div>
            {latestNews.length > 0 ? (
              <div className="news-grid">
                {latestNews.map((post) => <NewsCard key={post.slug} post={post} />)}
              </div>
            ) : (
              <p className="empty-state">News will be posted here.</p>
            )}
          </div>
        </section>

        <section className="announcement" id="members">
          <div className="container announcement-grid">
            <div className="announcement-copy">
              <h2>People at SAIL</h2>
              <p>
                SAIL is led by <strong>Prof. Jaesin Ahn</strong>. We welcome
                students interested in trustworthy AI, advanced learning
                methods, and practical AI systems for real-world domains.
              </p>
              <Link className="arrow" href="/members/professor/">Meet the Lab</Link>
            </div>
            <div className="faculty-grid">
              <article className="faculty-item">
                <div className="faculty-photo-placeholder" role="img" aria-label="Professor photograph placeholder" />
                <span className="faculty-name">Professor</span>
                <span className="faculty-field">Jaesin Ahn</span>
              </article>
              <article className="faculty-item">
                <div className="faculty-photo-placeholder" role="img" aria-label="Student photograph placeholder" />
                <span className="faculty-name">Students</span>
                <span className="faculty-field">Future SAIL members</span>
              </article>
            </div>
          </div>
        </section>
      </div>

      <a className="back-to-top" href="#top" aria-label="Back to top">↑</a>
      <SiteFooter />
    </main>
  );
}
