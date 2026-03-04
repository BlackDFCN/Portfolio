"use client";
import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";

export default function MDXRenderer({ code }: { code: string }) {
  const [MDXContent, setMDXContent] = useState<any>(null);
  useEffect(() => {
    let cancelled = false;
    // code es el string de la función exportada por @mdx-js/mdx (outputFormat: 'function')
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('props', code);
      if (!cancelled) setMDXContent(() => fn);
    } catch (e) {
      setMDXContent(() => () => <div>Error al renderizar el contenido MDX.</div>);
    }
    return () => { cancelled = true; };
  }, [code]);
  if (!MDXContent) return <div>Cargando contenido...</div>;
  return (
    <MDXProvider>
      <MDXContent />
    </MDXProvider>
  );
}