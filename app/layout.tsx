import "./globals.css";

import type { Metadata } from "next";
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
    default: "BastianDev | Portfolio Profesional",
    template: "%s | BastianDev"
  },
  description:
    "Portfolio profesional con proyectos Full Stack, arquitectura y soluciones de alto rendimiento.",
  metadataBase: new URL("https://bastiandev.com"),
  openGraph: {
    title: "BastianDev | Portfolio Profesional",
    description:
      "Portfolio profesional con proyectos Full Stack, arquitectura y soluciones de alto rendimiento.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
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
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                      document.documentElement.classList.add('dark');
                      document.body.classList.add('dark');
                      document.documentElement.style.colorScheme = 'dark';
                    }
                  }
                } catch (e) {}
              })()
            `
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ScrollReveal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
