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
    slug: 'sail-website-opens',
    title: 'SAIL Laboratory Website Is Now Online',
    date: '2026-08-21',
    body: 'The Safe & Applied Intelligence Lab website is now online. This site will document our research, publications, people, lectures, challenges, and collaboration opportunities as the laboratory grows.\n\nSAIL advances trustworthy AI and develops artificial intelligence for real-world applications. Future updates will introduce ongoing projects and new opportunities for students and collaborators.',
    published: true,
  },
];

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
