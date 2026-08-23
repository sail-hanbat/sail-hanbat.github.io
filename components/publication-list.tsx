'use client';

import { Fragment, useState } from 'react';
import { EditableText, InlineListControls } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import type { PublicationPresentation, PublicationsContent, PublicationType } from '@/lib/site-content';

type PublicationFilter = 'All' | PublicationType;

function AuthorNames({ authors }: { authors: string }) {
  return authors.split(/(Jaesin Ahn|안재신)/g).map((part, index) => (
    part === 'Jaesin Ahn' || part === '안재신'
      ? <strong key={`${part}-${index}`}>{part}</strong>
      : <Fragment key={`${part}-${index}`}>{part}</Fragment>
  ));
}

export function PublicationList() {
  const { content, setContent, editMode } = usePageContent<PublicationsContent>();
  const publications = content.publications;
  const [filter, setFilter] = useState<PublicationFilter>('All');
  const filters: PublicationFilter[] = ['All', 'Journal', 'Conference', 'Patent'];
  const counts = publications.reduce<Record<PublicationType, number>>(
    (result, publication) => ({ ...result, [publication.type]: result[publication.type] + 1 }),
    { Journal: 0, Conference: 0, Patent: 0 },
  );
  const availableFilters = filters.filter((item) => item === 'All' || counts[item] > 0 || editMode);
  const indexedPublications = publications.map((publication, index) => ({ publication, index }));
  const visiblePublications = filter === 'All'
    ? indexedPublications
    : indexedPublications.filter(({ publication }) => publication.type === filter);

  function updatePublication(index: number, changes: Record<string, unknown>) {
    setContent((current) => {
      const next = [...current.publications];
      next[index] = { ...next[index], ...changes };
      return { ...current, publications: next };
    });
  }

  return (
    <div className="publication-browser">
      <div className="publication-filters" role="group" aria-label="Filter publications by type">
        {availableFilters.map((item) => {
          const count = item === 'All' ? publications.length : counts[item];
          return (
            <button className={`publication-filter${filter === item ? ' active' : ''}`} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>
              {item} <span>({count})</span>
            </button>
          );
        })}
      </div>

      <ol className="publication-list">
        {visiblePublications.map(({ publication, index }) => (
          <li className="publication-item" key={publication.id}>
            <div className="publication-meta">
              {editMode ? (
                <select value={publication.type} onChange={(event) => updatePublication(index, { type: event.target.value as PublicationType })}>
                  <option>Journal</option>
                  <option>Conference</option>
                  <option>Patent</option>
                </select>
              ) : <span>{publication.type}</span>}
              <EditableText as="time" path={`publications.${index}.year`} />
            </div>
            <EditableText as="h2" path={`publications.${index}.title`} multiline />
            {publication.type !== 'Patent' && (
              <p className="publication-authors">
                {editMode
                  ? <EditableText path={`publications.${index}.authors`} multiline />
                  : <AuthorNames authors={publication.authors ?? ''} />}
              </p>
            )}
            <p className="publication-venue">
              <strong>
                {publication.type === 'Journal' && <EditableText path={`publications.${index}.journal`} />}
                {publication.type === 'Conference' && (
                  publication.yearFirst
                    ? <><EditableText path={`publications.${index}.year`} /> <EditableText path={`publications.${index}.conference`} /></>
                    : <><EditableText path={`publications.${index}.conference`} /> <EditableText path={`publications.${index}.year`} /></>
                )}
                {publication.type === 'Patent' && <EditableText path={`publications.${index}.date`} />}
              </strong>
              {publication.type === 'Conference' && publication.presentation && ` · ${publication.presentation}`}
              {publication.type === 'Patent' && ` · ${publication.status === 'Filed' ? '출원' : '등록'}`}
            </p>

            {editMode && (
              <div className="cms-publication-options">
                {publication.type === 'Conference' && (
                  <>
                    <label>
                      <span>Presentation</span>
                      <select value={publication.presentation ?? ''} onChange={(event) => updatePublication(index, { presentation: event.target.value as PublicationPresentation })}>
                        <option value="">Default</option>
                        <option>Findings</option>
                        <option>Oral</option>
                        <option>Spotlight</option>
                        <option>Special Track</option>
                        <option>Workshop</option>
                      </select>
                    </label>
                    <label className="cms-option-check">
                      <input type="checkbox" checked={Boolean(publication.yearFirst)} onChange={(event) => updatePublication(index, { yearFirst: event.target.checked })} />
                      <span>Show year before conference name</span>
                    </label>
                  </>
                )}
                {publication.type === 'Patent' && (
                  <label>
                    <span>Status</span>
                    <select value={publication.status ?? 'Filed'} onChange={(event) => updatePublication(index, { status: event.target.value as 'Filed' | 'Issued' })}>
                      <option value="Filed">출원</option>
                      <option value="Issued">등록</option>
                    </select>
                  </label>
                )}
                <InlineListControls
                  onMoveUp={index > 0 ? () => setContent((current) => {
                    const next = [...current.publications];
                    [next[index - 1], next[index]] = [next[index], next[index - 1]];
                    return { ...current, publications: next };
                  }) : undefined}
                  onMoveDown={index < publications.length - 1 ? () => setContent((current) => {
                    const next = [...current.publications];
                    [next[index + 1], next[index]] = [next[index], next[index + 1]];
                    return { ...current, publications: next };
                  }) : undefined}
                  onRemove={() => setContent((current) => ({ ...current, publications: current.publications.filter((_, itemIndex) => itemIndex !== index) }))}
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      {editMode && (
        <button className="cms-add-section" type="button" onClick={() => {
          const type = filter === 'All' ? 'Journal' : filter;
          setContent((current) => ({
            ...current,
            publications: [...current.publications, {
              id: `publication-${Date.now()}`,
              year: String(new Date().getFullYear()),
              type,
              title: 'New publication',
              authors: type === 'Patent' ? undefined : 'Jaesin Ahn',
              journal: type === 'Journal' ? 'Journal name' : undefined,
              conference: type === 'Conference' ? 'Conference' : undefined,
              date: type === 'Patent' ? new Date().toISOString().slice(0, 10).replaceAll('-', '.') : undefined,
              status: type === 'Patent' ? 'Filed' : undefined,
            }],
          }));
          setFilter('All');
        }}>
          Add publication
        </button>
      )}
    </div>
  );
}
