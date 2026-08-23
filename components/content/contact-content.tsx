'use client';

import { EditableText, EditableUrl } from '@/components/cms/editable';
import { usePageContent } from '@/components/cms/page-content-provider';
import { ContentShell, EditableInteriorHero } from '@/components/content/content-shell';
import type { ContactContent } from '@/lib/site-content';

function ContactBody() {
  const { content } = usePageContent<ContactContent>();

  return (
    <>
      <EditableInteriorHero />
      <section className="interior-content">
        <div className="container contact-layout">
          <div className="contact-panel">
            <div><EditableText as="span" path="emailLabel" /><EditableText as="p" path="email" /></div>
            <div><EditableText as="span" path="telLabel" /><EditableText as="p" path="tel" /></div>
            <div>
              <EditableText as="span" path="affiliationLabel" />
              <p>
                <EditableText path="affiliationLine1" />
                <br />
                <EditableText path="affiliationLine2" />
              </p>
            </div>
            <div>
              <EditableText as="span" path="addressLabel" />
              <p className="contact-address-lines">
                <EditableText as="span" path="addressEn" />
                <EditableText as="span" path="addressKo" />
              </p>
            </div>
          </div>
          <div className="contact-map">
            <EditableText as="h2" path="directionsTitle" />
            <iframe
              title="Sejong Common Campus on Google Maps"
              src={content.mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <EditableUrl path="mapUrl" label="Map URL" />
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactContentView({ initialContent }: { initialContent: ContactContent }) {
  return (
    <ContentShell pageKey="contact" initialContent={initialContent}>
      <ContactBody />
    </ContentShell>
  );
}
