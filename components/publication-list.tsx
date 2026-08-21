'use client';

import { useState, type ReactNode } from 'react';

type PublicationType = 'Journal' | 'Conference' | 'Patent';
type PublicationFilter = 'All' | PublicationType;

type PublicationBase = {
  year: string;
  title: string;
  authors?: ReactNode;
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

type PatentPublication = PublicationBase & {
  type: 'Patent';
  date: string;
  status: 'Filed' | 'Issued';
};

export type Publication = JournalPublication | ConferencePublication | PatentPublication;

function formatPublicationVenue(publication: Publication) {
  if (publication.type === 'Journal') {
    return publication.journal;
  }

  if (publication.type === 'Patent') {
    return publication.date;
  }

  return publication.yearFirst
    ? `${publication.year} ${publication.conference}`
    : `${publication.conference} ${publication.year}`;
}

export function PublicationList({ publications }: { publications: Publication[] }) {
  const [filter, setFilter] = useState<PublicationFilter>('All');
  const filters: PublicationFilter[] = ['All', 'Journal', 'Conference', 'Patent'];
  const counts = publications.reduce<Record<PublicationType, number>>(
    (result, publication) => ({
      ...result,
      [publication.type]: result[publication.type] + 1,
    }),
    { Journal: 0, Conference: 0, Patent: 0 },
  );
  const availableFilters = filters.filter((item) => item === 'All' || counts[item] > 0);
  const visiblePublications = filter === 'All'
    ? publications
    : publications.filter((publication) => publication.type === filter);

  return (
    <div className="publication-browser">
      <div className="publication-filters" role="group" aria-label="Filter publications by type">
        {availableFilters.map((item) => {
          const count = item === 'All' ? publications.length : counts[item];

          return (
            <button
              className={`publication-filter${filter === item ? ' active' : ''}`}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item} <span>({count})</span>
            </button>
          );
        })}
      </div>
      <ol className="publication-list">
        {visiblePublications.map((publication) => (
          <li className="publication-item" key={`${publication.year}-${publication.title}`}>
            <div className="publication-meta">
              <span>{publication.type}</span>
              <time>{publication.year}</time>
            </div>
            <h2>{publication.title}</h2>
            {publication.authors && <p className="publication-authors">{publication.authors}</p>}
            <p className="publication-venue">
              <strong>{formatPublicationVenue(publication)}</strong>
              {publication.type === 'Conference' && publication.presentation && ` · ${publication.presentation}`}
              {publication.type === 'Patent' && ` · ${publication.status === 'Filed' ? '출원' : '등록'}`}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
