import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SectionPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <main className="interior-page">
      <SiteHeader />
      <section className="interior-hero">
        <div className="container interior-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="interior-content">
        <div className="container prose-panel">{children}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
