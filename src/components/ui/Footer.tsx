import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#232a3a] dark:border-[#232a3a] bg-white dark:bg-[#0c0c0c] mt-12 z-10 relative">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center gap-2">
        <span className="font-extrabold tracking-tight text-lg text-[#232a3a] dark:text-[#f8fafc]">Bastian Tapia</span>
        <div className="text-xs font-semibold text-[#232a3a] dark:text-[#f8fafc] tracking-widest uppercase mb-2">Full Stack Developer</div>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-2 text-sm">
          <a href="mailto:bastiantapia.dev@gmail.com" className="text-[#2563eb] dark:text-[#3b82f6] hover:underline">Email</a>
          <span className="text-[#232a3a] dark:text-[#f8fafc] select-none">·</span>
          <a href="https://wa.me/56959800748" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] dark:text-[#3b82f6] hover:underline">WhatsApp</a>
          <span className="text-[#232a3a] dark:text-[#f8fafc] select-none">·</span>
          <a href="https://linkedin.com/in/bastiantapia07" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] dark:text-[#3b82f6] hover:underline">LinkedIn</a>
          <span className="text-[#232a3a] dark:text-[#f8fafc] select-none">·</span>
          <a href="https://github.com/BlackDFCN" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] dark:text-[#3b82f6] hover:underline">GitHub</a>
        </div>
        <div className="text-[#232a3a] dark:text-[#f8fafc] text-xs font-medium tracking-wide mt-2">
          © {new Date().getFullYear()} Bastian Tapia. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
