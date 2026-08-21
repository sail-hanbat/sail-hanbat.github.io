import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sail-hanbat.github.io'),
  title: {
    default: 'SAIL | Safe & Applied Intelligence Lab',
    template: '%s | SAIL',
  },
  description:
    'Safe & Applied Intelligence Lab at Hanbat National University. Research in AI safety, mechanistic interpretability, machine unlearning, and trustworthy applied AI.',
  keywords: [
    'SAIL',
    'Safe and Applied Intelligence Lab',
    'Hanbat National University',
    'AI Safety',
    'Mechanistic Interpretability',
    'Machine Unlearning',
    'Trustworthy AI',
  ],
  authors: [{ name: 'SAIL, Hanbat National University' }],
  openGraph: {
    title: 'SAIL | Safe & Applied Intelligence Lab',
    description:
      'Applied intelligence, built to be safe. Research at Hanbat National University, Sejong Joint Campus.',
    url: 'https://sail-hanbat.github.io',
    siteName: 'SAIL',
    type: 'website',
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
