import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Lectures' };

export default function LecturesPage() {
  return (
    <SectionPage title="Lectures">
      <section>
        <h2>2026 Fall</h2>
        <ul>
          <li>Operating Systems (Undergraduate)</li>
          <li>Discrete Mathematics (Undergraduate)</li>
        </ul>
      </section>
    </SectionPage>
  );
}
