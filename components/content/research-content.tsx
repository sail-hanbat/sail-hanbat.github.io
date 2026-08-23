'use client';

import { EditableText, InlineListControls } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { ResearchContent } from '@/lib/site-content';

function move<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function ResearchBody() {
  const { content, setContent, editMode } = usePageContent<ResearchContent>();

  return (
    <>
      <EditableInteriorHero />
      <InteriorBody>
        <div className="research-track-grid research-track-grid-four">
          {content.tracks.map((track, trackIndex) => (
            <article className="research-track" key={`${track.title}-${trackIndex}`}>
              <EditableText as="h2" path={`tracks.${trackIndex}.title`} />
              <InlineListControls
                onMoveUp={trackIndex > 0 ? () => setContent((current) => ({ ...current, tracks: move(current.tracks, trackIndex, -1) })) : undefined}
                onMoveDown={trackIndex < content.tracks.length - 1 ? () => setContent((current) => ({ ...current, tracks: move(current.tracks, trackIndex, 1) })) : undefined}
                onRemove={() => setContent((current) => ({ ...current, tracks: current.tracks.filter((_, index) => index !== trackIndex) }))}
              />
              <EditableText as="p" path={`tracks.${trackIndex}.description`} multiline />
              <ul>
                {track.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`}>
                    <EditableText path={`tracks.${trackIndex}.items.${itemIndex}`} multiline />
                    <InlineListControls
                      onAdd={() => setContent((current) => {
                        const tracks = [...current.tracks];
                        tracks[trackIndex] = { ...tracks[trackIndex], items: [...tracks[trackIndex].items, 'New research topic'] };
                        return { ...current, tracks };
                      })}
                      onRemove={() => setContent((current) => {
                        const tracks = [...current.tracks];
                        tracks[trackIndex] = { ...tracks[trackIndex], items: tracks[trackIndex].items.filter((_, index) => index !== itemIndex) };
                        return { ...current, tracks };
                      })}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {editMode && (
          <button className="cms-add-section" type="button" onClick={() => setContent((current) => ({
            ...current,
            tracks: [...current.tracks, { title: 'New Research Area', description: 'Describe this research area.', items: ['New research topic'] }],
          }))}>
            Add research area
          </button>
        )}
      </InteriorBody>
    </>
  );
}

export function ResearchContentView({ initialContent }: { initialContent: ResearchContent }) {
  return (
    <ContentShell pageKey="research" initialContent={initialContent}>
      <ResearchBody />
    </ContentShell>
  );
}
