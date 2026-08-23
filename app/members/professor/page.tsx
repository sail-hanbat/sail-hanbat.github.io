import type { Metadata } from 'next';
import { ProfessorContentView } from '@/components/content/professor-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_PROFESSOR_CONTENT, type ProfessorContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Professor' };

export default async function ProfessorPage() {
  const content = await getBuildPageContent<ProfessorContent>('professor', DEFAULT_PROFESSOR_CONTENT);
  return <ProfessorContentView initialContent={content} />;
}
