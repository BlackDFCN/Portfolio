import type { ProjectArchitecture as ProjectArchitectureData } from "@/types/project";
import MermaidDiagram from "@/components/MermaidDiagram";

export default function ProjectArchitecture({
  architecture,
  diagram
}: {
  architecture: ProjectArchitectureData;
  diagram?: string;
}) {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-20 lg:py-32 dark:border-white/10 dark:bg-white/5">
      <div className="section-container text-center">
        <h2 className="mb-12 text-[11px] font-bold uppercase tracking-[0.4em] text-black dark:text-white">
          03 / Arquitectura del Sistema
        </h2>
        <div className="mx-auto max-w-5xl px-0 py-8 sm:px-6 sm:py-12">
          {diagram ? (
            <div className="mb-12">
              <MermaidDiagram diagram={diagram} title="Diagrama de arquitectura" />
            </div>
          ) : null}
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
            <div className="arch-node">{architecture.client ?? "Client App"}</div>
            <div className="flex justify-center text-gray-300 dark:text-gray-600">
              <span className="material-symbols-outlined">trending_flat</span>
            </div>
            <div className="arch-node border-2 border-black dark:border-white">
              {architecture.gateway ?? "API Gateway"}
            </div>
            <div className="flex justify-center text-gray-300 dark:text-gray-600">
              <span className="material-symbols-outlined">trending_flat</span>
            </div>
            <div className="flex flex-col gap-4">
              {(architecture.services ?? []).map((service) => (
                <div className="arch-node" key={service}>
                  {service}
                </div>
              ))}
            </div>
          </div>
          {architecture.persistence?.length ? (
            <div className="mt-12 flex flex-col items-center">
              <div className="h-12 w-[2px] bg-gray-100 dark:bg-white/10" />
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-24">
                {architecture.persistence.map((item) => (
                  <div className="flex flex-col items-center" key={item}>
                    <div className="arch-node px-8">{item}</div>
                    <span className="mt-2 text-[9px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      {item === "Redis" ? "Cache / Streams" : "Persistence"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
