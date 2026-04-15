import type { Metadata } from 'next';
import { WorkWithMeContent } from '@/components/pages/WorkWithMeContent';

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Connect with Cristhian Fonseca — Technical Lead shipping FinTech at scale and building AI automations in public. Open to strategic conversations, collaboration, and leadership opportunities.',
};

export default function WorkWithMe() {
  return <WorkWithMeContent />;
}
