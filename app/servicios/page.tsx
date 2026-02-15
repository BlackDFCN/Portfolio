import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "BastianDev - Servicios" },
  description:
    "Servicios profesionales de desarrollo Full Stack, arquitectura backend y automatización DevOps para tu producto o empresa."
};

export default function ServiciosPage() {
  const services = [
    {
      icon: "web",
      title: "Desarrollo Full Stack",
      description: "Aplicaciones web completas desde la idea hasta el despliegue, con frontend moderno y backend robusto.",
      features: [
        "Interfaces de usuario responsive con React, Next.js o Vue",
        "APIs RESTful y GraphQL escalables",
        "Integración con bases de datos SQL y NoSQL",
        "Autenticación, autorización y seguridad",
        "Optimización de rendimiento y SEO"
      ],
      color: "emerald"
    },
    {
      icon: "settings_input_component",
      title: "Arquitectura Backend",
      description: "Diseño e implementación de sistemas backend escalables, APIs de alto rendimiento y modelado de datos coherente.",
      features: [
        "Diseño de arquitecturas modulares y mantenibles",
        "Microservicios y sistemas distribuidos",
        "Modelado de datos y optimización de consultas",
        "Event-driven architecture y message queues",
        "Caching strategies y optimización de recursos"
      ],
      color: "indigo"
    },
    {
      icon: "precision_manufacturing",
      title: "Automatización y DevOps",
      description: "Infraestructura cloud, pipelines CI/CD y automatización de procesos para entregas confiables y rápidas.",
      features: [
        "Pipelines CI/CD con GitHub Actions, GitLab CI o Jenkins",
        "Containerización con Docker y orquestación con Kubernetes",
        "Infraestructura como código (Terraform, CloudFormation)",
        "Monitoreo, logging y observabilidad",
        "Despliegues en AWS, Azure o Google Cloud"
      ],
      color: "amber"
    }
  ];

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="bg-transparent py-6 lg:py-12 dark:bg-transparent">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-4 max-w-3xl" data-reveal>
            <span className="eyebrow">SERVICIOS PROFESIONALES</span>
            <h1 className="mb-4 text-[clamp(32px,4vw,64px)] font-extrabold leading-[1.1] tracking-tight text-black dark:text-white">
              Soluciones a medida para tu producto
            </h1>
            <p className="text-[clamp(16px,1.15vw,18px)] leading-relaxed text-gray-500 dark:text-gray-300">
              Desarrollo de software enfocado en resultados: desde la arquitectura inicial hasta la entrega continua en producción, con tecnologías modernas y buenas prácticas de ingeniería.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-transparent py-8 lg:py-16 dark:bg-transparent">
        <div className="section-container max-w-6xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                className={`pillar-card stack-lift reveal flex flex-col ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={service.title}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200/80 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                    <span
                      className={`material-symbols-outlined text-2xl ${
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
                  <h2 className="text-[clamp(15px,1.1vw,17px)] font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                    {service.title}
                  </h2>
                </div>
                <p className="mb-6 text-[clamp(14px,1.05vw,16px)] leading-relaxed text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <p className="mb-3 text-[clamp(12px,0.95vw,13px)] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    Incluye
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        className="flex items-start gap-2 text-[clamp(13px,1vw,15px)] leading-relaxed text-gray-600 dark:text-gray-400"
                        key={feature}
                      >
                        <span className="material-symbols-outlined mt-0.5 text-sm text-gray-400 dark:text-gray-600">check_circle</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-gray-50 py-6 lg:py-12 dark:bg-[#0a0a0a]">
        <div className="section-container max-w-6xl">
          <div className="reveal mb-4 max-w-3xl" data-reveal>
            <span className="eyebrow">METODOLOGÍA DE TRABAJO</span>
            <h2 className="mb-4 text-[clamp(26px,3.2vw,48px)] font-extrabold tracking-tight text-black dark:text-white">
              Cómo trabajo contigo
            </h2>
            <p className="text-[clamp(15px,1.1vw,17px)] leading-relaxed text-gray-600 dark:text-gray-300">
              Un proceso colaborativo y transparente, enfocado en entender tu visión y entregar valor incremental.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "lightbulb",
                title: "1. Descubrimiento",
                text: "Conversamos sobre tu proyecto, objetivos y requerimientos técnicos. Definimos alcance, tecnologías y tiempos."
              },
              {
                icon: "draw",
                title: "2. Diseño y Planificación",
                text: "Diseño la arquitectura del sistema, modelado de datos y flujos clave. Priorizo funcionalidades y creo un roadmap."
              },
              {
                icon: "code",
                title: "3. Desarrollo Iterativo",
                text: "Desarrollo en sprints cortos con entregas frecuentes, permitiendo feedback continuo y ajustes sobre la marcha."
              },
              {
                icon: "verified",
                title: "4. Testing y QA",
                text: "Pruebas automatizadas, revisión de código y validación de funcionalidades antes de cada entrega."
              },
              {
                icon: "rocket_launch",
                title: "5. Despliegue",
                text: "Configuración de infraestructura, deployment automatizado y monitoreo en producción desde el día uno."
              },
              {
                icon: "support_agent",
                title: "6. Soporte y Evolución",
                text: "Asistencia post-lanzamiento, resolución de incidencias y desarrollo de nuevas funcionalidades según necesidad."
              }
            ].map((step, index) => (
              <article
                className={`pillar-card stack-lift reveal ${
                  index === 0 ? "" : `reveal-delay-${Math.min(index, 4)}`
                }`}
                data-reveal
                key={step.title}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-gray-50 dark:border-white/10 dark:bg-white/5">
                    <span className="material-symbols-outlined text-xl text-indigo-500">
                      {step.icon}
                    </span>
                  </span>
                  <h3 className="text-[clamp(13px,1vw,15px)] font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[clamp(14px,1.05vw,16px)] leading-relaxed text-gray-600 dark:text-gray-300">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-transparent py-12 lg:py-20 dark:bg-transparent">
        <div className="section-container max-w-4xl">
          <div className="reveal rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center lg:p-14 dark:border-white/10 dark:bg-white/5" data-reveal>
            <div className="mb-8 space-y-4">
              <p className="text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                AGENDA ABIERTA
              </p>
              <h2 className="text-[clamp(26px,2.8vw,40px)] font-extrabold text-black dark:text-white">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="mx-auto max-w-2xl text-[clamp(15px,1.1vw,17px)] leading-relaxed text-gray-600 dark:text-gray-300">
                Conversemos sobre tu idea, definamos alcance y tiempos, y desarrollemos juntos una solución técnica sólida y escalable.
              </p>
            </div>
            <Link
              className="btn-talk btn-lift inline-flex items-center gap-2"
              href="/contacto"
            >
              <span>CONTACTAR AHORA</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
