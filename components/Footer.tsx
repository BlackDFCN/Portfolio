import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-white/10 dark:bg-[#0c0c0c]">
      <div className="section-container py-6">
        <div className="flex flex-col items-center gap-4 text-center text-[clamp(11px,0.9vw,12px)] font-medium uppercase tracking-[0.16em] text-gray-400 sm:flex-row sm:justify-between sm:text-left sm:tracking-[0.2em]">
          <Link className="flex items-center gap-2" href="/">
            <span className="relative h-5 w-5">
              <Image
                src="/icon-negro.svg"
                alt="BastianDev"
                width={20}
                height={20}
                className="block dark:hidden"
              />
              <Image
                src="/icon-blanco.svg"
                alt="BastianDev"
                width={20}
                height={20}
                className="hidden dark:block"
              />
            </span>
            <span className="text-black dark:text-white">BASTIANDEV</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Link className="footer-social-link" href="https://wa.me/56959800748" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </Link>
            <span className="select-none text-gray-200 dark:text-white/10">·</span>
            <Link className="footer-social-link" href="https://linkedin.com/in/bastiantapia07" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
            <span className="select-none text-gray-200 dark:text-white/10">·</span>
            <Link className="footer-social-link" href="https://github.com/BlackDFCN" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </div>
          <span>(c) 2026 Bastian Tapia. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
