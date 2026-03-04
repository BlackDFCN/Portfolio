import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer
      className="border-t border-[#232a3a]/10 dark:border-[#232a3a]/30 bg-white dark:bg-[#0c0c0c] mt-12 z-10 relative w-full"
      aria-label="Pie de página"
    >
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Izquierda: Nombre y rol en dos líneas */}
        <div className="flex flex-col items-center md:items-start flex-1 min-w-0">
          <span className="font-extrabold tracking-tight text-base sm:text-lg text-[#232a3a] dark:text-[#f8fafc]">Bastian Tapia</span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase">Full Stack Developer</span>
        </div>
        {/* Separador vertical solo en desktop, oculto en mobile */}
        <div className="hidden md:block h-10 w-px bg-gray-200 dark:bg-gray-700 mx-6" aria-hidden="true" />
        {/* Centro: Redes sociales */}
        <div className="flex items-center justify-center gap-4 flex-1 min-w-0">
          <a
            href="https://linkedin.com/in/bastiantapia07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded transition"
            title="LinkedIn"
            aria-label="LinkedIn"
            tabIndex={0}
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="https://github.com/BlackDFCN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#232a3a] focus:outline-none focus:ring-2 focus:ring-[#232a3a] rounded transition"
            title="GitHub"
            aria-label="GitHub"
            tabIndex={0}
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="mailto:bastiantapia.dev@gmail.com"
            className="text-gray-500 hover:text-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded transition"
            title="Email"
            aria-label="Email"
            tabIndex={0}
          >
            <FaEnvelope className="text-xl" />
          </a>
          <a
            href="https://wa.me/56959800748"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 rounded transition"
            title="WhatsApp"
            aria-label="WhatsApp"
            tabIndex={0}
          >
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
        {/* Separador vertical solo en desktop, oculto en mobile */}
        <div className="hidden md:block h-10 w-px bg-gray-200 dark:bg-gray-700 mx-6" aria-hidden="true" />
        {/* Derecha: Copyright */}
        <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium tracking-wide text-center md:text-right flex-1 min-w-0 border-t border-gray-100 dark:border-gray-800 pt-2 md:border-0 md:pt-0">
          <span>© {new Date().getFullYear()} Bastian Tapia.</span><br />
          <span>Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
