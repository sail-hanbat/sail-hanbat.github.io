'use client';

import { EditableText } from '@/components/cms/editable';

export function SiteFooter() {
  return (
    <footer className="global-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-logo" aria-label="SAIL">
          <EditableText as="strong" path="footer.acronym" />
          <EditableText path="footer.labName" />
        </div>
        <div className="footer-content">
          <address className="footer-address">
            <EditableText path="footer.addressEn" />
            <EditableText path="footer.addressKo" />
            <EditableText path="footer.tel" />
          </address>
        </div>
      </div>
    </footer>
  );
}
