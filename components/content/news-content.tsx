'use client';

import Link from 'next/link';
import { EditableText } from '@/components/cms/editable';
import { NewsFeed } from '@/components/news-feed';
import { ContentShell, EditableInteriorHero } from '@/components/content/content-shell';
import type { NewsPageContent } from '@/lib/site-content';

function NewsBody() {
  return (
    <>
      <EditableInteriorHero
        compact
        actions={(
          <Link className="admin-button primary news-action-button" href="/activities/news/post/?new=1">
            <EditableText path="writeLabel" />
          </Link>
        )}
      />
      <section className="news-index">
        <div className="container">
          <NewsFeed />
        </div>
      </section>
    </>
  );
}

export function NewsContentView({ initialContent }: { initialContent: NewsPageContent }) {
  return (
    <ContentShell pageKey="news" initialContent={initialContent}>
      <NewsBody />
    </ContentShell>
  );
}
