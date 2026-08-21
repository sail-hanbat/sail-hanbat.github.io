import fs from 'node:fs';
import path from 'node:path';

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  body: string;
};

const newsDirectory = path.join(process.cwd(), 'content', 'news');

function parseFrontMatter(source: string, slug: string): NewsPost {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`News post "${slug}" is missing front matter.`);
  }

  const metadata = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(':');
        if (separator < 0) return [line.trim(), ''];
        const key = line.slice(0, separator).trim();
        const value = line
          .slice(separator + 1)
          .trim()
          .replace(/^['"]|['"]$/g, '');
        return [key, value];
      }),
  );

  if (!metadata.title || !metadata.date) {
    throw new Error(`News post "${slug}" requires title and date fields.`);
  }

  return {
    slug,
    title: metadata.title,
    date: metadata.date,
    body: match[2].trim(),
  };
}

export function getAllNewsPosts(): NewsPost[] {
  if (!fs.existsSync(newsDirectory)) return [];

  return fs
    .readdirSync(newsDirectory)
    .filter((fileName) => fileName.endsWith('.md') && fileName !== 'README.md')
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const source = fs.readFileSync(path.join(newsDirectory, fileName), 'utf8');
      return parseFrontMatter(source, slug);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return getAllNewsPosts().find((post) => post.slug === slug);
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
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
