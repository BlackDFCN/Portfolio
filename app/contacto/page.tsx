import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Formulario de contacto para proyectos Full Stack, arquitectura y consultoria tecnica."
};

export default function ContactPage() {
  return (
    <>
      <section className="section-snap border-t border-gray-50 dark:border-white/8 bg-white py-8 lg:py-16">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-8 max-w-3xl" data-reveal>
            <span className="eyebrow">CONTACTO</span>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
              Iniciemos tu próximo proyecto.
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Lado Izquierdo - Bloque de Contacto */}
            <div className="reveal contact-card rounded-2xl bg-gray-50 p-5 space-y-5" data-reveal>
              {/* Descripción */}
              <p className="text-base leading-relaxed text-gray-600">
                Disponible para proyectos freelance o integraciones en equipos. Te responderé a la brevedad posible.
              </p>

              {/* Email */}
              <div>
                <span className="eyebrow mb-4 block text-xs uppercase">Contáctame directamente</span>
                <a
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-4 font-semibold text-black transition-all hover:border-gray-400 hover:bg-gray-50"
                  href="mailto:bastiantapia.dev@gmail.com"
                >
                  <span className="material-symbols-outlined text-xl">mail</span>
                  <span>bastiantapia.dev@gmail.com</span>
                </a>
                <CopyEmailButton email="bastiantapia.dev@gmail.com" />
              </div>

              {/* Redes Sociales */}
              <div>
                <span className="eyebrow mb-4 block text-xs uppercase">También en</span>
                <div className="flex gap-3">
                  <Link
                    className="contact-icon flex h-11 w-11 items-center justify-center rounded-lg bg-[#25D366]"
                    href="https://wa.me/56959800748"
                    target="_blank"
                    title="WhatsApp"
                  >
                    <img
                      alt="WhatsApp"
                      className="h-5 w-5"
                      src="https://cdn.simpleicons.org/whatsapp/ffffff"
                    />
                  </Link>
                  <Link
                    className="contact-icon flex h-11 w-11 items-center justify-center rounded-lg bg-[#0077B5]"
                    href="https://linkedin.com/in/bastiantapia07"
                    target="_blank"
                    title="LinkedIn"
                  >
                    <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                  </Link>
                  <Link
                    className="contact-icon flex h-11 w-11 items-center justify-center rounded-lg bg-black"
                    href="https://github.com/BlackDFCN"
                    target="_blank"
                    title="GitHub"
                  >
                    <img
                      alt="GitHub"
                      className="h-5 w-5"
                      src="https://cdn.simpleicons.org/github/ffffff"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Lado Derecho */}
            <div className="reveal rounded-2xl border border-gray-100 bg-white p-5" data-reveal>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
