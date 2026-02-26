"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";

export default function MDXRenderer({ code }: { code: string }) {
  const [MDXContent, setMDXContent] = useState<any>(null);
  useEffect(() => {
    let cancelled = false;
    // code es el string de la función exportada por @mdx-js/mdx (outputFormat: 'function')
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("module", "exports", code + "\nreturn module.exports.default;");
      const module = { exports: {} };
      const Component = fn(module, module.exports);
      if (!cancelled) setMDXContent(() => Component);
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