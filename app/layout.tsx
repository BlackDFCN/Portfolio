import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: {
    default: "BastianDev - Home",
    template: "BastianDev - %s"
  },
  description:
    "Portfolio profesional con proyectos Full Stack, arquitectura y soluciones de alto rendimiento.",
  metadataBase: new URL("https://bastiandev.com"),
  openGraph: {
    title: "BastianDev - Home",
    description:
      "Portfolio profesional con proyectos Full Stack, arquitectura y soluciones de alto rendimiento.",
    type: "website",
    locale: "es_CL"
  },
  twitter: {
    card: "summary_large_image"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  if (stored === 'light' || stored === 'dark') {
                    const isDark = stored === 'dark';
                    document.documentElement.classList.toggle('dark', isDark);
                    document.body.classList.toggle('dark', isDark);
                    document.documentElement.style.colorScheme = stored;
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.body.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })()
            `
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body className="min-h-screen min-h-[100dvh] flex flex-col">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded"
        >
          Saltar al contenido principal
        </a>
        <ScrollReveal />
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
