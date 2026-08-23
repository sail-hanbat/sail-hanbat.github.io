'use client';

import Link from 'next/link';
import { EditableImage, EditableText } from '@/components/cms/editable';
import { PageContentProvider } from '@/components/cms/page-content-provider';
import { NewsFeed } from '@/components/news-feed';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import type { HomeContent } from '@/lib/site-content';

function HomeBody() {
  return (
    <>
      <div id="main">
        <section className="overview" id="top">
          <div className="hero-shape hero-shape-large" aria-hidden="true" />
          <div className="hero-shape hero-shape-mid" aria-hidden="true" />
          <div className="hero-shape hero-shape-small" aria-hidden="true" />
          <div className="hero-shape hero-shape-drift" aria-hidden="true" />
          <div className="hero-shape hero-shape-accent" aria-hidden="true" />
          <div className="container overview-grid">
            <div className="overview-copy">
              <h1>
                <EditableText path="hero.titleLine1" />
                <br />
                <EditableText path="hero.titleLine2" />
              </h1>
              <EditableText as="p" path="hero.description" multiline />
            </div>
            <div className="hexagon-wrapper" aria-label="Laboratory images">
              {[0, 1, 2, 3].map((index) => (
                <EditableImage
                  path={`hero.images.${index}`}
                  alt={`SAIL laboratory image ${index + 1}`}
                  className="hex-content-image"
                  wrapperClassName={`hex-img hex-${index + 1}`}
                  key={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="latest-news" id="news">
          <div className="news-shape news-shape-blue" aria-hidden="true" />
          <div className="news-shape news-shape-purple" aria-hidden="true" />
          <div className="container">
            <div className="section-heading-row">
              <EditableText as="h2" path="latestNews.title" />
              <Link className="arrow view-all-link" href="/activities/news/"><EditableText path="latestNews.viewAllLabel" /></Link>
            </div>
            <NewsFeed limit={5} />
          </div>
        </section>

        <section className="announcement" id="members">
          <div className="container announcement-copy">
            <EditableText as="h2" path="recruitment.title" />
            <EditableText as="p" path="recruitment.description" multiline />
            <Link className="arrow" href="/contact/"><EditableText path="recruitment.buttonLabel" /></Link>
          </div>
        </section>
      </div>
      <a className="back-to-top" href="#top" aria-label="Back to top">↑</a>
    </>
  );
}

export function HomeContentView({ initialContent }: { initialContent: HomeContent }) {
  return (
    <main className="homepage">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader overlay />
      <PageContentProvider pageKey="home" initialContent={initialContent}>
        <HomeBody />
      </PageContentProvider>
      <SiteFooter />
    </main>
  );
}
