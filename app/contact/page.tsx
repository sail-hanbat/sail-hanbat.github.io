import type { Metadata } from 'next';
import { SectionPage } from '@/components/section-page';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <SectionPage eyebrow="Contact" title="Contact SAIL" intro="Research, student, and collaboration inquiries are welcome.">
      <div className="contact-panel">
        <div><span>Professor</span><p>Jaesin Ahn, Assistant Professor</p></div>
        <div><span>Email</span><a href="mailto:ajs0420@hanbat.ac.kr">ajs0420@hanbat.ac.kr</a></div>
        <div>
          <span>Affiliation</span>
          <p>
            <a href="https://hanbat.ac.kr/aisw/" target="_blank" rel="noreferrer">Department of Artificial Intelligence Software</a><br />
            <a href="https://www.hanbat.ac.kr/" target="_blank" rel="noreferrer">Hanbat National University</a>
          </p>
        </div>
        <div>
          <span>Address</span>
          <p>304, Building 8, Sejong Common Campus<br />109, Jiphyeonbuk-ro, Sejong, Republic of Korea</p>
        </div>
        <div><span>주소</span><p lang="ko">세종특별자치시 집현북로 109<br />세종공동캠퍼스 8동 304호</p></div>
      </div>
    </SectionPage>
  );
}
