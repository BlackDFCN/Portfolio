"use client";
import { Button } from '@/components/ui/Button';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function CTASection() {
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} className="py-16 flex flex-col items-center opacity-0 transition-opacity duration-700">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">¿Listo para colaborar?</h2>
      <Button href="#contacto" size="xl" className="animate-pulse">
        ¡Contáctame!
      </Button>
    </section>
  );
}
