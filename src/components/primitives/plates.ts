/**
 * One still per page, cut from the same 28 s film as the home page so every route shares its world.
 * Versioned names (`-v1`) let `/plates/*` be cached for a year; each file stays under 150,000 bytes.
 */
export const PLATES = {
  about: '/plates/plate-about-v1.webp',
  experience: '/plates/plate-experience-v1.webp',
  projects: '/plates/plate-projects-v1.webp',
  automations: '/plates/plate-automations-v1.webp',
  blog: '/plates/plate-blog-v1.webp',
  newsletter: '/plates/plate-newsletter-v1.webp',
  work: '/plates/plate-work-v1.webp',
} as const;

export type PlateId = keyof typeof PLATES;
