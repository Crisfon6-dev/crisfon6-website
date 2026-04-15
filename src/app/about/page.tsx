import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Cristhian Fonseca — Technical Lead with 4+ years building cloud-native FinTech platforms at scale and AI automation systems.',
};

export default function About() {
  return <AboutContent />;
}
