import type { Metadata } from 'next';
import { StudentsContentView } from '@/components/content/students-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_STUDENTS_CONTENT, type StudentsContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Students' };

export default async function StudentsPage() {
  const content = await getBuildPageContent<StudentsContent>('students', DEFAULT_STUDENTS_CONTENT);
  return <StudentsContentView initialContent={content} />;
}
