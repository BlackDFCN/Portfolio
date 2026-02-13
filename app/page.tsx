import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
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
          <div className="reveal space-y-10 lg:col-span-7" data-reveal>
            <a
              className="group inline-flex items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600 transition-all hover:bg-white"
              href="mailto:bastiantapia.dev@gmail.com"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponible para proyectos
            </a>
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold leading-[1] tracking-tight text-black lg:text-[5.5rem]">
                Desarrollador Full Stack
              </h1>
              <p className="text-2xl font-medium italic leading-tight text-gray-400 lg:text-3xl">
                Transformando ideas en sistemas escalables.
              </p>
              <p className="max-w-xl text-lg leading-relaxed text-gray-500">
                Especializado en arquitectura de software de alto rendimiento y
                experiencias de usuario fluidas. Ingeniero en Informática con
                enfoque en calidad técnica.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link
                className="flex items-center justify-center gap-3 rounded-full bg-black px-10 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-black/10 transition-all hover:bg-gray-800"
                href="/contacto"
              >
                Contactar ahora
              </Link>
              <DownloadCVButton />
            </div>
          </div>
          <div className="reveal reveal-delay-2 flex justify-center lg:col-span-5 lg:justify-end" data-reveal>
            <div className="relative h-72 w-72 lg:h-[460px] lg:w-[460px]">
              <div className="relative h-full w-full overflow-hidden rounded-[60px] border border-gray-100 bg-gray-50 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)]">
                <img
                  alt="Bastian Tapia"
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKUDSTmqihVJ0XZkbWAZ8sKHzYLEuw-vgcGjtUdDA6j3vdMfh7mkjJCZru17AnptlmaXukCtVONr3XtPJ2Bpg0WTigZ9AH8klNG6ptISKeCKkBSDpouvBSHdYGIkGSmgH6CIPcN6BeX9jJv6whhgGjubOACLpF6fYOaULEUGkfk3D6A0evZgqIVYfDFLxv8Nl0py-4YSGth8NBmf8UdNVO9uXjU1Uh3crUrtpj54RYM16a0tUyeThWdA_KBrxN5zS2x8rg1vUInAo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-snap topo-section min-h-screen border-t border-gray-50 dark:border-white/8 bg-white py-8 lg:py-16" data-section="metodologia" id="metodologia">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-6 max-w-3xl" data-reveal>
            <span className="eyebrow">Metodología</span>
            <h3 className="mb-8 text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
              Filosofía de Desarrollo
            </h3>
            <p className="text-xl leading-relaxed text-gray-500">
              Soluciones solidas y escalables con un proceso claro, centrado en
              calidad tecnica y experiencia de usuario.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[1px] overflow-hidden rounded-sm border border-[#F3F4F6] bg-[#F3F4F6] md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "account_tree",
                title: "Arquitectura",
                text: "Planificación rigurosa de flujos de datos para escalar sin comprometer la estabilidad técnica."
              },
              {
                icon: "code_blocks",
                title: "Código Limpio",
                text: "Aplicación de principios SOLID y Clean Code que facilitan la evolución continua del software."
              },
              {
                icon: "bolt",
                title: "Rendimiento",
                text: "Optimización de procesos críticos para asegurar tiempos de respuesta mínimos bajo alta demanda."
              },
              {
                icon: "security",
                title: "Seguridad",
                text: "Integración de capas de seguridad y validación desde el diseño inicial de cada módulo."
              },
              {
                icon: "touch_app",
                title: "UX Centric",
                text: "Diseño de interfaces que reducen la fricción cognitiva y potencian la productividad del usuario."
              },
              {
                icon: "query_stats",
                title: "Escalabilidad",
                text: "Sistemas diseñados modularmente para crecer orgánicamente junto con las necesidades del negocio."
              }
            ].map((item, index) => (
              <article
                className={`pillar-card reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={item.title}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-xl ${
                      item.title === "Arquitectura"
                        ? "text-indigo-500"
                        : item.title === "Código Limpio"
                          ? "text-emerald-500"
                          : item.title === "Rendimiento"
                            ? "text-amber-500"
                            : item.title === "Seguridad"
                              ? "text-rose-500"
                              : item.title === "UX Centric"
                                ? "text-sky-500"
                                : "text-violet-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <h4 className="text-lg font-bold uppercase tracking-tight text-black">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-snap topo-section min-h-screen border-t border-gray-50 dark:border-white/8 bg-white py-8 lg:py-16" data-section="stack" id="stack">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-6 flex flex-col" data-reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">STACK TECNOLÓGICO</span>
              <h3 className="mb-6 text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
                Ecosistema Técnico
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-500">
                Herramientas seleccionadas para construir sistemas escalables,
                priorizando el rendimiento y la mantenibilidad en cada capa del
                desarrollo.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[1px] overflow-hidden rounded-sm border border-[#F3F4F6] bg-[#F3F4F6] md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Lenguajes",
                items: [
                  { slug: "typescript", label: "TypeScript" },
                  { slug: "javascript", label: "JavaScript" },
                  { slug: "python", label: "Python" },
                  { slug: "kotlin", label: "Kotlin" }
                ]
              },
              {
                title: "Frontend",
                items: [
                  { slug: "react", label: "React" },
                  { slug: "nextdotjs", label: "Next.js" },
                  { slug: "angular", label: "Angular" },
                  { slug: "tailwindcss", label: "Tailwind" }
                ]
              },
              {
                title: "Backend",
                items: [
                  { slug: "nodedotjs", label: "Node.js" },
                  { slug: "nestjs", label: "NestJS" },
                  { slug: "express", label: "Express" },
                  { slug: "fastapi", label: "FastAPI" }
                ]
              },
              {
                title: "Bases de Datos",
                items: [
                  { slug: "postgresql", label: "PostgreSQL" },
                  { slug: "mongodb", label: "MongoDB" },
                  { slug: "redis", label: "Redis" },
                  { slug: "mysql", label: "MySQL" }
                ]
              },
              {
                title: "Cloud & DevOps",
                items: [
                  { slug: "amazonwebservices", label: "AWS" },
                  { slug: "docker", label: "Docker" },
                  { slug: "kubernetes", label: "K8s" },
                  { slug: "githubactions", label: "CI/CD" },
                  { slug: "azuredevops", label: "Azure DevOps" }
                ]
              },
              {
                title: "Herramientas",
                items: [
                  { slug: "git", label: "Git" },
                  { slug: "vercel", label: "Vercel" },
                  { slug: "postman", label: "Postman" },
                  { slug: "linux", label: "Linux" }
                ]
              }
            ].map((group, index) => (
              <article
                className={`stack-category-card reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={group.title}
              >
                <h4 className="text-lg font-bold uppercase tracking-tight text-black">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <div className="tech-badge" key={item.label}>
                      <img
                        alt={item.label}
                        className="h-4 w-4"
                        loading="lazy"
                        src={`https://cdn.simpleicons.org/${item.slug}/${
                          iconColors[item.slug] ?? "111111"
                        }`}
                      />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-black">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-snap topo-section border-t border-gray-50 dark:border-white/8 bg-white py-8 lg:py-16" data-section="proyectos" id="proyectos">
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

      <section className="section-snap topo-section border-t border-gray-50 dark:border-white/8 bg-white py-8 lg:py-16" data-section="servicios" id="servicios">
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
