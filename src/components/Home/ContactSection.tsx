"use client";

import { useState, FormEvent } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

// Enlaces sociales para contacto directo
const socialLinks = [
  {
    href: 'https://linkedin.com/in/bastiantapia07',
    label: 'LinkedIn',
    icon: <FaLinkedin size={22} />,
    brand: 'linkedin',
  },
  {
    href: 'https://github.com/BlackDFCN',
    label: 'GitHub',
    icon: <FaGithub size={22} />,
    brand: 'github',
  },
  {
    href: 'mailto:bastiantapia.dev@gmail.com',
    label: 'Email',
    icon: <FaEnvelope size={22} />,
    brand: 'email',
  },
  {
    href: 'https://wa.me/56959800748',
    label: 'WhatsApp',
    icon: <FaWhatsapp size={22} />,
    brand: 'whatsapp',
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const form = e.target as HTMLFormElement;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      honeypot: (form.elements.namedItem('honeypot') as HTMLInputElement)?.value || "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok) {
        setFormState('sent');
        form.reset();
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        console.error("API error:", data);
        setFormState('error');
        setTimeout(() => setFormState('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section
      id="contacto"
      className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 z-10"
      aria-labelledby="contacto-title"
    >
      <div className="mb-6 md:mb-8 text-center">
        <span className="text-sm md:text-base text-[#2563eb] tracking-widest mb-3 uppercase font-semibold drop-shadow-sm">¡Contáctame!</span>
        <h2 id="contacto-title" className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#232a3a] dark:text-white mb-3 drop-shadow-lg">
          Contáctame <span className="text-[#2563eb]">Ahora</span>
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-[#232a3a] dark:text-neutral-300 max-w-3xl mx-auto mb-6 sm:mb-8 font-semibold leading-relaxed">
          ¿Tienes un <span className="text-[#2563eb] font-bold">proyecto</span> en mente o necesitas <span className="text-[#2563eb] font-bold">asesoría</span>? Estoy disponible para conversar y ayudarte a alcanzar tus metas.
        </p>
      </div>
      {/* Formulario de contacto accesible y mobile first */}
      <form
        className="flex flex-col gap-3 sm:gap-4 items-center w-full max-w-2xl mx-auto mt-6 sm:mt-8"
        aria-label="Formulario de contacto"
        onSubmit={handleSubmit}
      >
        <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
          <label htmlFor="contact-nombre" className="sr-only">Nombre</label>
          <input
            id="contact-nombre"
            name="name"
            type="text"
            placeholder="Nombre"
            className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#232a3a] dark:text-[#f8fafc] font-extrabold shadow focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] focus:bg-[#f0f9ff] dark:focus:bg-neutral-900 placeholder:text-[#2563eb]/50 dark:placeholder:text-[#2563eb]/50 focus:outline-none text-xs sm:text-base transition-all"
            required
            aria-label="Nombre"
            autoComplete="name"
            disabled={formState === 'sending'}
          />
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email"
            className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#232a3a] dark:text-[#f8fafc] font-extrabold shadow focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] focus:bg-[#f0f9ff] dark:focus:bg-neutral-900 placeholder:text-[#2563eb]/50 dark:placeholder:text-[#2563eb]/50 focus:outline-none text-xs sm:text-base transition-all"
            required
            aria-label="Email"
            autoComplete="email"
            disabled={formState === 'sending'}
          />
        </div>
        <label htmlFor="contact-mensaje" className="sr-only">Mensaje</label>
        <textarea
          id="contact-mensaje"
          name="message"
          placeholder="¿En qué puedo ayudarte?"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-[#2563eb] text-[#232a3a] dark:text-[#f8fafc] font-extrabold shadow focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] focus:bg-[#f0f9ff] dark:focus:bg-neutral-900 resize-none placeholder:text-[#2563eb]/50 dark:placeholder:text-[#2563eb]/50 focus:outline-none text-xs sm:text-base transition-all"
          rows={4}
          required
          aria-label="Mensaje"
          disabled={formState === 'sending'}
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 sm:px-8 sm:py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-extrabold rounded-2xl shadow-lg text-xs sm:text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Enviar mensaje"
          disabled={formState === 'sending'}
        >
          {formState === 'sending' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </span>
          ) : 'Enviar mensaje'}
        </button>

        {/* Feedback messages */}
        {formState === 'sent' && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm sm:text-base animate-fade-in mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            ¡Mensaje enviado con éxito! Te responderé pronto.
          </div>
        )}
        {formState === 'error' && (
          <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-bold text-sm sm:text-base animate-fade-in mt-1">
            Ocurrió un error. Intenta nuevamente o contáctame directamente.
          </div>
        )}
      </form>
      {/* Botones de redes sociales accesibles y optimizados */}
      <div className="flex gap-3 sm:gap-6 mt-3 sm:mt-4 justify-center">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 flex items-center justify-center rounded-full border-2 border-[#2563eb] bg-white dark:bg-neutral-900 w-9 h-9 sm:w-11 sm:h-11 text-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            title={link.label}
            tabIndex={0}
          >
            <span className="text-lg sm:text-xl">{link.icon}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
