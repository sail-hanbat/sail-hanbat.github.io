'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { NewsBody } from '@/components/news-body';
import { formatNewsDate, newsRowToPost, type NewsPost, type NewsRow } from '@/lib/news';
import { supabase } from '@/lib/supabase';

export function NewsPostClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') ?? '';
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPost = useCallback(async () => {
    if (!slug) {
      setPost(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('news_posts')
      .select('id, slug, title, body, published, published_at, created_at, updated_at')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    setPost(!error && data ? newsRowToPost(data as NewsRow) : null);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => void loadPost(), 0);
    const channel = supabase
      .channel(`news-post-${slug || 'missing'}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news_posts' },
        () => void loadPost(),
      )
      .subscribe();

    return () => {
      window.clearTimeout(loadTimer);
      void supabase.removeChannel(channel);
    };
  }, [loadPost, slug]);

  if (loading) {
    return <p className="news-status">Loading news…</p>;
  }

  if (!post) {
    return (
      <div className="news-status">
        <p>This news post is not available.</p>
        <Link className="arrow" href="/activities/news/">Back to News</Link>
      </div>
    );
  }

  return (
    <>
      <header className="news-article-header">
        <div className="container article-container">
          <Link className="back-link" href="/activities/news/">← News</Link>
          <h1>{post.title}</h1>
          <div className="news-article-meta">
            <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
            <Link
              className="admin-button primary news-edit-button"
              href={`/activities/news/admin/?edit=${encodeURIComponent(post.slug)}`}
            >
              Edit News
            </Link>
          </div>
        </div>
      </header>
      <div className="container article-container news-article-content">
        <NewsBody body={post.body} />
      </div>
    </>
  );
}
