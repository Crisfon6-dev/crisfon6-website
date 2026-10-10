import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Cristhian Fonseca — Technical Lead with 5+ years building cloud-native FinTech and banking platforms, and AI agents that run in production.',
};

export default function About() {
  return <AboutContent />;
}
