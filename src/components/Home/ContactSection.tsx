import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ContactSection() {
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} className="w-full max-w-2xl mx-auto py-16 md:py-24 px-4 text-center opacity-0 transition-opacity duration-700" id="contacto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Listo para llevar tu proyecto al siguiente nivel?</h2>
      <p className="text-neutral-300 mb-8">Contáctame y conversemos sobre cómo puedo ayudarte a lograr tus objetivos.</p>
      <form className="flex flex-col gap-4 items-center">
        <ScrollReveal><input type="text" placeholder="Nombre" className="w-full max-w-md px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" required /></ScrollReveal>
        <ScrollReveal><input type="email" placeholder="Email" className="w-full max-w-md px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" required /></ScrollReveal>
        <ScrollReveal><textarea placeholder="¿En qué puedo ayudarte?" className="w-full max-w-md px-4 py-2 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]" rows={4} required /></ScrollReveal>
        <ScrollReveal><button type="submit" className="mt-2 px-8 py-3 bg-[#3b82f6] hover:bg-[#60a5fa] text-white font-bold rounded-lg shadow-lg transition-colors text-lg">Enviar mensaje</button></ScrollReveal>
      </form>
      <div className="flex justify-center gap-6 mt-8">
        <a href="mailto:bastiantapia.dev@gmail.com" className="text-[#3b82f6] hover:underline font-bold">Email</a>
        <a href="https://wa.me/56959800748" className="text-[#3b82f6] hover:underline font-bold">WhatsApp</a>
        <a href="https://linkedin.com/in/bastiantapia07" className="text-[#3b82f6] hover:underline font-bold">LinkedIn</a>
      </div>
    </section>
  );
}
