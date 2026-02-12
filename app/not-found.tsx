import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-max space-y-6 text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-4xl font-semibold text-ink">
          Proyecto no encontrado
        </h1>
        <p className="text-black/60">
          El proyecto solicitado no existe o fue movido.
        </p>
        <Link className="btn-primary" href="/proyectos">
          Volver al catalogo
        </Link>
      </div>
    </section>
  );
}
