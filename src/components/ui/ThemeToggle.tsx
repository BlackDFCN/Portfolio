import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';
import { useState, useEffect } from 'react';

// Iconos para los modos de tema
const ICONS = {
  day: '/icons/sun.png',
  night: '/icons/moon.png',
};

/**
 * Botón para alternar entre tema claro y oscuro.
 * Accesible, mobile first y optimizado.
 */
export function ThemeToggle({ size = 40 }: { size?: number }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Espera a que el componente esté montado para evitar problemas de hidratación
  useEffect(() => { setMounted(true); }, []);

  const current = theme === 'dark' ? 'night' : 'day';
  // Tamaño del icono, ajustable
  const iconSize = size ? size + 8 : 48;

  if (!mounted) {
    // Spinner accesible mientras se monta el componente
    return (
      <span
        className="inline-block animate-spin bg-gray-200 dark:bg-gray-700 rounded-full"
        style={{ width: iconSize, height: iconSize }}
        aria-label="Cargando tema"
      />
    );
  }

  // Alterna el tema al hacer click
  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      aria-label="Cambiar tema"
      onClick={handleClick}
      className="relative flex items-center justify-center rounded-full h-10 w-10 p-0 bg-transparent transition-transform duration-200 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
      style={{ boxShadow: 'none', border: 'none', outline: 'none', WebkitTapHighlightColor: 'transparent' }}
      title="Cambiar tema claro/oscuro"
      tabIndex={0}
    >
      <span
        className="transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
      >
        {current === 'day' ? (
          <Image src={ICONS.day} alt="Día" width={iconSize} height={iconSize} priority />
        ) : (
          <Image src={ICONS.night} alt="Noche" width={iconSize} height={iconSize} priority />
        )}
      </span>
    </button>
  );
}
// ...existing code...
