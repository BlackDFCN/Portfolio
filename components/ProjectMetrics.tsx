import type { ProjectMetric } from "@/types/project";

export default function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-24 text-white lg:py-48">
      <div className="section-container grid gap-16 text-center md:grid-cols-3">
        {metrics.map((metric) => (
          <div className="text-center" key={metric.label}>
            <h3 className="mb-4 text-6xl font-extrabold">{metric.value}</h3>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
