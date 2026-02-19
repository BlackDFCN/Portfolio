import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b1320] text-[#b6c9e1] p-8">
      <div className="bg-[#101926]/80 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#1e293b]/40 max-w-2xl w-full">
        {/* Avatar con contorno y estado */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#2196f3] via-[#3b82f6] to-[#2de38c] p-1 shadow-lg">
              <img
                src="/avatar.png"
                alt="Testimonio Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-[#101926]"
              />
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#101926] px-4 py-1 rounded-full flex items-center gap-2 text-xs font-bold text-[#2de38c] shadow border border-[#1e293b]/60">
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span> DISPONIBLE
            </span>
          </div>
        </div>
        {/* Info principal */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
            Testimonios
          </h1>
          <p className="text-base text-[#b6c9e1] max-w-xl">
            Listado de testimonios de clientes y colegas. Foto, nombre, cargo, empresa y comentario.
          </p>
        </div>
      </div>
    </main>
  );
}
