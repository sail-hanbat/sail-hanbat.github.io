import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="global-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-logo" aria-label="SAIL">
          <strong>SAIL</strong>
          <span>Safe &amp; Applied Intelligence Lab</span>
        </div>
        <div className="footer-content">
          <nav className="footer-top-links" aria-label="Laboratory links">
            <Link href="/research/">Research</Link>
            <Link href="/members/professor/">Members</Link>
            <Link href="/publications/international/">Publications</Link>
            <Link href="/activities/news/">News</Link>
            <Link href="/contact/">Contact</Link>
          </nav>
          <nav className="footer-bottom-links" aria-label="University links">
            <a href="https://www.hanbat.ac.kr/" target="_blank" rel="noreferrer">Hanbat National University</a>
            <a href="https://www.hanbat.ac.kr/aisw/" target="_blank" rel="noreferrer">Department of Artificial Intelligence Software</a>
          </nav>
          <p className="vcard">
            Sejong Joint Campus · Sejong, Republic of Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
