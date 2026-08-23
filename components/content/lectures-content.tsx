'use client';

import { EditableText, InlineListControls } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { LecturesContent } from '@/lib/site-content';

function LecturesBody() {
  const { content, setContent, editMode } = usePageContent<LecturesContent>();

  return (
    <>
      <EditableInteriorHero introPath={null} />
      <InteriorBody>
        {content.terms.map((term, termIndex) => (
          <section key={term.id} className="lecture-term">
            <h2>
              <EditableText path={`terms.${termIndex}.title`} />
              <InlineListControls
                onMoveUp={termIndex > 0 ? () => setContent((current) => {
                  const next = [...current.terms];
                  [next[termIndex - 1], next[termIndex]] = [next[termIndex], next[termIndex - 1]];
                  return { ...current, terms: next };
                }) : undefined}
                onMoveDown={termIndex < content.terms.length - 1 ? () => setContent((current) => {
                  const next = [...current.terms];
                  [next[termIndex + 1], next[termIndex]] = [next[termIndex], next[termIndex + 1]];
                  return { ...current, terms: next };
                }) : undefined}
                onRemove={() => setContent((current) => ({
                  ...current,
                  terms: current.terms.filter((_, index) => index !== termIndex),
                }))}
              />
            </h2>
            <ul>
              {term.courses.map((course, courseIndex) => (
                <li key={`${term.id}-${courseIndex}`}>
                  <EditableText path={`terms.${termIndex}.courses.${courseIndex}`} />
                  <InlineListControls
                    onMoveUp={courseIndex > 0 ? () => setContent((current) => {
                      const nextTerms = [...current.terms];
                      const courses = [...nextTerms[termIndex].courses];
                      [courses[courseIndex - 1], courses[courseIndex]] = [courses[courseIndex], courses[courseIndex - 1]];
                      nextTerms[termIndex] = { ...nextTerms[termIndex], courses };
                      return { ...current, terms: nextTerms };
                    }) : undefined}
                    onMoveDown={courseIndex < term.courses.length - 1 ? () => setContent((current) => {
                      const nextTerms = [...current.terms];
                      const courses = [...nextTerms[termIndex].courses];
                      [courses[courseIndex + 1], courses[courseIndex]] = [courses[courseIndex], courses[courseIndex + 1]];
                      nextTerms[termIndex] = { ...nextTerms[termIndex], courses };
                      return { ...current, terms: nextTerms };
                    }) : undefined}
                    onAdd={() => setContent((current) => {
                      const nextTerms = [...current.terms];
                      const courses = [...nextTerms[termIndex].courses];
                      courses.splice(courseIndex + 1, 0, 'New course');
                      nextTerms[termIndex] = { ...nextTerms[termIndex], courses };
                      return { ...current, terms: nextTerms };
                    })}
                    onRemove={() => setContent((current) => {
                      const nextTerms = [...current.terms];
                      nextTerms[termIndex] = {
                        ...nextTerms[termIndex],
                        courses: nextTerms[termIndex].courses.filter((_, index) => index !== courseIndex),
                      };
                      return { ...current, terms: nextTerms };
                    })}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
        {editMode && (
          <button className="cms-add-section" type="button" onClick={() => setContent((current) => ({
            ...current,
            terms: [...current.terms, { id: `term-${Date.now()}`, title: 'New Term', courses: ['New course'] }],
          }))}>
            Add term
          </button>
        )}
      </InteriorBody>
    </>
  );
}

export function LecturesContentView({ initialContent }: { initialContent: LecturesContent }) {
  return (
    <ContentShell pageKey="lectures" initialContent={initialContent}>
      <LecturesBody />
    </ContentShell>
  );
}
