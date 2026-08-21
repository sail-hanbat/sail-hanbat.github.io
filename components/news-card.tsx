import Link from 'next/link';
import { formatNewsDate, getNewsExcerpt, type NewsPost } from '@/lib/news';

export function NewsCard({ post }: { post: NewsPost }) {
  const href = `/activities/news/${post.slug}/`;

  return (
    <article className="news-card">
      <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
      <h3><Link href={href}>{post.title}</Link></h3>
      <p>{getNewsExcerpt(post)}</p>
      <div className="read-more-sec">
        <Link className="arrow" href={href}>Read More</Link>
      </div>
    </article>
  );
}
