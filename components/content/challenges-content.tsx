'use client';

import { EditableText, EditableUrl, InlineListControls } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { ChallengesContent } from '@/lib/site-content';

function ChallengesBody() {
  const { content, setContent, editMode } = usePageContent<ChallengesContent>();
  return (
    <>
      <EditableInteriorHero />
      <InteriorBody>
        <div className="achievement-list">
          {content.challenges.map((challenge, index) => (
            <article key={challenge.id}>
              <div className="achievement-rank">
                <EditableText as="strong" path={`challenges.${index}.rank`} />
                <EditableText path={`challenges.${index}.percentile`} />
              </div>
              <div>
                <EditableText as="time" path={`challenges.${index}.year`} />
                <h2>
                  <a href={challenge.url} target="_blank" rel="noreferrer"><EditableText path={`challenges.${index}.title`} /></a>
                  <InlineListControls
                    onMoveUp={index > 0 ? () => setContent((current) => {
                      const next = [...current.challenges];
                      [next[index - 1], next[index]] = [next[index], next[index - 1]];
                      return { ...current, challenges: next };
                    }) : undefined}
                    onMoveDown={index < content.challenges.length - 1 ? () => setContent((current) => {
                      const next = [...current.challenges];
                      [next[index + 1], next[index]] = [next[index], next[index + 1]];
                      return { ...current, challenges: next };
                    }) : undefined}
                    onRemove={() => setContent((current) => ({ ...current, challenges: current.challenges.filter((_, itemIndex) => itemIndex !== index) }))}
                  />
                </h2>
                <EditableText as="p" path={`challenges.${index}.description`} multiline />
                <EditableUrl path={`challenges.${index}.url`} />
              </div>
            </article>
          ))}
        </div>
        {editMode && (
          <button className="cms-add-section" type="button" onClick={() => setContent((current) => ({
            ...current,
            challenges: [{
              id: `challenge-${Date.now()}`,
              rank: 'Rank',
              percentile: 'Top %',
              year: String(new Date().getFullYear()),
              title: 'New Challenge',
              url: 'https://',
              description: 'Challenge result and description.',
            }, ...current.challenges],
          }))}>
            Add challenge
          </button>
        )}
      </InteriorBody>
    </>
  );
}

export function ChallengesContentView({ initialContent }: { initialContent: ChallengesContent }) {
  return (
    <ContentShell pageKey="challenges" initialContent={initialContent}>
      <ChallengesBody />
    </ContentShell>
  );
}
