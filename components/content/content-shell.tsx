'use client';

import type { ReactNode } from 'react';
import { EditableText } from '@/components/cms/editable';
import { PageContentProvider } from '@/components/cms/page-content-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function ContentShell<T>({
  pageKey,
  initialContent,
  children,
}: {
  pageKey: string;
  initialContent: T;
  children: ReactNode;
}) {
  return (
    <main className="interior-page">
      <SiteHeader />
      <PageContentProvider pageKey={pageKey} initialContent={initialContent}>
        {children}
      </PageContentProvider>
      <SiteFooter />
    </main>
  );
}

export function EditableInteriorHero({
  titlePath = 'title',
  introPath = 'intro',
  compact = false,
  actions,
}: {
  titlePath?: string;
  introPath?: string | null;
  compact?: boolean;
  actions?: ReactNode;
}) {
  return (
    <section className={`interior-hero${compact ? ' compact-interior-hero' : ''}`}>
      <div className="container interior-hero-copy">
        <EditableText as="h1" path={titlePath} />
        {introPath && <EditableText as="p" path={introPath} multiline />}
        {actions}
      </div>
    </section>
  );
}

export function InteriorBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`interior-content${className ? ` ${className}` : ''}`}>
      <div className="container prose-panel">{children}</div>
    </section>
  );
}
