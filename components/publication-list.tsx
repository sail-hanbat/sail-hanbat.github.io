import type { ReactNode } from 'react';

type PublicationBase = {
  year: string;
  title: string;
  authors: ReactNode;
};

type JournalPublication = PublicationBase & {
  type: 'Journal';
  journal: string;
};

type ConferencePublication = PublicationBase & {
  type: 'Conference';
  conference: string;
  yearFirst?: boolean;
  presentation?: 'Findings' | 'Oral' | 'Spotlight' | 'Special Track' | 'Workshop';
};

export type Publication = JournalPublication | ConferencePublication;

function formatPublicationVenue(publication: Publication) {
  if (publication.type === 'Journal') {
    return publication.journal;
  }

  return publication.yearFirst
    ? `${publication.year} ${publication.conference}`
    : `${publication.conference} ${publication.year}`;
}

export function PublicationList({ publications }: { publications: Publication[] }) {
  return (
    <ol className="publication-list">
      {publications.map((publication) => (
        <li className="publication-item" key={`${publication.year}-${publication.title}`}>
          <div className="publication-meta">
            <span>{publication.type}</span>
            <time>{publication.year}</time>
          </div>
          <h2>{publication.title}</h2>
          <p className="publication-authors">{publication.authors}</p>
          <p className="publication-venue">
            <strong>{formatPublicationVenue(publication)}</strong>
            {publication.type === 'Conference' && publication.presentation && ` · ${publication.presentation}`}
          </p>
        </li>
      ))}
    </ol>
  );
}
