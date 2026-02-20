import { useMethodology } from '@/features/home/hooks/useMethodology';
import { useScrollReveal } from '@/hooks/useScrollReveal';

  const { methodology } = useMethodology();
  const revealRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={revealRef} className="py-12 max-w-3xl mx-auto text-center opacity-0 transition-opacity duration-700">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Metodología</h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
        {methodology}
      </p>
    </section>
  );
}
