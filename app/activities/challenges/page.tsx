import type { Metadata } from 'next';
import { ChallengesContentView } from '@/components/content/challenges-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_CHALLENGES_CONTENT, type ChallengesContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Challenges' };

export default async function ChallengesPage() {
  const content = await getBuildPageContent<ChallengesContent>('challenges', DEFAULT_CHALLENGES_CONTENT);
  return <ChallengesContentView initialContent={content} />;
}
