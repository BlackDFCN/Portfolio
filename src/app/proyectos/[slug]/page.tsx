import type { Metadata } from 'next';
import path from 'path';
import fs from 'fs';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return { title: 'Proyecto no encontrado', metadataBase: new URL('http://localhost:3000') };
  }
  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    return {
      title: data.title || 'Proyecto',
      description: data.description || '',
      openGraph: {
        title: data.title || 'Proyecto',
        description: data.description || '',
        images: data.image ? [{ url: data.image }] : [],
      },
      metadataBase: new URL('http://localhost:3000'),
    };
  } catch {
    return { title: 'Proyecto', metadataBase: new URL('http://localhost:3000') };
  }
}

export default async function ProjectPage({ params }: { params: any }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/projects', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  let source = '';
  let content = '';
  let data: any = {};
  try {
    source = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(source);
    content = parsed.content;
    data = parsed.data;
  } catch (e) {
    return <article><h1>Error al leer el archivo del proyecto.</h1></article>;
  }
  if (!data.title || !data.description) {
    return <article><h1>Error: El archivo MDX carece de metadatos obligatorios.</h1></article>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-0 w-full max-w-5xl mx-auto">
      {/* Bloque principal tipo case study ejecutivo */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 bg-white dark:bg-neutral-900 rounded-b-3xl shadow-sm pt-12 pb-8 px-6 md:px-12 text-left">
        {/* Izquierda: logo, título, subtítulo, descripción */}
        <div className="flex flex-col justify-center items-start md:items-start text-left">
          <div className="mb-4">
            <span className="text-xs md:text-sm text-[#2563eb] tracking-widest mb-2 uppercase font-bold drop-shadow-sm block">
              {data.category || "PROYECTO"}
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-2 drop-shadow-xl tracking-tight break-keep max-w-full text-[#232a3a] dark:text-white">
              {data.title}
            </h1>
            {data.subtitle && (
              <h2 className="text-lg md:text-xl text-neutral-500 dark:text-neutral-300 font-medium mb-2 max-w-xl">
                {data.subtitle}
              </h2>
            )}
            {data.description && (
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-200 font-normal mb-2 max-w-xl">
                {data.description}
              </p>
            )}
          </div>
        </div>
        {/* Derecha: imagen decorativa (opcional, usa la misma imagen si no hay otra) */}
        <div className="hidden md:flex items-center justify-end h-full min-h-[320px]">
          {data.image && (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={data.image.startsWith('/') ? data.image : `/projects/${data.image}`}
                alt={data.title}
                className="object-contain rounded-2xl shadow-md w-[340px] h-[260px] bg-white dark:bg-neutral-900 border border-[#2563eb]/10"
                style={{ aspectRatio: '4/3', maxWidth: '100%', maxHeight: '320px' }}
                loading="lazy"
                width={340}
                height={260}
                decoding="async"
              />
            </div>
          )}
        </div>
      </section>
      {/* Fila de datos clave (sin Core Tech) */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 bg-white dark:bg-neutral-900 border-t border-b border-neutral-100 dark:border-neutral-800 py-4 px-6 md:px-12 text-center mb-8">
        <div>
          <span className="block text-xs text-neutral-400 uppercase tracking-widest mb-1">Rol</span>
          <span className="text-base font-semibold text-neutral-800 dark:text-white">{data.role || '-'}</span>
        </div>
        <div>
          <span className="block text-xs text-neutral-400 uppercase tracking-widest mb-1">Periodo</span>
          <span className="text-base font-semibold text-neutral-800 dark:text-white">
            {data.duration && data.date
              ? `${data.duration} (${data.date})`
              : (data.duration || data.date || '-')}
          </span>
        </div>
        <div>
          <span className="block text-xs text-neutral-400 uppercase tracking-widest mb-1">Ubicación</span>
          <span className="text-base font-semibold text-neutral-800 dark:text-white">{data.location || '-'}</span>
        </div>
      </section>
      {/* Acciones: Demo y Repositorio */}
      {(data.demo || data.repository) && (
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {data.demo && (
            <a href={data.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2563eb] text-white font-semibold shadow hover:bg-[#1e40af] transition">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
              Ver Demo
            </a>
          )}
          {data.repository && (
            <a href={data.repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#eaf1fd] text-[#2563eb] font-semibold border border-[#2563eb]/30 shadow hover:bg-[#dbeafe] transition">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z"/></svg>
              Ver Código
            </a>
          )}
        </div>
      )}
      {/* Tecnologías (todas) */}
      {data.technologies && data.technologies.length > 0 && (
        <div className="mb-8 flex flex-col items-center">
          <span className="text-base font-semibold text-[#2563eb] mb-3">Tecnologías utilizadas:</span>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.technologies.map((tech: string) => (
              <span key={tech} className="whitespace-nowrap px-3 py-1 rounded bg-[#eaf1fd] border border-[#dbeafe] text-[#2563eb] font-medium text-sm hover:bg-[#dbeafe] transition">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Bloques de información: Problema, Solución, Resultados */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 mb-10 mt-2 items-stretch justify-center">
        {data.problem && (
          <div className="flex-1 bg-[#eaf1fd] dark:bg-[#232a3a] rounded-2xl p-6 shadow flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-[#2563eb] font-bold mb-3 text-xl text-center">Problema</h3>
            <p className="text-base text-[#232a3a] dark:text-white text-center leading-normal">{data.problem}</p>
          </div>
        )}
        {data.solution && (
          <div className="flex-1 bg-[#eaf1fd] dark:bg-[#232a3a] rounded-2xl p-6 shadow flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-[#2563eb] font-bold mb-3 text-xl text-center">Solución</h3>
            <p className="text-base text-[#232a3a] dark:text-white text-center leading-normal">{data.solution}</p>
          </div>
        )}
        {data.results && (
          <div className="flex-1 bg-[#eaf1fd] dark:bg-[#232a3a] rounded-2xl p-6 shadow flex flex-col items-center">
            <h3 className="text-[#2563eb] font-bold mb-3 text-xl text-center">Resultados</h3>
            <p className="text-base text-[#232a3a] dark:text-white text-center leading-normal">{data.results}</p>
          </div>
        )}
      </div>
    </main>
  );
}
