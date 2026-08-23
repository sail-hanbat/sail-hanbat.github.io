import type { Metadata } from 'next';
import { ContactContentView } from '@/components/content/contact-content';
import { getBuildPageContent } from '@/lib/content-repository';
import { DEFAULT_CONTACT_CONTENT, type ContactContent } from '@/lib/site-content';

export const metadata: Metadata = { title: 'Contact' };

export default async function ContactPage() {
  const content = await getBuildPageContent<ContactContent>('contact', DEFAULT_CONTACT_CONTENT);
  return <ContactContentView initialContent={content} />;
}
