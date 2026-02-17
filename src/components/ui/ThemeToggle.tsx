import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';

const ICONS = {
  day: '/icons/day.png',
  night: '/icons/night.png',
};

export function ThemeToggle({ size = 40 }: { size?: number }) {
  const { theme, toggleTheme } = useTheme();
  const [fade, setFade] = useState(false);
  const [current, setCurrent] = useState(theme === 'dark' ? 'night' : 'day');

  const handleClick = () => {
    setFade(true);
    setTimeout(() => {
      toggleTheme();
      setCurrent(theme === 'dark' ? 'day' : 'night');
      setTimeout(() => setFade(false), 350);
    }, 200);
  };

  return (
    <button
      aria-label="Cambiar tema"
      onClick={handleClick}
      className="relative flex items-center justify-center"
      style={{ width: size + 8, height: size + 8, boxShadow: 'none', padding: 0, borderRadius: '9999px' }}
    >
      {/* Día */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${current === 'day' && !fade ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: current === 'day' ? 2 : 1 }}
      >
        <Image src={ICONS.day} alt="Día" width={size} height={size} priority />
      </span>
      {/* Noche */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${current === 'night' && !fade ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: current === 'night' ? 2 : 1 }}
      >
        <Image src={ICONS.night} alt="Noche" width={size} height={size} priority />
      </span>
    </button>
  );
}
// ...existing code...
