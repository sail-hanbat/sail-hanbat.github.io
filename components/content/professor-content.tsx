'use client';

import Image from 'next/image';
import { EditableImage, EditableText, EditableUrl, InlineListControls } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import { ContentShell, EditableInteriorHero, InteriorBody } from '@/components/content/content-shell';
import type { ProfessorContent } from '@/lib/site-content';

type ListKey = 'education' | 'experience' | 'awards';

function ProfessorList({ listKey, titlePath }: { listKey: ListKey; titlePath: string }) {
  const { content, setContent, editMode } = usePageContent<ProfessorContent>();
  const entries = content[listKey];

  return (
    <section className="professor-section">
      <EditableText as="h2" path={titlePath} />
      <ul className="professor-list">
        {entries.map((entry, index) => (
          <li key={`${entry.title}-${index}`}>
            <EditableText as="strong" path={`${listKey}.${index}.title`} />
            <span>, </span>
            <EditableText path={`${listKey}.${index}.detail`} multiline />
            <InlineListControls
              onMoveUp={index > 0 ? () => setContent((current) => {
                const next = [...current[listKey]];
                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                return { ...current, [listKey]: next };
              }) : undefined}
              onMoveDown={index < entries.length - 1 ? () => setContent((current) => {
                const next = [...current[listKey]];
                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                return { ...current, [listKey]: next };
              }) : undefined}
              onRemove={() => setContent((current) => ({ ...current, [listKey]: current[listKey].filter((_, itemIndex) => itemIndex !== index) }))}
            />
          </li>
        ))}
      </ul>
      {editMode && (
        <button className="cms-add-item" type="button" onClick={() => setContent((current) => ({
          ...current,
          [listKey]: [...current[listKey], { title: 'New entry', detail: 'Details' }],
        }))}>
          Add entry
        </button>
      )}
    </section>
  );
}

function ProfessorBody() {
  const { content } = usePageContent<ProfessorContent>();

  return (
    <>
      <EditableInteriorHero introPath={null} />
      <InteriorBody>
        <div className="profile-layout">
          <EditableImage path="profile.photoPath" alt={content.profile.photoAlt} className="profile-photo" wrapperClassName="profile-photo-shell" />
          <div className="profile-summary">
            <EditableText as="h2" path="profile.name" />
            <EditableText as="p" className="profile-role" path="profile.role" />
            <p>
              <EditableText path="profile.department" />
              <br />
              <EditableText path="profile.university" />
            </p>
            <a className="profile-email" href={`mailto:${content.profile.email}`}><EditableText path="profile.email" /></a>
            <div className="profile-social-links" aria-label="Professional profiles">
              <a href={content.profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <Image src="/icons/linkedin.svg" alt="" width={24} height={24} />
              </a>
              <a href={content.profile.scholarUrl} target="_blank" rel="noreferrer" aria-label="Google Scholar profile">
                <Image src="/icons/google-scholar.svg" alt="" width={24} height={24} />
              </a>
            </div>
            <EditableUrl path="profile.linkedinUrl" label="LinkedIn URL" />
            <EditableUrl path="profile.scholarUrl" label="Scholar URL" />
          </div>
        </div>

        <ProfessorList listKey="education" titlePath="sectionTitles.education" />
        <ProfessorList listKey="experience" titlePath="sectionTitles.experience" />
        <ProfessorList listKey="awards" titlePath="sectionTitles.awards" />
      </InteriorBody>
    </>
  );
}

export function ProfessorContentView({ initialContent }: { initialContent: ProfessorContent }) {
  return (
    <ContentShell pageKey="professor" initialContent={initialContent}>
      <ProfessorBody />
    </ContentShell>
  );
}
