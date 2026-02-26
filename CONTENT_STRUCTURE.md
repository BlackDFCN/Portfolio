# Estructura recomendada para contenido MDX

- La carpeta `content/` debe estar en la raíz del proyecto (no dentro de `src/`).
- Usa rutas absolutas con `process.cwd()` para acceder a archivos de contenido desde utilidades o server components.
- Mantén `src/` solo para código fuente (componentes, páginas, lógica).
- Esto facilita la edición, organización y compatibilidad con Next.js y Vercel.

**Ejemplo:**

```
/ (raíz del proyecto)
  /content/projects/mi-proyecto.mdx
  /src/app/...
  /src/components/...
  /public/...
  package.json
  ...
```

> Esta convención sigue las mejores prácticas actuales para proyectos Next.js modernos.
