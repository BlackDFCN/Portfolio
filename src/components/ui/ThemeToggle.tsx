import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';
import { useState, useEffect } from 'react';

const ICONS = {
  day: '/icons/sun.png',
  night: '/icons/moon.png',
};

export function ThemeToggle({ size = 40 }: { size?: number }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const current = theme === 'dark' ? 'night' : 'day';
  // Aumentar el tamaño del icono para mejor visibilidad
  const iconSize = size ? size + 8 : 48;

  if (!mounted) {
    // Placeholder: círculo animado (spinner minimalista)
    return (
      <span
        className="inline-block animate-spin bg-gray-200 dark:bg-gray-700 rounded-full"
        style={{ width: iconSize, height: iconSize }}
        aria-label="Cargando tema"
      />
    );
  }

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      aria-label="Cambiar tema"
      onClick={handleClick}
      className="relative flex items-center justify-center rounded-full h-10 w-10 p-0 bg-transparent transition-colors duration-200 focus:outline-none hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/20 dark:active:bg-white/20"
      style={{ boxShadow: 'none', border: 'none' }}
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
