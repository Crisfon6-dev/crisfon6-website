import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/i18n/LanguageProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Cristhian Fonseca | AI Systems Engineer · LATAM',
    template: '%s | Cristhian Fonseca',
  },
  description:
    'Anthropic-certified AI Systems Engineer building agentic systems, MCP workflows, and LLM pipelines at production scale. Weekly AI engineering blueprints with real architecture and working code.',
  keywords: [
    'AI Systems Engineer',
    'Claude Code',
    'Anthropic',
    'AI Engineering LATAM',
    'MCP Agents',
    'Agentic AI',
    'LLM Pipelines',
    'AWS Architect',
    'FinTech',
    'Automation Templates',
    'Building in Public',
  ],
  authors: [{ name: 'Cristhian Fonseca' }],
  openGraph: {
    title: 'Cristhian Fonseca | AI Systems Engineer · LATAM',
    description:
      'Anthropic-certified. I build AI systems that run in production — then I show you how.',
    url: 'https://crisfon6.com',
    siteName: 'crisfon6.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cristhian Fonseca | AI Systems Engineer · LATAM',
    description:
      'Anthropic-certified. I build AI systems that run in production — then I show you how.',
  },
  robots: { index: true, follow: true },
  alternates: {
    types: {
      'application/rss+xml': 'https://crisfon6.com/feed.xml',
      'text/plain': 'https://crisfon6.com/llms.txt',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <TooltipProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Cristhian Fonseca',
            url: 'https://crisfon6.com',
            jobTitle: 'AI Systems Engineer · LATAM',
            email: 'crisfon6@crisfon6.com',
            sameAs: [
              'https://github.com/Crisfon6-dev',
              'https://www.linkedin.com/in/crisfon6/',
              'https://www.instagram.com/crisfon6/',
            ],
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Cristhian Fonseca',
            url: 'https://crisfon6.com',
            description:
              'Anthropic-certified. I build AI systems that run in production — then I show you how.',
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
