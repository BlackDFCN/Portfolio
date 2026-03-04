import { FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-[#232a3a]/10 dark:border-[#232a3a]/30 bg-white dark:bg-[#0c0c0c] mt-12 z-10 relative">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Izquierda: Nombre y rol en dos líneas */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <span className="font-extrabold tracking-tight text-lg text-[#232a3a] dark:text-[#f8fafc]">Bastian Tapia</span>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-widest uppercase">Full Stack Developer</span>
        </div>
        {/* Separador vertical para escritorio */}
        <div className="hidden md:block h-10 w-px bg-gray-200 dark:bg-gray-700 mx-6" />
        {/* Centro: Redes sociales */}
        <div className="flex items-center justify-center gap-5 md:w-1/3">
          <a href="https://linkedin.com/in/bastiantapia07" target="_blank" rel="noopener noreferrer" className="text-gray-400" title="LinkedIn">
            <FaLinkedin className="text-xl" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/BlackDFCN" target="_blank" rel="noopener noreferrer" className="text-gray-400" title="GitHub">
            <FaGithub className="text-xl" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="mailto:bastiantapia.dev@gmail.com" className="text-gray-400" title="Email">
            <FaEnvelope className="text-xl" />
            <span className="sr-only">Email</span>
          </a>
          <a href="https://wa.me/56959800748" target="_blank" rel="noopener noreferrer" className="text-gray-400" title="WhatsApp">
            <FaWhatsapp className="text-xl" />
            <span className="sr-only">WhatsApp</span>
          </a>
        </div>
        {/* Separador vertical para escritorio */}
        <div className="hidden md:block h-10 w-px bg-gray-200 dark:bg-gray-700 mx-6" />
        {/* Derecha: Copyright */}
        <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wide text-center md:text-right md:w-1/3 border-t border-gray-100 dark:border-gray-800 pt-2 md:border-0 md:pt-0">
          <span>© {new Date().getFullYear()} Bastian Tapia.</span><br />
          <span>Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
