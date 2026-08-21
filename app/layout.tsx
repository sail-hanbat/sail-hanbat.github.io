import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sail-hanbat.github.io'),
  title: {
    default: 'SAIL | Safe & Applied Intelligence Lab',
    template: '%s | SAIL',
  },
  description:
    'Safe & Applied Intelligence Lab. Research in trustworthy AI and practical AI for real-world domains.',
  keywords: [
    'SAIL',
    'Safe and Applied Intelligence Lab',
    'Hanbat National University',
    'AI Safety',
    'Mechanistic Interpretability',
    'Machine Unlearning',
    'Trustworthy AI',
    'AI for Real-World Domains',
    'Practical AI',
  ],
  authors: [{ name: 'SAIL, Hanbat National University' }],
  openGraph: {
    title: 'SAIL | Safe & Applied Intelligence Lab',
    description:
      'Trustworthy AI and practical AI for real-world domains.',
    url: 'https://sail-hanbat.github.io',
    siteName: 'SAIL',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'SAIL — Safe & Applied Intelligence Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAIL | Safe & Applied Intelligence Lab',
    description: 'Trustworthy AI and practical AI for real-world domains.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
