
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://linkedin.com/in/bastiantapia07',
    label: 'LinkedIn',
    icon: <FaLinkedin size={22} />,
    brand: 'linkedin'
  },
  {
    href: 'https://github.com/BlackDFCN',
    label: 'GitHub',
    icon: <FaGithub size={22} />,
    brand: 'github'
  },
  {
    href: 'mailto:bastiantapia.dev@gmail.com',
    label: 'Email',
    icon: <FaEnvelope size={22} />,
    brand: 'email'
  },
  {
    href: 'https://wa.me/56959800748',
    label: 'WhatsApp',
    icon: <FaWhatsapp size={22} />,
    brand: 'whatsapp'
  }
];
// Sección de contacto: formulario simple y enlaces directos
export default function ContactSection() {
  return (
    <section
      className="relative max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-12 text-center"
      id="contacto"
    >
      {/* Fondo decorativo (opcional, puedes quitar si prefieres fondo plano) */}
      {/* <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-tr from-[#2563eb]/10 via-[#3b82f6]/5 to-transparent blur-2xl opacity-60" />
      </div> */}
      {/* Título principal */}
      <div className="flex flex-col items-center">
        <span className="text-xs md:text-sm text-[#2563eb] tracking-widest mb-3 mt-8 md:mt-0 uppercase font-bold drop-shadow-sm">¡Contáctame!</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-3 drop-shadow-xl tracking-tight break-keep max-w-full text-[#232a3a] dark:text-white">
          <span className="text-[#232a3a] dark:text-white">Contáctame</span> <span className="text-[#2563eb]">Ahora</span>
        </h2>
      </div>
      {/* Descripción */}
      <p className="text-lg md:text-xl text-[#232a3a] dark:text-neutral-100 max-w-2xl mx-auto mb-8 font-semibold leading-relaxed">
        ¿Quieres conversar sobre tu proyecto o tienes alguna duda? Completa el formulario o contáctame directamente.
      </p>
      {/* Formulario de contacto */}
      <form className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto mt-8">
        <div className="w-full flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] dark:text-[#2563eb] font-extrabold shadow focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] focus:bg-[#f0f9ff] dark:focus:bg-neutral-900 placeholder:text-[#2563eb] dark:placeholder:text-[#2563eb] focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] dark:text-[#2563eb] font-extrabold shadow focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] focus:bg-[#f0f9ff] dark:focus:bg-neutral-900 placeholder:text-[#2563eb] dark:placeholder:text-[#2563eb] focus:outline-none"
            required
          />
        </div>
        <textarea
          placeholder="¿En qué puedo ayudarte?"
          className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#2563eb] dark:text-[#2563eb] font-extrabold shadow focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] focus:bg-[#f0f9ff] dark:focus:bg-neutral-900 resize-none placeholder:text-[#2563eb] dark:placeholder:text-[#2563eb] focus:outline-none"
          rows={4}
          required
        />
        <button
          type="submit"
          className="mt-2 px-8 py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-extrabold rounded-2xl shadow-lg text-lg tracking-wide"
          style={{backgroundColor: '#2563eb'}}
        >
          Enviar mensaje
        </button>
      </form>
      {/* Separador visual */}
      <div className="w-full max-w-2xl mx-auto my-8 border-b border-[#2563eb]/30" />
      {/* Botones de redes sociales (igual que Hero) */}
      <div className="flex gap-6 mt-6 justify-center">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className={
              `flex items-center justify-center rounded-full border-2 border-[#2563eb] bg-white dark:bg-neutral-900 w-[44px] h-[44px] text-[#2563eb] shadow`
            }
            title={link.label}
          >
            <span className="text-xl">{link.icon}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
