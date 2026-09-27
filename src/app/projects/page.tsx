import type { Metadata } from 'next';
import { ProjectsContent } from '@/components/pages/ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'FinTech and banking platforms in production, cloud infrastructure for a US platform, and AI agents that run on real data — each tied to the employer, period and role.',
};

export default function Projects() {
  return <ProjectsContent />;
}
