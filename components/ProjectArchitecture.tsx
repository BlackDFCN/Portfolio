import type { ProjectArchitecture as ProjectArchitectureData } from "@/types/project";

export default function ProjectArchitecture({
  architecture
}: {
  architecture: ProjectArchitectureData;
}) {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-24 lg:py-32">
      <div className="section-container text-center">
        <h2 className="mb-16 text-[11px] font-bold uppercase tracking-[0.4em] text-black">
          03 / Arquitectura del Sistema
        </h2>
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
            <div className="arch-node">{architecture.client ?? "Client App"}</div>
            <div className="flex justify-center text-gray-300">
              <span className="material-symbols-outlined">trending_flat</span>
            </div>
            <div className="arch-node border-2 border-black">
              {architecture.gateway ?? "API Gateway"}
            </div>
            <div className="flex justify-center text-gray-300">
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
              <div className="h-12 w-[2px] bg-gray-100" />
              <div className="flex gap-24">
                {architecture.persistence.map((item) => (
                  <div className="flex flex-col items-center" key={item}>
                    <div className="arch-node px-8">{item}</div>
                    <span className="mt-2 text-[9px] uppercase tracking-widest text-gray-400">
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
