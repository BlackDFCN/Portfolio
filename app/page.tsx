import Link from "next/link";
import Image from "next/image";
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
  const featuredProjects = getFeaturedProjects(2);
  const featuredSlots = Array.from({ length: 2 }, (_, index) => featuredProjects[index] ?? null);
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
    <div>
      <section className="section-snap topo-section min-h-screen min-h-[100dvh] bg-white/90 py-12 lg:py-20 dark:bg-[#0c0c0c]" data-section="inicio" id="inicio">
        <div className="section-container max-w-6xl grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="reveal space-y-10 lg:col-span-8" data-reveal>
            <div className="relative inline-flex items-center group">
              <span className="absolute inset-0 rounded-full bg-white/90 dark:bg-[#181f1b] z-0 transition-colors duration-300" />
              <span className="absolute inset-0 rounded-full bg-emerald-400/30 dark:bg-emerald-500/20 z-10 transition-colors duration-300" />
              <span className="relative inline-flex items-center gap-2.5 rounded-full border border-emerald-500 bg-transparent px-4 py-2 text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 shadow-[0_10px_26px_-18px_rgba(16,185,129,0.35)] z-20 transition-colors duration-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Disponible para proyectos
              </span>
            </div>
            <div className="space-y-5">
              <h1 className="text-[clamp(2.2rem,5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-black dark:text-white">
                <span className="block">Desarrollador</span>
                <span className="block text-gray-500 dark:text-gray-400">Full Stack</span>
              </h1>
              <p className="-mt-1 text-base font-semibold leading-tight text-gray-400 sm:text-xl lg:text-2xl dark:text-gray-400">
                <span className="inline-flex flex-wrap gap-x-2">
                  <span>Backend</span>
                  <span>·</span>
                  <span>Automatización</span>
                  <span>·</span>
                  <span>Arquitectura Escalable</span>
                </span>
              </p>
              <p className="max-w-xl text-base font-semibold text-gray-700 lg:text-lg dark:text-gray-200">
                Transformo procesos en sistemas confiables y escalables.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-gray-500 lg:text-lg dark:text-gray-300">
                Desarrollo aplicaciones web, APIs y sistemas automatizados que
                optimizan procesos y mejoran la eficiencia operativa.
              </p>
              <p className="max-w-xl pt-2 text-base leading-relaxed text-gray-500 lg:text-lg dark:text-gray-300">
                Ingeniero en Ejecución en Informática con experiencia en
                TypeScript, Node.js y React, enfocado en arquitectura limpia,
                despliegues con Docker e integración en entornos cloud.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link
                className="btn-lift flex items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-widest transition-all duration-200
                  bg-black text-white shadow-lg shadow-black/10 hover:bg-white hover:text-black border border-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                href="/contacto"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                Contactar ahora
              </Link>
              <DownloadCVButton className="btn-lift flex items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-widest transition-all duration-200 border border-black text-black bg-white hover:bg-black hover:text-white dark:border-white dark:text-white dark:bg-[#0f0f0f] dark:hover:bg-white dark:hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400" variant="secondary" />
            </div>
          </div>
          <div className="reveal reveal-delay-2 flex flex-col items-center justify-center lg:col-span-4 lg:justify-end" data-reveal>
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-[360px] lg:w-[360px] group">
              <div className="relative h-full w-full overflow-hidden rounded-[36px] border border-white/80 bg-white/70 shadow-[0_28px_60px_-22px_rgba(0,0,0,0.22)] ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-[#181f1b]/80 dark:ring-white/10 backdrop-blur-md transition-all duration-300">
                <Image
                  alt="Foto de perfil - Bastian Tapia"
                  className="h-full w-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  src="/avatar.png"
                  width={360}
                  height={360}
                  priority
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <div 
                  className="relative flex items-start gap-5 rounded-[2rem] border border-white/80 bg-white/80 shadow-xl px-8 py-6 mt-6 dark:border-white/10 dark:bg-[#181f1b]/80 backdrop-blur-md transition-all duration-300"
                  style={{ maxWidth: '360px', minWidth: '220px', width: '100%' }}>
                  <span className="self-stretch w-1 rounded-full bg-gradient-to-b from-sky-400/80 to-sky-400/0" />
                  <div className="flex flex-col justify-center gap-2 text-left w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[clamp(17px,1.3vw,21px)] font-extrabold uppercase tracking-[0.12em] text-gray-900 dark:text-white drop-shadow-sm">
                        Bastian Tapia
                      </span>
                      <span className="inline-block align-middle ml-1 relative" title="Verificado">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{zIndex:0}}>
                          <circle cx="14" cy="14" r="12" fill="#38BDF8" fillOpacity="0.18" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{position:'relative',zIndex:1}}>
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.47 0-.903.084-1.302.233C14.817 2.482 13.502 1.5 12 1.5c-1.503 0-2.817.982-3.47 2.243-.4-.15-.832-.233-1.303-.233-2.107 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.58.875 2.95 2.147 3.6-.154.435-.237.905-.237 1.4 0 2.21 1.71 3.99 3.818 3.99.47 0 .903-.084 1.303-.233C9.183 21.518 10.498 22.5 12 22.5c1.502 0 2.817-.982 3.47-2.243.4.15.83.233 1.302.233 2.108 0 3.818-1.79 3.818-4 0-.494-.084-.964-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.5 4L6 12.5l1.5-1.5 2.5 2.5 6.5-6.5 1.5 1.5-8 8z" fill="#38BDF8"/>
                        </svg>
                      </span>
                    </div>
                    <span className="block text-[clamp(14px,1.05vw,16px)] font-normal tracking-[0.04em] text-gray-400 dark:text-gray-300 leading-normal">
                      Ingeniero de Ejecución en Computación e Informática
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-snap topo-section min-h-screen min-h-[100dvh] bg-white py-8 lg:py-16 dark:bg-[#0c0c0c]" data-section="metodologia" id="metodologia">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-8 max-w-3xl" data-reveal>
            <span className="eyebrow">Metodología</span>
            <h3 className="mb-6 text-[clamp(28px,3.5vw,60px)] font-extrabold tracking-tight text-black dark:text-white">
              Enfoque de Ingeniería
            </h3>
            <p className="text-[clamp(16px,1.1vw,18px)] leading-relaxed text-gray-500 dark:text-gray-300">
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
                  className={`reveal group transition-all duration-300 ${
                    index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                  } rounded-xl border border-gray-200/70 bg-gray-50/80 shadow-2xl backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.025] dark:border-white/10 dark:bg-[#23272e]/90 dark:shadow-black/40 dark:hover:shadow-2xl`}
                  data-reveal
                  key={item.title}
                >
                  <div className="flex items-center gap-4 px-2 pt-2">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full shadow-sm ring-1 ring-inset ring-gray-200/40 dark:ring-white/10 transition-all duration-300
                      ${item.title === "Arquitectura" ? "bg-indigo-100/40 dark:bg-indigo-400/10" :
                        item.title === "Calidad de Código" ? "bg-emerald-100/40 dark:bg-emerald-400/10" :
                        item.title === "Rendimiento" ? "bg-amber-100/40 dark:bg-amber-400/10" :
                        item.title === "Seguridad" ? "bg-rose-100/40 dark:bg-rose-400/10" :
                        item.title === "Automatización" ? "bg-sky-100/40 dark:bg-sky-400/10" :
                        "bg-violet-100/40 dark:bg-violet-400/10"}`}
                    >
                      <span
                        className={`material-symbols-outlined text-2xl transition-colors duration-300
                          ${item.title === "Arquitectura" ? "text-indigo-500" :
                            item.title === "Calidad de Código" ? "text-emerald-500" :
                            item.title === "Rendimiento" ? "text-amber-500" :
                            item.title === "Seguridad" ? "text-rose-500" :
                            item.title === "Automatización" ? "text-sky-500" :
                            "text-violet-500"}`}
                      >
                        {item.icon}
                      </span>
                    </span>
                      <h4 className="text-[clamp(15px,1.1vw,18px)] font-bold uppercase tracking-[0.18em] text-gray-900 dark:text-white">
                        {item.title === "Escalabilidad y Entrega" ? "Escalabilidad" : item.title}
                      </h4>
                  </div>
                  <div className="flex flex-row items-stretch px-5 pb-5 pt-2">
                    <span className={`w-0.5 rounded-full opacity-80 mr-3 self-stretch
                      ${item.title === "Arquitectura" ? "bg-indigo-500/90" :
                        item.title === "Calidad de Código" ? "bg-emerald-500/90" :
                        item.title === "Rendimiento" ? "bg-amber-400/90" :
                        item.title === "Seguridad" ? "bg-rose-500/90" :
                        item.title === "Automatización" ? "bg-sky-500/90" :
                        "bg-violet-500/90"}`}
                    />
                    <p className="text-[clamp(15px,1.05vw,16px)] leading-relaxed text-gray-700 dark:text-gray-200 my-0">
                      {item.text}
                    </p>
                  </div>
                </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-snap topo-section min-h-screen min-h-[100dvh] bg-white py-8 lg:py-16 dark:bg-[#0c0c0c]" data-section="stack" id="stack">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-8 max-w-3xl" data-reveal>
            <span className="eyebrow">STACK TECNOLÓGICO</span>
            <h3 className="mb-6 text-[clamp(28px,3.5vw,60px)] font-extrabold tracking-tight text-black dark:text-white">
              Ecosistema Técnico
            </h3>
            <p className="text-[clamp(16px,1.1vw,18px)] leading-relaxed text-gray-500 dark:text-gray-300">
              Tecnologias y herramientas con las que trabajo y tengo experiencia real en
              proyectos, enfocadas en producto, rendimiento y despliegue.
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
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-gray-50 dark:border-white/10 dark:bg-white/5">
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
                  <h4 className="text-[clamp(14px,1vw,16px)] font-bold uppercase tracking-[0.14em] text-black dark:text-white">
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

      <section className="section-snap topo-section bg-white py-6 lg:py-12 dark:bg-[#0c0c0c]" data-section="proyectos" id="proyectos">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-4 max-w-3xl" data-reveal>
            <span className="eyebrow">TRABAJOS DESTACADOS</span>
            <h3 className="mb-4 text-[clamp(26px,3.2vw,48px)] font-extrabold tracking-tight text-black dark:text-white">
              Proyectos Destacados
            </h3>
            <p className="text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-300">
              Algunos proyectos desarrollados para empresas y proyectos personales.
            </p>
          </div>
          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredSlots.map((project, index) =>
              project ? (
                <ProjectCard key={project.slug} project={project} />
              ) : (
                <article
                  className="project-card reveal overflow-hidden border-t-4 border-t-gray-400 h-full"
                  data-reveal
                  key={`empty-${index}`}
                >
                  <div className="aspect-[2/1] overflow-hidden border-b border-gray-100 bg-gray-50 p-3 animate-pulse dark:border-white/10 dark:bg-white/5">
                    <div className="flex h-full w-full items-center justify-center bg-gray-100/60 dark:bg-white/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100/80 dark:bg-white/5" />
                    </div>
                  </div>
                  <div className="project-card-content animate-pulse">
                    <div className="mb-2 h-2 w-16 rounded-full bg-gray-100/80 dark:bg-white/5" />
                    <div className="mb-2 h-5 w-3/4 rounded bg-gray-100/80 dark:bg-white/5" />
                    <div className="mb-3 space-y-1.5">
                      <div className="h-3 w-full rounded bg-gray-100/80 dark:bg-white/5" />
                      <div className="h-3 w-5/6 rounded bg-gray-100/80 dark:bg-white/5" />
                    </div>
                    <div className="mb-3 flex gap-2">
                      <span className="h-6 w-14 rounded-full bg-gray-100/80 dark:bg-white/5" />
                      <span className="h-6 w-16 rounded-full bg-gray-100/80 dark:bg-white/5" />
                      <span className="h-6 w-12 rounded-full bg-gray-100/80 dark:bg-white/5" />
                    </div>
                    <div className="h-11 w-full rounded-md bg-gray-100/80 dark:bg-white/5" />
                  </div>
                </article>
              )
            )}
            
            {/* CTA Card */}
            <article className="project-card reveal group border-t-4 border-t-gray-400" data-reveal>
              <div className="aspect-[2/1] overflow-hidden border-b border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
                <div className="relative flex h-full w-full items-center justify-center">
                  {/* Logo */}
                  <Image
                    src="/icon-negro.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:hidden"
                  />
                  <Image
                    src="/icon-blanco.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="hidden transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:block"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-grow p-5">
                <span className="mb-2 inline-flex text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.3em] text-gray-400">
                  CATÁLOGO COMPLETO
                </span>
                <h3 className="mb-2 text-[clamp(16px,1.3vw,20px)] font-extrabold leading-tight tracking-tight text-black dark:text-white">
                  Más Proyectos
                </h3>
                <p className="mb-3 text-[clamp(14px,1.05vw,16px)] leading-relaxed text-gray-500 dark:text-gray-300">
                  Explora el catálogo completo con más soluciones empresariales, arquitecturas de sistemas, prototipos y experimentos técnicos desarrollados a lo largo de mi carrera profesional.
                </p>
                
                {/* Spacer para alinear con las otras cards que tienen tags */}
                <div className="mb-6 flex-grow"></div>
                
                <Link
                  className="project-card-link dark:border-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 mt-auto"
                  href="/proyectos"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>VER TODO</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-snap topo-section min-h-screen min-h-[100dvh] bg-white py-8 lg:py-16 dark:bg-[#0c0c0c]" data-section="servicios" id="servicios">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-8 max-w-3xl" data-reveal>
            <span className="eyebrow">SERVICIOS PROFESIONALES</span>
            <h3 className="mb-4 text-[clamp(26px,3vw,48px)] font-extrabold tracking-tight text-black dark:text-white">
              Soluciones a medida
            </h3>
            <p className="text-[clamp(15px,1vw,17px)] leading-relaxed text-gray-500 dark:text-gray-300">
              Arquitectura, desarrollo y entrega continua para tu producto digital.
            </p>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "web",
                title: "Desarrollo Full Stack",
                text: "Aplicaciones web completas con frontend moderno, backend robusto e integración con bases de datos. Desde la idea hasta el despliegue.",
                color: "emerald"
              },
              {
                icon: "settings_input_component",
                title: "Arquitectura Backend",
                text: "Diseño e implementación de APIs escalables, microservicios, modelado de datos y optimización de sistemas distribuidos.",
                color: "indigo"
              },
              {
                icon: "precision_manufacturing",
                title: "Automatización y DevOps",
                text: "Pipelines CI/CD, containerización con Docker, infraestructura cloud, monitoreo y observabilidad en producción.",
                color: "amber"
              }
            ].map((service, index) => (
              <article
                className={`pillar-card stack-lift reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={service.title}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        service.color === "emerald"
                          ? "text-emerald-500"
                          : service.color === "indigo"
                            ? "text-indigo-500"
                            : "text-amber-500"
                      }`}
                    >
                      {service.icon}
                    </span>
                  </span>
                  <h4 className="text-[clamp(14px,1vw,16px)] font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                    {service.title}
                  </h4>
                </div>
                <p className="text-[clamp(13px,0.95vw,15px)] leading-relaxed text-gray-500 dark:text-gray-300">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
          <div className="reveal reveal-delay-2 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center lg:p-8 dark:border-white/10 dark:bg-white/5" data-reveal>
            <p className="mb-2 text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
              AGENDA ABIERTA
            </p>
            <h3 className="mb-3 text-[clamp(22px,2vw,32px)] font-extrabold text-black dark:text-white">
              ¿Tienes un proyecto en mente?
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Link
                className="btn-talk btn-lift flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest min-w-[180px]"
                href="/contacto"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>CONTACTAR AHORA</span>
              </Link>
              <Link
                className="btn-lift flex items-center justify-center gap-2 rounded-full min-w-[180px] border border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:border-gray-900 hover:bg-gray-50 hover:shadow-lg active:scale-95 dark:border-white/20 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                href="/servicios"
                style={{ fontSize: 'clamp(11px,0.9vw,12px)', padding: 'clamp(0.45rem,1vw,0.65rem) clamp(1.25rem,2vw,1.5rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em' }}
              >
                <span className="material-symbols-outlined text-sm">info</span>
                <span>VER DETALLES</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
