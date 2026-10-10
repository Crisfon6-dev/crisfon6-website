import type { Metadata } from 'next';
import { NewsletterContent } from '@/components/pages/NewsletterContent';

export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    'PowerAI — Production blueprints from systems that actually run: architecture diagrams, deployment guides, cost breakdowns, and working code.',
};

export default function Newsletter() {
  return <NewsletterContent />;
}
