import type { ProjectMetric } from "@/types/project";

export default function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-16 text-white lg:py-40">
      <div className="section-container grid gap-12 text-center md:grid-cols-3">
        {metrics.map((metric) => (
          <div className="text-center" key={metric.label}>
            <h3 className="mb-3 text-[clamp(32px,5vw,64px)] font-extrabold">
              {metric.value}
            </h3>
            <p className="text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.3em] text-gray-400">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
