export type NewsPost = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  body: string;
  published?: boolean;
};

export type NewsRow = {
  id: string;
  slug: string;
  title: string;
  body: string;
  published: boolean;
  published_at: string;
  created_at?: string;
  updated_at?: string;
};

export const FALLBACK_NEWS: NewsPost[] = [
  {
    slug: 'paper-accepted-findings-emnlp-2026',
    title: 'Paper Accepted to Findings of EMNLP 2026',
    date: '2026-08-21',
    body: 'Our paper, **“Do Backdoored LLMs Share Internal Trigger Representations? Evidence from Frozen SAE Feature Banks,”** by Minjeong Choi, Jaesin Ahn, and Heechul Jung, has been accepted to **Findings of EMNLP 2026**.',
    published: true,
  },
  {
    slug: 'sail-website-opens',
    title: 'SAIL Laboratory Website Is Now Online',
    date: '2026-08-21',
    body: 'The Safe & Applied Intelligence Lab website is now online. This site will document our research, publications, people, lectures, challenges, and collaboration opportunities as the laboratory grows.\n\nSAIL advances trustworthy AI and develops artificial intelligence for real-world applications. Future updates will introduce ongoing projects and new opportunities for students and collaborators.',
    published: true,
  },
];

const NEWS_CACHE_PREFIX = 'sail-public-news-v1';

function getNewsCacheKey(limit?: number): string {
  return `${NEWS_CACHE_PREFIX}:${limit ?? 'all'}`;
}

function parseCachedNews(value: string | null): NewsPost[] | null {
  if (!value) return null;

  try {
    const posts = JSON.parse(value) as unknown;
    if (!Array.isArray(posts)) return null;

    const validPosts = posts.filter(
      (post): post is NewsPost =>
        typeof post === 'object' &&
        post !== null &&
        typeof post.slug === 'string' &&
        typeof post.title === 'string' &&
        typeof post.date === 'string' &&
        typeof post.body === 'string',
    );

    return validPosts.length === posts.length ? validPosts : null;
  } catch {
    return null;
  }
}

export function getCachedNews(limit?: number): NewsPost[] | null {
  if (typeof window === 'undefined') return null;

  const exactCache = parseCachedNews(window.localStorage.getItem(getNewsCacheKey(limit)));
  if (exactCache) return exactCache;

  if (limit) {
    const allNews = parseCachedNews(window.localStorage.getItem(getNewsCacheKey()));
    return allNews?.slice(0, limit) ?? null;
  }

  return parseCachedNews(window.localStorage.getItem(getNewsCacheKey(5)));
}

export function cacheNews(posts: NewsPost[], limit?: number): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(getNewsCacheKey(limit), JSON.stringify(posts));

    if (!limit) {
      window.localStorage.setItem(getNewsCacheKey(5), JSON.stringify(posts.slice(0, 5)));
    }
  } catch {
    // Storage may be disabled; the live request remains the source of truth.
  }
}

export function newsRowToPost(row: NewsRow): NewsPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.published_at,
    body: row.body,
    published: row.published,
  };
}

export function getNewsExcerpt(post: NewsPost, maxLength = 180): string {
  const plainText = post.body
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[>*_`~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength).trimEnd()}…`;
}

export function formatNewsDate(date: string): string {
  const value = date.includes('T') ? date : `${date}T00:00:00Z`;
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}
