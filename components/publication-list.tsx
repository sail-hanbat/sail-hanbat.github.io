import type { ReactNode } from 'react';

export type Publication = {
  year: string;
  type: 'Journal' | 'Conference';
  title: string;
  authors: ReactNode;
  venue: string;
  href?: string;
  note?: string;
};

export function PublicationList({ publications }: { publications: Publication[] }) {
  return (
    <ol className="publication-list">
      {publications.map((publication) => (
        <li className="publication-item" key={`${publication.year}-${publication.title}`}>
          <div className="publication-meta">
            <span>{publication.type}</span>
            <time>{publication.year}</time>
            {publication.note && <em>{publication.note}</em>}
          </div>
          <h2>
            {publication.href ? (
              <a href={publication.href} target="_blank" rel="noreferrer">
                {publication.title}
              </a>
            ) : publication.title}
          </h2>
          <p className="publication-authors">{publication.authors}</p>
          <p className="publication-venue">{publication.venue}</p>
        </li>
      ))}
    </ol>
  );
}
