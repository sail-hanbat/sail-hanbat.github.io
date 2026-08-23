import { HomeContentView } from '@/components/content/home-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_HOME_CONTENT, type HomeContent } from '@/lib/site-content';

export default async function Home() {
  const content = await getBuildPageContent<HomeContent>('home', DEFAULT_HOME_CONTENT);
  return <HomeContentView initialContent={content} />;
}
