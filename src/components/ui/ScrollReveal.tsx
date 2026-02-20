"use client";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import React, { useEffect } from 'react';

/**
 * Componente que envuelve sus hijos y aplica animación de aparición al hacer scroll.
 * Uso: <ScrollReveal><div>...</div></ScrollReveal>
 */
export function ScrollReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const revealRef = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={revealRef} className={`opacity-0 transition-opacity duration-700 ${className}`}>
      {children}
    </div>
  );
}
