import { useScrollReveal } from '@/hooks/useScrollReveal';
import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function TestimonialsSection() {
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} className="w-full max-w-4xl mx-auto py-16 md:py-24 px-4 opacity-0 transition-opacity duration-700" id="testimonios">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">Testimonios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal className="bg-neutral-800 rounded-xl p-6 shadow-lg">
            <p className="text-neutral-300 mb-4">“Bastián automatizó procesos clave en nuestro restaurante, ahorrándonos horas de trabajo cada semana. ¡100% recomendado!”</p>
            <span className="text-[#3b82f6] font-bold">Gerente, Restaurante X</span>
          </ScrollReveal>
          <ScrollReveal className="bg-neutral-800 rounded-xl p-6 shadow-lg">
            <p className="text-neutral-300 mb-4">“El dashboard que desarrolló nos permitió escalar y tener control total de nuestras ventas. Excelente comunicación y resultados.”</p>
            <span className="text-[#3b82f6] font-bold">CEO, Pyme Y</span>
          </ScrollReveal>
      </div>
    </section>
  );
}
