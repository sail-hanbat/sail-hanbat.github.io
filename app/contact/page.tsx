import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <SectionPage eyebrow="Contact" title="Contact SAIL" intro="Research, student, and collaboration inquiries are welcome.">
      <div className="contact-layout">
        <div className="contact-panel">
          <div><span>Email</span><p>ajs0420@hanbat.ac.kr</p></div>
          <div><span>Tel</span><p>044-863-9268</p></div>
          <div>
            <span>Affiliation</span>
            <p>
              Department of Artificial Intelligence Software
              <br />
              Hanbat National University
            </p>
          </div>
          <div>
            <span>Address</span>
            <p className="contact-address-lines">
              <span lang="en">304, Building 8, Sejong Common Campus, 109, Jiphyeonbuk-ro, Sejong, Republic of Korea</span>
              <span lang="ko">세종특별자치시 집현북로 109, 세종공동캠퍼스 8동 304호</span>
            </p>
          </div>
        </div>
        <div className="contact-map">
          <h2>Directions</h2>
          <iframe
            title="Sejong Common Campus on Google Maps"
            src="https://maps.google.com/maps?q=%EC%84%B8%EC%A2%85%EA%B3%B5%EB%8F%99%EC%BA%A0%ED%8D%BC%EC%8A%A4&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </SectionPage>
  );
}
