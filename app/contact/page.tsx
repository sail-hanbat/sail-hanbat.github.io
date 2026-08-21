import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <SectionPage eyebrow="Contact" title="Contact SAIL" intro="Research, student, and collaboration inquiries are welcome.">
      <div className="contact-panel">
        <div><span>Email</span><a href="mailto:amoeba04@gmail.com">amoeba04@gmail.com</a></div>
        <div><span>Affiliation</span><p>Department of Artificial Intelligence Software<br />Hanbat National University</p></div>
        <div><span>Location</span><p>Sejong Joint Campus<br />Sejong, Republic of Korea</p></div>
      </div>
    </SectionPage>
  );
}
