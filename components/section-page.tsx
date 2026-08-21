import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SectionPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <main className="interior-page">
      <SiteHeader />
      <section className="interior-hero">
        <div className="container interior-hero-copy">
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </section>
      {children && (
        <section className="interior-content">
          <div className="container prose-panel">{children}</div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
