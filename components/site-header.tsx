import Link from 'next/link';

const dropdowns = [
  {
    label: 'Members',
    items: [
      { label: 'Professor', href: '/members/professor/' },
      { label: 'Students', href: '/members/students/' },
    ],
  },
  {
    label: 'Publications',
    items: [
      { label: 'International', href: '/publications/international/' },
      { label: 'Domestic', href: '/publications/domestic/' },
    ],
  },
  {
    label: 'Activities',
    items: [
      { label: 'Challenges', href: '/activities/challenges/' },
      { label: 'Lectures', href: '/activities/lectures/' },
      { label: 'News', href: '/activities/news/' },
    ],
  },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`header-main${overlay ? ' header-overlay' : ' header-inner'}`}>
      <div className="navbar">
        <div className="container nav-container">
          <Link className="wordmark" href="/" aria-label="SAIL home">
            <span className="wordmark-symbol" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="wordmark-copy">
              <strong>SAIL</strong>
              <small>Safe &amp; Applied<br />Intelligence Lab</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <div className="nav-item nav-dropdown">
              <button className="nav-trigger" type="button" aria-haspopup="true">
                Members
              </button>
              <div className="dropdown-menu">
                {dropdowns[0].items.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </div>
            </div>
            <Link href="/research/">Research</Link>
            <div className="nav-item nav-dropdown">
              <button className="nav-trigger" type="button" aria-haspopup="true">
                Publications
              </button>
              <div className="dropdown-menu">
                {dropdowns[1].items.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </div>
            </div>
            <div className="nav-item nav-dropdown">
              <button className="nav-trigger" type="button" aria-haspopup="true">
                Activities
              </button>
              <div className="dropdown-menu">
                {dropdowns[2].items.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </div>
            </div>
            <Link href="/contact/">Contact</Link>
          </nav>

          <details className="mobile-nav">
            <summary aria-label="Toggle navigation">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              <Link href="/">Home</Link>
              <details className="mobile-subnav">
                <summary>Members</summary>
                <div>{dropdowns[0].items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
              </details>
              <Link href="/research/">Research</Link>
              <details className="mobile-subnav">
                <summary>Publications</summary>
                <div>{dropdowns[1].items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
              </details>
              <details className="mobile-subnav">
                <summary>Activities</summary>
                <div>{dropdowns[2].items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
              </details>
              <Link href="/contact/">Contact</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
