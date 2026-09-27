import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/i18n/LanguageProvider';

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

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
    default: 'Cristhian Fonseca | Technical Lead · AI Systems · LATAM',
    template: '%s | Cristhian Fonseca',
  },
  description:
    'Technical Lead with 5+ years building cloud-native FinTech and banking platforms, and AI agents that run in production. Weekly AI engineering blueprints with real architecture and working code.',
  keywords: [
    'Technical Lead',
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
    title: 'Cristhian Fonseca | Technical Lead · AI Systems · LATAM',
    description:
      'Anthropic-certified. I build AI systems that run in production — then I show you how.',
    url: 'https://crisfon6.com',
    siteName: 'crisfon6.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cristhian Fonseca | Technical Lead · AI Systems · LATAM',
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
        <ThemeProvider attribute="class" defaultTheme="light">
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
            '@id': 'https://crisfon6.com/#person',
            name: 'Cristhian Fonseca',
            alternateName: 'Cristhian Javier Delgado Fonseca',
            url: 'https://crisfon6.com',
            jobTitle: 'Technical Lead',
            email: 'mailto:crisfon6@crisfon6.com',
            address: { '@type': 'PostalAddress', addressCountry: 'CO' },
            worksFor: { '@type': 'Organization', name: 'Prosperas' },
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Universidad Autónoma de Bucaramanga',
            },
            hasCredential: [
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'Claude Code in Action',
                recognizedBy: { '@type': 'Organization', name: 'Anthropic' },
                dateCreated: '2026-02',
              },
              {
                '@type': 'EducationalOccupationalCredential',
                name: 'AWS Partner: Accreditation (Technical)',
                recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
                dateCreated: '2020-07',
              },
            ],
            knowsAbout: [
              'AWS',
              'AWS CDK',
              'Model Context Protocol',
              'LLM agents',
              'Claude API',
              'FastAPI',
              'Angular',
              'Java Spring Boot',
              'PostgreSQL',
              'FinTech',
            ],
            sameAs: [
              'https://www.linkedin.com/in/crisfon6/',
              'https://github.com/Crisfon6-dev',
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
        {plausibleDomain ? (
          <Script
            src="https://plausible.io/js/script.js"
            data-domain={plausibleDomain}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
