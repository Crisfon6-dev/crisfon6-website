import type { Metadata } from 'next';
import { AutomationsContent } from '@/components/pages/AutomationsContent';

export const metadata: Metadata = {
  title: 'Automations',
  description:
    'Free production-ready AI automation templates with architecture diagrams, deployment guides, cost breakdowns, and working code.',
};

export default function Automations() {
  return <AutomationsContent />;
}
