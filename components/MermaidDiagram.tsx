"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

const normalizeDiagram = (diagram: string) => diagram.replace(/\r\n/g, "\n").trim();

export default function MermaidDiagram({
  diagram,
  title
}: {
  diagram: string;
  title?: string;
}) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const normalized = useMemo(() => normalizeDiagram(diagram), [diagram]);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          fontFamily: "Inter, sans-serif"
        });

        const { svg } = await mermaid.render(`mermaid-${id}`, normalized);
        if (containerRef.current && isMounted) {
          containerRef.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (error) {
        if (containerRef.current && isMounted) {
          containerRef.current.textContent = "No se pudo renderizar el diagrama.";
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [id, normalized]);

  return (
    <div className="mermaid-wrapper">
      {title ? (
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
          {title}
        </p>
      ) : null}
      <div
        className={`mermaid-canvas ${rendered ? "is-ready" : "is-loading"}`}
        ref={containerRef}
        role="img"
      />
    </div>
  );
}
