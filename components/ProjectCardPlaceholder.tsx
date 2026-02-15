"use client";

export default function ProjectCardPlaceholder() {
  return (
    <article className="project-card reveal overflow-hidden h-full animate-pulse" data-reveal>
      {/* Placeholder Image Section (igual que home) */}
      <div className="aspect-[2/1] overflow-hidden border-b border-gray-200 bg-gray-50 p-3 dark:bg-white/5 mt-2">
        <div className="flex h-full w-full items-center justify-center bg-gray-100/60 dark:bg-white/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100/80 dark:bg-white/5" />
        </div>
      </div>
      {/* Placeholder Content Section (igual que home) */}
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
  );
}