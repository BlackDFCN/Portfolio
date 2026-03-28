"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function WhatsAppBubble() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Retrasar la aparición ligeramente para un efecto más natural
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-30 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center ${
        isVisible ? "opacity-100 translate-y-0 scale-90 md:scale-100" : "opacity-0 translate-y-12 scale-50"
      }`}
    >
      {/* Tooltip visible solo en desktop al hacer hover en el contenedor padre */}
      <div className="absolute right-full mr-4 bg-white dark:bg-neutral-800 text-[#232a3a] dark:text-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-semibold opacity-0 whitespace-nowrap pointer-events-none transition-opacity duration-300 md:group-hover:opacity-100 hidden md:block">
        ¡Hablemos de tu proyecto!
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white dark:bg-neutral-800 transform rotate-45 -translate-y-1/2"></div>
      </div>
      
      <a
        href="https://wa.me/message/UWHVY342B7YDL1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctame por WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#25d366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25d366]/50"
      >
        <span className="absolute w-full h-full rounded-full bg-[#25d366] animate-ping opacity-20"></span>
        <FaWhatsapp className="w-7 h-7 md:w-10 md:h-10 z-10" />
      </a>
    </div>
  );
}
