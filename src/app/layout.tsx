"use client";
import React from 'react';
import '../styles/globals.css';
import Header from '@/components/ui/Header';
import GlobalBackground from '@/components/ui/GlobalBackground';
import { Footer } from '@/components/ui/Footer';
import { ThemeProvider } from '@/hooks/useTheme';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Remove hash from URL after scrolling to section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        // Scroll to the element with offset for sticky header
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Remove hash from URL without reloading
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Bastián Tapia | Senior Full Stack Developer — Portfolio</title>
        <meta name="description" content="Portfolio profesional de Bastián Tapia, Ingeniero en Informática y Senior Full Stack Developer. Especialista en Arquitecturas SaaS, NestJS, React, Next.js y Cloud (GCP)." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Bastián Tapia" />
        <meta property="og:title" content="Bastián Tapia | Senior Full Stack Developer" />
        <meta property="og:description" content="Construcción de arquitecturas SaaS multi-tenant, automatizaciones complejas y sistemas web escalables con React, NestJS y GCP." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_CL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bastián Tapia | Senior Full Stack Developer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
            <GlobalBackground />
          </div>
          <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main className="w-full px-4 sm:px-6 md:px-8" style={{ flex: 1 }}>{children}</main>
            <Footer />
            <WhatsAppBubble />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
