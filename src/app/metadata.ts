import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bastián Tapia | Senior Full Stack Developer — Portfolio',
  description:
    'Portfolio profesional de Bastián Tapia, Ingeniero en Informática y Senior Full Stack Developer. Especialista en Arquitecturas SaaS, NestJS, React, Next.js y Cloud (GCP/Docker).',
  keywords: [
    'Bastián Tapia',
    'Senior Full Stack Developer',
    'Desarrollador Web Freelance',
    'Ingeniero de Software',
    'SaaS',
    'TypeScript',
    'Next.js',
    'NestJS',
    'GCP',
    'Docker',
    'Portfolio',
    'Chile',
  ],
  authors: [{ name: 'Bastián Tapia' }],
  openGraph: {
    title: 'Bastián Tapia | Senior Full Stack Developer',
    description:
      'Construcción de arquitecturas SaaS multi-tenant, automatizaciones complejas y sistemas web escalables con React, NestJS y GCP.',
    type: 'website',
    locale: 'es_CL',
    siteName: 'Bastián Tapia Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bastián Tapia | Full Stack Developer',
    description:
      'Desarrollo productos digitales robustos, escalables y seguros.',
  },
  robots: {
    index: true,
    follow: true,
  },
};
