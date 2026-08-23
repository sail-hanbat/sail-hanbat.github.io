'use client';

import { useCallback, useEffect, useState } from 'react';
import { NewsCard } from '@/components/news-card';
import {
  cacheNews,
  FALLBACK_NEWS,
  getCachedNews,
  newsRowToPost,
  type NewsPost,
} from '@/lib/news';
import { newsRepository } from '@/lib/news-repository';

export function NewsFeed({ limit }: { limit?: number }) {
  const [posts, setPosts] = useState<NewsPost[]>(
    limit ? FALLBACK_NEWS.slice(0, limit) : FALLBACK_NEWS,
  );
  const [loaded, setLoaded] = useState(false);

  const loadPosts = useCallback(async () => {
    try {
      const data = await newsRepository.listPosts({ limit });
      if (data) {
        const nextPosts = data.map(newsRowToPost);
        setPosts(nextPosts);
        cacheNews(nextPosts, limit);
      }
    } finally {
      setLoaded(true);
    }
  }, [limit]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      const cachedPosts = getCachedNews(limit);
      if (cachedPosts) setPosts(cachedPosts);
      void loadPosts();
    }, 0);
    const unsubscribe = newsRepository.subscribe(() => void loadPosts(), `public-news-${limit ?? 'all'}`);

    return () => {
      window.clearTimeout(loadTimer);
      unsubscribe();
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
