import type { ReactNode } from 'react';

type PublicationBase = {
  year: string;
  title: string;
  authors: ReactNode;
  href?: string;
};

type JournalPublication = PublicationBase & {
  type: 'Journal';
  journal: string;
};

type ConferencePublication = PublicationBase & {
  type: 'Conference';
  conference: string;
  presentation?: 'Findings' | 'Oral' | 'Spotlight' | 'Special Track' | 'Workshop';
};

export type Publication = JournalPublication | ConferencePublication;

export function PublicationList({ publications }: { publications: Publication[] }) {
  return (
    <ol className="publication-list">
      {publications.map((publication) => (
        <li className="publication-item" key={`${publication.year}-${publication.title}`}>
          <div className="publication-meta">
            <span>{publication.type}</span>
            <time>{publication.year}</time>
          </div>
          <h2>
            {publication.href ? (
              <a href={publication.href} target="_blank" rel="noreferrer">
                {publication.title}
              </a>
            ) : publication.title}
          </h2>
          <p className="publication-authors">{publication.authors}</p>
          <p className="publication-venue">
            {publication.type === 'Journal'
              ? publication.journal
              : `${publication.conference} ${publication.year}${publication.presentation ? ` · ${publication.presentation}` : ''}`}
          </p>
        </li>
      ))}
    </ol>
  );
}
