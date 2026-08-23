'use client';

import { Fragment, useState } from 'react';
import { EditableText, InlineListControls } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import type { PublicationPresentation, PublicationsContent, PublicationType } from '@/lib/site-content';

type PublicationFilter = 'All' | PublicationType;
type IndexedPublication = { publication: PublicationsContent['publications'][number]; index: number };

function AuthorNames({ authors }: { authors: string }) {
  return authors.split(/(Jaesin Ahn|안재신)/g).map((part, index) => (
    part === 'Jaesin Ahn' || part === '안재신'
      ? <strong key={`${part}-${index}`}>{part}</strong>
      : <Fragment key={`${part}-${index}`}>{part}</Fragment>
  ));
}

export function PublicationList({ separatePatents = false }: { separatePatents?: boolean }) {
  const { content, setContent, editMode } = usePageContent<PublicationsContent>();
  const publications = content.publications;
  const [filter, setFilter] = useState<PublicationFilter>('All');
  const filters: PublicationFilter[] = separatePatents
    ? ['All', 'Journal', 'Conference', 'Patent']
    : ['All', 'Journal', 'Conference'];
  const counts = publications.reduce<Record<PublicationType, number>>(
    (result, publication) => ({ ...result, [publication.type]: result[publication.type] + 1 }),
    { Journal: 0, Conference: 0, Patent: 0 },
  );
  const availableFilters = filters.filter((item) => item === 'All' || counts[item] > 0 || editMode);
  const indexedPublications = publications.map((publication, index) => ({ publication, index }));
  const mainPublications = indexedPublications.filter(({ publication }) => (
    publication.type !== 'Patent' && (filter === 'All' || publication.type === filter)
  ));
  const patentPublications = indexedPublications.filter(({ publication }) => publication.type === 'Patent');
  const showMainSection = filter !== 'Patent';
  const showPatentSection = separatePatents && (filter === 'All' || filter === 'Patent');

  function updatePublication(index: number, changes: Record<string, unknown>) {
    setContent((current) => {
      const next = [...current.publications];
      next[index] = { ...next[index], ...changes };
      return { ...current, publications: next };
    });
  }

  function changePublicationType(index: number, type: Exclude<PublicationType, 'Patent'>) {
    const publication = publications[index];
    updatePublication(index, {
      type,
      journal: type === 'Journal' ? publication.journal ?? 'Journal name' : undefined,
      conference: type === 'Conference' ? publication.conference ?? 'Conference' : undefined,
    });
  }

  function movePublication(fromIndex: number, toIndex: number) {
    setContent((current) => {
      const next = [...current.publications];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return { ...current, publications: next };
    });
  }

  function addJournalOrConference() {
    const type: Exclude<PublicationType, 'Patent'> = filter === 'Conference' ? 'Conference' : 'Journal';
    setContent((current) => {
      const main = current.publications.filter((publication) => publication.type !== 'Patent');
      const patents = current.publications.filter((publication) => publication.type === 'Patent');
      return {
        ...current,
        publications: [{
          id: `publication-${Date.now()}`,
          year: String(new Date().getFullYear()),
          type,
          title: 'New publication',
          authors: 'Jaesin Ahn',
          journal: type === 'Journal' ? 'Journal name' : undefined,
          conference: type === 'Conference' ? 'Conference' : undefined,
        }, ...main, ...patents],
      };
    });
    setFilter('All');
  }

  function addPatent() {
    setContent((current) => {
      const main = current.publications.filter((publication) => publication.type !== 'Patent');
      const patents = current.publications.filter((publication) => publication.type === 'Patent');
      return {
        ...current,
        publications: [...main, {
          id: `patent-${Date.now()}`,
          year: String(new Date().getFullYear()),
          type: 'Patent',
          title: 'New patent',
          date: new Date().toISOString().slice(0, 10).replaceAll('-', '.'),
          status: 'Filed',
        }, ...patents],
      };
    });
    setFilter('All');
  }

  function renderPublications(items: IndexedPublication[]) {
    return items.map(({ publication, index }, position) => (
      <li className="publication-item" key={publication.id}>
        <div className="publication-meta">
          {editMode && publication.type !== 'Patent' ? (
            <select
              value={publication.type}
              onChange={(event) => changePublicationType(index, event.target.value as Exclude<PublicationType, 'Patent'>)}
            >
              <option>Journal</option>
              <option>Conference</option>
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
              onMoveUp={position > 0 ? () => movePublication(index, items[position - 1].index) : undefined}
              onMoveDown={position < items.length - 1 ? () => movePublication(index, items[position + 1].index) : undefined}
              onRemove={() => setContent((current) => ({
                ...current,
                publications: current.publications.filter((_, itemIndex) => itemIndex !== index),
              }))}
            />
          </div>
        )}
      </li>
    ));
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

      {showMainSection && (
        <section className="publication-main-section">
          <ol className="publication-list">{renderPublications(mainPublications)}</ol>
          {editMode && (
            <button className="cms-add-section" type="button" onClick={addJournalOrConference}>
              Add journal or conference
            </button>
          )}
        </section>
      )}

      {showPatentSection && (
        <section className={`publication-patent-section${filter === 'Patent' ? ' patent-filter-only' : ''}`}>
          <EditableText as="h2" path="patentSectionTitle" />
          <ol className="publication-list">{renderPublications(patentPublications)}</ol>
          {editMode && (
            <button className="cms-add-section" type="button" onClick={addPatent}>
              Add patent
            </button>
          )}
        </section>
      )}
    </div>
  );
}
