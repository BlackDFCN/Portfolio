# BastianDev Portfolio

Portfolio profesional construido con Next.js 14, App Router, TypeScript y TailwindCSS. Los proyectos se gestionan en archivos MDX locales sin base de datos ni CMS.

## Stack

- Next.js 14+ (App Router)
- TypeScript
- TailwindCSS
- MDX (contenido de proyectos)
- Resend (opcional para correo)

## Instalacion

```bash
npm install
npm run dev
```

## Estructura principal

```
/app
  layout.tsx
  page.tsx
  /contacto/page.tsx
  /proyectos/page.tsx
  /proyectos/[slug]/page.tsx
  /api/contact/route.ts
/components
/content/projects
/lib
/types
```

## Agregar un nuevo proyecto

1. Crear un archivo `.mdx` en `content/projects`.
2. Copiar la estructura de `example-template.mdx`.
3. Completar el frontmatter y el contenido.
4. El proyecto aparecera automaticamente en Home (si `featured: true`) y en el catalogo.

## Variables de entorno

Crear un archivo `.env.local`:

```
RESEND_API_KEY=
CONTACT_EMAIL=
```

Si no hay API key, el formulario hara fallback a `console.log`.

## Despliegue en Vercel

1. Importar el repositorio en Vercel.
2. Configurar las variables de entorno.
3. Ejecutar el deploy. Vercel detecta Next.js automaticamente.

## Usar como template

1. Clona el repositorio.
2. Actualiza los metadatos del sitio en `app/layout.tsx`.
3. Reemplaza los proyectos en `content/projects`.
4. Ajusta estilos y paleta en `app/globals.css` y `tailwind.config.ts`.

## Licencia

MIT
