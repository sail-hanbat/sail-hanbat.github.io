'use client';

import Link from 'next/link';
import { EditableImage, EditableText } from '@/components/cms/editable';

const dropdowns = [
  {
    labelPath: 'nav.members',
    items: [
      { labelPath: 'nav.professor', href: '/members/professor/' },
      { labelPath: 'nav.students', href: '/members/students/' },
    ],
  },
  {
    labelPath: 'nav.publications',
    items: [
      { labelPath: 'nav.international', href: '/publications/international/' },
      { labelPath: 'nav.domestic', href: '/publications/domestic/' },
    ],
  },
  {
    labelPath: 'nav.activities',
    items: [
      { labelPath: 'nav.challenges', href: '/activities/challenges/' },
      { labelPath: 'nav.lectures', href: '/activities/lectures/' },
      { labelPath: 'nav.news', href: '/activities/news/' },
    ],
  },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`header-main${overlay ? ' header-overlay' : ' header-inner'}`}>
      <div className="navbar">
        <div className="container nav-container">
          <Link className="wordmark" href="/" aria-label="SAIL home">
            <EditableImage path="logoPath" alt="" className="wordmark-image" wrapperClassName="wordmark-image-shell" />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/"><EditableText path="nav.home" /></Link>
            <div className="nav-item nav-dropdown">
              <button className="nav-trigger" type="button" aria-haspopup="true">
                <EditableText path={dropdowns[0].labelPath} />
              </button>
              <div className="dropdown-menu">
                {dropdowns[0].items.map((item) => (
                  <Link href={item.href} key={item.href}><EditableText path={item.labelPath} /></Link>
                ))}
              </div>
            </div>
            <Link href="/research/"><EditableText path="nav.research" /></Link>
            <div className="nav-item nav-dropdown">
              <button className="nav-trigger" type="button" aria-haspopup="true">
                <EditableText path={dropdowns[1].labelPath} />
              </button>
              <div className="dropdown-menu">
                {dropdowns[1].items.map((item) => (
                  <Link href={item.href} key={item.href}><EditableText path={item.labelPath} /></Link>
                ))}
              </div>
            </div>
            <div className="nav-item nav-dropdown">
              <button className="nav-trigger" type="button" aria-haspopup="true">
                <EditableText path={dropdowns[2].labelPath} />
              </button>
              <div className="dropdown-menu">
                {dropdowns[2].items.map((item) => (
                  <Link href={item.href} key={item.href}><EditableText path={item.labelPath} /></Link>
                ))}
              </div>
            </div>
            <Link href="/contact/"><EditableText path="nav.contact" /></Link>
          </nav>

          <details className="mobile-nav">
            <summary aria-label="Toggle navigation">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              <Link href="/"><EditableText path="nav.home" /></Link>
              <details className="mobile-subnav">
                <summary><EditableText path={dropdowns[0].labelPath} /></summary>
                <div>{dropdowns[0].items.map((item) => <Link href={item.href} key={item.href}><EditableText path={item.labelPath} /></Link>)}</div>
              </details>
              <Link href="/research/"><EditableText path="nav.research" /></Link>
              <details className="mobile-subnav">
                <summary><EditableText path={dropdowns[1].labelPath} /></summary>
                <div>{dropdowns[1].items.map((item) => <Link href={item.href} key={item.href}><EditableText path={item.labelPath} /></Link>)}</div>
              </details>
              <details className="mobile-subnav">
                <summary><EditableText path={dropdowns[2].labelPath} /></summary>
                <div>{dropdowns[2].items.map((item) => <Link href={item.href} key={item.href}><EditableText path={item.labelPath} /></Link>)}</div>
              </details>
              <Link href="/contact/"><EditableText path="nav.contact" /></Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
