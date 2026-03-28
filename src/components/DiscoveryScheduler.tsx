'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, CheckCircle2, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

interface DiscoverySchedulerProps {
  proposalId: string;
  lead: {
    name: string;
    email: string;
  };
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '15:00', '16:00', '17:00', '18:00'
];

export function DiscoveryScheduler({ proposalId, lead }: DiscoverySchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generar próximos 10 días hábiles
  const availableDates = useMemo(() => {
    const dates = [];
    let current = new Date();
    current.setDate(current.getDate() + 1); // Empezar mañana

    while (dates.length < 10) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Lunes a Viernes
        dates.push({
          full: current.toISOString().split('T')[0],
          dayName: new Intl.DateTimeFormat('es-CL', { weekday: 'short' }).format(current),
          dayNumber: current.getDate(),
          month: new Intl.DateTimeFormat('es-CL', { month: 'short' }).format(current),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          proposalId,
          selectedDate,
          selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error al agendar');

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='bg-white border border-green-200 rounded-xl p-12 text-center animate-in fade-in zoom-in duration-300'>
        <div className='w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-green-100/50'>
          <CheckCircle2 size={48} />
        </div>
        <h2 className='text-3xl font-bold text-slate-900 mb-4'>¡Llamada Agendada!</h2>
        <div className='bg-green-50/50 rounded-lg p-6 mb-8 max-w-sm mx-auto text-left'>
          <div className='flex items-center gap-3 mb-3 text-slate-700'>
            <Calendar size={18} className='text-green-600' />
            <p className='font-semibold'>{selectedDate} (Hábiles)</p>
          </div>
          <div className='flex items-center gap-3 text-slate-700'>
            <Clock size={18} className='text-green-600' />
            <p className='font-semibold'>{selectedTime} hrs</p>
          </div>
        </div>
        <p className='text-gray-600 mb-8'>
          He recibido tu solicitud. Te enviaré una invitación formal a <b>{lead.email}</b> a la brevedad para confirmar los detalles finales.
        </p>
        <button 
          onClick={() => window.print()}
          className='w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30'
        >
          📄 Guardar Resumen de Propuesta
        </button>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden'>
      <div className='bg-slate-900 dark:bg-black p-8 text-white'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='px-2 py-1 bg-blue-600 rounded text-[10px] font-bold uppercase tracking-widest'>Fase de Inicio</div>
          <div className='h-px flex-1 bg-white/10'></div>
        </div>
        <h2 className='text-3xl font-bold mb-2'>Agendar Llamada de Inicio</h2>
        <p className='text-slate-400 text-sm'>
          Selecciona una ventana de tiempo para definir los últimos detalles y comenzar el proyecto.
        </p>
      </div>

      <div className='p-8 space-y-8'>
        {/* DATE SELECTION */}
        <section>
          <label className='flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-4'>
            <Calendar size={16} className='text-blue-600' />
            1. Selecciona el Día
          </label>
          <div className='grid grid-cols-5 md:grid-cols-10 gap-2'>
            {availableDates.map((date) => (
              <button
                key={date.full}
                onClick={() => setSelectedDate(date.full)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all group ${
                  selectedDate === date.full
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md'
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase opacity-60 mb-1 group-hover:opacity-100`}>
                  {date.dayName}
                </span>
                <span className={`text-xl font-bold`}>
                  {date.dayNumber}
                </span>
                <span className='text-[10px] uppercase font-semibold opacity-60 mt-0.5 group-hover:opacity-100'>
                  {date.month}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* TIME SELECTION */}
        <section className={!selectedDate ? 'opacity-30 pointer-events-none transition-opacity' : 'animate-in fade-in slide-in-from-top-4'}>
          <label className='flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-4'>
            <Clock size={16} className='text-blue-600' />
            2. Selecciona la Hora
          </label>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-4 rounded-xl border-2 transition-all font-bold text-center ${
                  selectedTime === time
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-sm'
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        {/* ERROR MESSAGE */}
        {error && (
          <div className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium flex items-center gap-3'>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* CONFIRMATION */}
        <div className='pt-4'>
          <button
            disabled={!selectedDate || !selectedTime || loading}
            onClick={handleSchedule}
            className={`w-full py-5 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
              !selectedDate || !selectedTime
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className='animate-spin' /> Agendando...
              </>
            ) : (
              <>
                Confirmar Llamada de Inicio <ChevronRight />
              </>
            )}
          </button>
          <p className='text-center text-[10px] text-slate-400 uppercase tracking-wider mt-6 font-bold'>
            Llamada oficial de kick-off - Notificación directa a Bastián Tapia
          </p>
        </div>
      </div>
    </div>
  );
}
