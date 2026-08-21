'use client';

import { useCallback, useEffect, useState } from 'react';
import { NewsCard } from '@/components/news-card';
import { FALLBACK_NEWS, newsRowToPost, type NewsPost, type NewsRow } from '@/lib/news';
import { supabase } from '@/lib/supabase';

export function NewsFeed({ limit }: { limit?: number }) {
  const [posts, setPosts] = useState<NewsPost[]>(
    limit ? FALLBACK_NEWS.slice(0, limit) : FALLBACK_NEWS,
  );
  const [loaded, setLoaded] = useState(false);

  const loadPosts = useCallback(async () => {
    let query = supabase
      .from('news_posts')
      .select('id, slug, title, body, published, published_at, created_at, updated_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (!error && data) {
      setPosts((data as NewsRow[]).map(newsRowToPost));
    }
    setLoaded(true);
  }, [limit]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => void loadPosts(), 0);
    const channel = supabase
      .channel(`public-news-${limit ?? 'all'}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news_posts' },
        () => void loadPosts(),
      )
      .subscribe();

    return () => {
      window.clearTimeout(loadTimer);
      void supabase.removeChannel(channel);
    };
  }, [limit, loadPosts]);

  if (loaded && posts.length === 0) {
    return <p className="empty-state">News will be posted here.</p>;
  }

  return (
    <div className={`news-grid${limit ? '' : ' news-index-grid'}`} aria-live="polite">
      {posts.map((post) => <NewsCard key={post.id ?? post.slug} post={post} />)}
    </div>
  );
}
