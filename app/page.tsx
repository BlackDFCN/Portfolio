import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { getStackContent } from "@/lib/stack";
import ProjectCard from "@/components/ProjectCard";
import DownloadCVButton from "@/components/DownloadCVButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "BastianDev - Home" },
  description:
    "Portafolio profesional con proyectos Full Stack, arquitectura y experiencias digitales de alto impacto."
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(3);
  const stackContent = getStackContent();
  const iconColors: Record<string, string> = {
    typescript: "3178C6",
    javascript: "F7DF1E",
    python: "3776AB",
    kotlin: "7F52FF",
    react: "61DAFB",
    nextdotjs: "000000",
    angular: "DD0031",
    tailwindcss: "06B6D4",
    nodedotjs: "339933",
    nestjs: "E0234E",
    express: "000000",
    fastapi: "009688",
    postgresql: "4169E1",
    mongodb: "47A248",
    redis: "DC382D",
    mysql: "4479A1",
    amazonwebservices: "232F3E",
    docker: "2496ED",
    kubernetes: "326CE5",
    githubactions: "2088FF",
    azuredevops: "0078D7",
    git: "F05032",
    vercel: "000000",
    postman: "FF6C37",
    linux: "FCC624"
  };

  return (
    <>
      <section className="section-snap topo-section min-h-screen py-12 lg:py-20" data-section="inicio" id="inicio">
        <div className="section-container max-w-6xl grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="reveal space-y-10 lg:col-span-8" data-reveal>
            <div className="group inline-flex items-center gap-2.5 rounded-full border border-emerald-100 bg-emerald-50/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 shadow-[0_10px_26px_-18px_rgba(16,185,129,0.35)] backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponible para proyectos
            </div>
            <div className="space-y-5">
              <h1 className="text-5xl font-extrabold leading-[0.98] tracking-tight text-black lg:text-[5.5rem]">
                <span className="block">Desarrollador</span>
                <span className="block text-gray-500 dark:text-gray-400">Full Stack</span>
              </h1>
              <p className="text-xl font-semibold leading-tight text-gray-400 lg:text-2xl -mt-1">
                <span className="whitespace-nowrap">Backend · Automatización · Arquitectura Escalable</span>
              </p>
              <p className="max-w-xl text-base font-semibold text-gray-700 lg:text-lg">
                Transformo procesos en sistemas confiables y escalables.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-gray-500 lg:text-lg">
                Desarrollo aplicaciones web, APIs y sistemas automatizados que
                optimizan procesos y mejoran la eficiencia operativa.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-gray-500 lg:text-lg pt-2">
                Ingeniero en Ejecución en Informática con experiencia en
                TypeScript, Node.js y React, enfocado en arquitectura limpia,
                despliegues con Docker e integración en entornos cloud.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link
                className="btn-lift flex items-center justify-center gap-3 rounded-full bg-black px-10 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-black/10"
                href="/contacto"
              >
                Contactar ahora
              </Link>
              <DownloadCVButton />
            </div>
          </div>
          <div className="reveal reveal-delay-2 flex justify-center lg:col-span-4 lg:justify-end" data-reveal>
            <div className="relative h-64 w-64 lg:h-[360px] lg:w-[360px]">
              <div className="relative h-full w-full overflow-hidden rounded-[44px] border border-white/80 bg-white shadow-[0_28px_60px_-22px_rgba(0,0,0,0.18)] ring-1 ring-gray-200/60">
                <img
                  alt="Bastian Tapia"
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKUDSTmqihVJ0XZkbWAZ8sKHzYLEuw-vgcGjtUdDA6j3vdMfh7mkjJCZru17AnptlmaXukCtVONr3XtPJ2Bpg0WTigZ9AH8klNG6ptISKeCKkBSDpouvBSHdYGIkGSmgH6CIPcN6BeX9jJv6whhgGjubOACLpF6fYOaULEUGkfk3D6A0evZgqIVYfDFLxv8Nl0py-4YSGth8NBmf8UdNVO9uXjU1Uh3crUrtpj54RYM16a0tUyeThWdA_KBrxN5zS2x8rg1vUInAo"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 justify-center">
                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white/90 px-3.5 py-2 shadow-[0_12px_24px_-20px_rgba(0,0,0,0.28)]">
                  <span className="h-7 w-1 rounded-full bg-[#395a8b]" />
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600">
                      Bastian Tapia
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-gray-400 whitespace-nowrap">
                      Ing. Ejec. Computacion e Informatica
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-snap topo-section min-h-screen bg-white py-8 lg:py-16" data-section="metodologia" id="metodologia">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-8 max-w-3xl" data-reveal>
            <span className="eyebrow">Metodología</span>
            <h3 className="mb-6 text-5xl font-extrabold tracking-tight text-black lg:text-6xl">
              Enfoque de Ingeniería
            </h3>
            <p className="text-[17px] leading-relaxed text-gray-500">
              Abordo cada proyecto con una base sólida en arquitectura, seguridad y rendimiento, asegurando soluciones mantenibles y preparadas para producción.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "account_tree",
                title: "Arquitectura",
                text: "Diseño sistemas modulares con APIs bien definidas y modelado de datos coherente, facilitando escalabilidad y evolución continua."
              },
              {
                icon: "code_blocks",
                title: "Calidad de Código",
                text: "Aplico principios SOLID, tipado estricto y buenas prácticas para garantizar claridad, consistencia y colaboración eficiente."
              },
              {
                icon: "bolt",
                title: "Rendimiento",
                text: "Optimizo consultas y flujos críticos para mantener tiempos de respuesta estables y uso eficiente de recursos."
              },
              {
                icon: "security",
                title: "Seguridad",
                text: "Implemento validación de datos, autenticación segura y control de acceso por roles desde el diseño inicial."
              },
              {
                icon: "autorenew",
                title: "Automatización",
                text: "Desarrollo integraciones y flujos automatizados que reducen tareas manuales y mejoran eficiencia operativa."
              },
              {
                icon: "query_stats",
                title: "Escalabilidad y Entrega",
                text: "Trabajo con Docker, integración continua y despliegues reproducibles en entornos cloud."
              }
            ].map((item, index) => (
                <article
                  className={`pillar-card stack-lift reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={item.title}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-gray-50">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        item.title === "Arquitectura"
                          ? "text-indigo-500"
                          : item.title === "Calidad de Código"
                            ? "text-emerald-500"
                            : item.title === "Rendimiento"
                              ? "text-amber-500"
                              : item.title === "Seguridad"
                                ? "text-rose-500"
                                : item.title === "Automatización"
                                  ? "text-sky-500"
                                  : "text-violet-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </span>
                  <h4 className="text-[15px] font-bold uppercase tracking-[0.14em] text-black">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[14px] leading-relaxed text-gray-500">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-snap topo-section min-h-screen bg-white py-8 lg:py-16" data-section="stack" id="stack">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-8 max-w-3xl" data-reveal>
            <span className="eyebrow">{stackContent.eyebrow}</span>
            <h3 className="mb-6 text-5xl font-extrabold tracking-tight text-black lg:text-6xl">
              {stackContent.title}
            </h3>
            <p className="text-[17px] leading-relaxed text-gray-500">
              {stackContent.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stackContent.groups.map((group, index) => (
              <article
                className={`pillar-card stack-lift reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={group.title}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-gray-50">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        group.title === "Lenguajes"
                          ? "text-indigo-500"
                          : group.title === "Frontend"
                            ? "text-sky-500"
                            : group.title === "Backend"
                              ? "text-emerald-500"
                              : group.title === "Bases de Datos"
                                ? "text-amber-500"
                                : group.title === "Cloud & DevOps"
                                  ? "text-violet-500"
                                  : "text-slate-500"
                      }`}
                    >
                      {group.icon}
                    </span>
                  </span>
                  <h4 className="text-[15px] font-bold uppercase tracking-[0.14em] text-black">
                    {group.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span className="tech-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-snap topo-section bg-white py-8 lg:py-16" data-section="proyectos" id="proyectos">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-6 max-w-3xl" data-reveal>
            <span className="eyebrow">TRABAJOS DESTACADOS</span>
            <h3 className="mb-8 text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
              Proyectos destacados
            </h3>
            <p className="text-xl leading-relaxed text-gray-500">
              Algunos proyectos desarrollados para empresas y proyectos personales.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[1px] overflow-hidden rounded-sm border border-[#F3F4F6] bg-[#F3F4F6] md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="reveal reveal-delay-2 mt-8 flex flex-col items-center gap-6" data-reveal>
            <p className="font-medium italic text-gray-500">
              Explora más proyectos y experimentos técnicos
            </p>
            <Link
              className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-12 py-5 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-sm transition-all hover:border-black hover:bg-gray-50"
              href="/proyectos"
            >
              Ver catálogo completo
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-snap topo-section bg-white py-8 lg:py-16" data-section="servicios" id="servicios">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-6 max-w-3xl" data-reveal>
            <span className="eyebrow">SERVICIOS PROFESIONALES</span>
            <h3 className="mb-8 text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
              Soluciones a medida
            </h3>
            <p className="text-xl leading-relaxed text-gray-500">
              Servicios enfocados en resultados: producto, arquitectura y
              entrega continua.
            </p>
          </div>
          <div className="mb-8 grid grid-cols-1 gap-[1px] overflow-hidden rounded-sm border border-[#F3F4F6] bg-[#F3F4F6] md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "web",
                title: "Desarrollo Full Stack",
                text: "Aplicaciones web completas desde la idea hasta el despliegue."
              },
              {
                icon: "settings_input_component",
                title: "Arquitectura Backend",
                text: "APIs escalables, diseño de sistemas y optimización de datos."
              },
              {
                icon: "precision_manufacturing",
                title: "Automatización y DevOps",
                text: "CI/CD, observabilidad e infraestructura cloud confiable."
              }
            ].map((service, index) => (
              <article
                className={`service-card reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={service.title}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      service.title === "Desarrollo Full Stack"
                        ? "text-emerald-500"
                        : service.title === "Arquitectura Backend"
                          ? "text-indigo-500"
                          : "text-amber-500"
                    }`}
                  >
                    {service.icon}
                  </span>
                  <h4 className="text-base font-bold uppercase tracking-tight text-black">
                    {service.title}
                  </h4>
                </div>
                <p className="text-[13px] leading-relaxed text-gray-600">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
          <div className="reveal reveal-delay-2 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center lg:p-10" data-reveal>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                Agenda abierta
              </p>
              <h3 className="text-2xl font-extrabold text-black lg:text-3xl">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="mx-auto max-w-xl text-base text-gray-500">
                Definamos alcance, tiempos y un plan técnico claro para tu
                producto.
              </p>
            </div>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-black/10 transition-all hover:bg-gray-800"
              href="/contacto"
            >
              Contactar para un servicio
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
