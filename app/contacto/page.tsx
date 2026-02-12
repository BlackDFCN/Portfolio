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
      <section className="py-24 lg:py-40">
        <div className="section-container">
          <div className="max-w-4xl">
            <span className="eyebrow">DISPONIBILIDAD INMEDIATA</span>
            <h1 className="mb-10 text-6xl font-extrabold tracking-tight leading-[0.95] text-black lg:text-[6.5rem]">
              Iniciemos tu próximo <br /> gran proyecto.
            </h1>
            <p className="max-w-3xl text-xl font-medium leading-relaxed text-gray-500 lg:text-2xl">
              Desarrollador Full Stack disponible para proyectos freelance o
              integraciones en equipos de ingeniería. Te responderé a la
              brevedad posible para analizar tu propuesta.
            </p>
          </div>
        </div>
      </section>

      <section className="grid-technical">
        <div className="grid grid-cols-1 gap-[1px] lg:grid-cols-12">
          <div className="grid-cell flex flex-col justify-center lg:col-span-6">
            <span className="eyebrow">Email de contacto</span>
            <h2 className="mb-6 text-xl font-bold tracking-tight text-black lg:text-3xl">
              bastiantapia.dev@gmail.com
            </h2>
            <CopyEmailButton email="bastiantapia.dev@gmail.com" />
          </div>
          <div className="grid-cell flex flex-col justify-center lg:col-span-6">
            <span className="eyebrow">REDES SOCIALES</span>
            <div className="flex flex-row flex-nowrap items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
              <Link className="social-pill" href="https://wa.me/56900000000" target="_blank">
                <img
                  alt="WhatsApp"
                  className="h-4 w-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKhq1FQd-ULGKsvYM7g61oYhd315BM15aGUHeg5M8dYWr5Etq9t-RBmwCoQKjDj_HZQ3zkF0VyCHSXYCaa9kKmkw03ZxNdv0hMKas2sJOFb1HQvWwKf938YVHSkMzQgp6CV7MgQmUCzopI-PflHIEiHkbUbhb6WfCiT0tTTo_VbLmhUPbMT9yAO9Yg8CcSjkp-aCWUabCdypsIBGIH1mlVhEfRmoXLDqXxDnkoYTbGDr4KTWICa7SKPSNMPEv6t-sRh8t2Wdf5N6Y"
                />
                WhatsApp
              </Link>
              <Link className="social-pill" href="https://linkedin.com" target="_blank">
                <img
                  alt="LinkedIn"
                  className="h-4 w-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeEE2dWn0Mvkhoihrr-y_7IzWhEwukQFeIx0zkk4YnNvBcvArB4RgqANx6q-RDFmmY5OkKD7ErI33l-TgnyEJbswBqCppMJpFGEWRLlvhA5V7qWFiqq9z_Sqy9N2S7q-b9afDFSx1iy0h8Zacsl5K0i-TgXVeTO4_p1mnP5HSE22GCOJMocyme--gvMjOvxJqLs6GNqE5u_0uICGDKNp3WmxHJcCAnTVDQNcSj7cVgfeEGNZevSn4SGkpc4Z3lsgjmJ8zGyolameI"
                />
                LinkedIn
              </Link>
              <Link className="social-pill" href="https://github.com" target="_blank">
                <img
                  alt="GitHub"
                  className="h-4 w-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZOHifjC3nXraku0qodBnS0vniDKRbmMD6edb8ocExFfSpTMx-rwGu62mR5kvLN0z5w-7YboN6gzcuFaYUdciW0pTCgGbEeyjZz2PWfmRN2COn6LE4lZxn1rL8lCU2w4nc9O1lNSTF4Pzak7v-QVWnx9HsKjBkgcg22G_rR7wUfc25Ju-cPsXAYgZDn_uaODIGqWgIyfdRSwK3sVgTIfqOe3XuCNJUKgXJcIo8PfX7UN3pKLk_ZvWLKZWDqt4UoSEXhCa29uoou6M"
                />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-40">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <span className="eyebrow">Formulario</span>
              <h3 className="mb-6 text-4xl font-extrabold text-black">
                Cuéntame sobre tu visión
              </h3>
              <p className="max-w-md text-lg leading-relaxed text-gray-500">
                Completa el formulario y me pondré en contacto contigo para
                analizar los detalles técnicos. Puedes enviarme un mensaje a
                través del formulario o contactarme directamente vía WhatsApp
                para una comunicación más ágil.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
