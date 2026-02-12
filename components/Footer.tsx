import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="section-container py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
          <Link className="flex items-center gap-1 text-black" href="/">
            BASTIANDEV <span className="text-gray-300">&lt;/&gt;</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="footer-social-link" href="https://wa.me/56959800748" target="_blank">
              WhatsApp
            </Link>
            <span className="select-none text-gray-200">·</span>
            <Link className="footer-social-link" href="https://linkedin.com/in/bastiantapia07" target="_blank">
              LinkedIn
            </Link>
            <span className="select-none text-gray-200">·</span>
            <Link className="footer-social-link" href="https://github.com/BlackDFCN" target="_blank">
              GitHub
            </Link>
          </div>
          <span>(c) 2026 Bastian Tapia. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
