/**
 * Componente de Propuesta - Muestra la propuesta generada automáticamente
 * Incluye precios dinámicos, timeline, entregables y botón para agendar
 */

'use client';

import { useState } from 'react';
import { ProposalData, formatCLP, formatDate } from '@/lib/proposalGenerator';
import { ClassifiedLead } from '@/lib/leadClassifier';
import { estimatePrice, formatPrice } from '@/lib/priceEstimator';
import { DiscoveryScheduler } from './DiscoveryScheduler';
import PriceBreakdown from './PriceBreakdown';

interface ProposalViewProps {
  proposal: ProposalData;
  lead?: ClassifiedLead | null;
  phase2Data?: Record<string, any>;
}

export default function ProposalView({ proposal, lead, phase2Data }: ProposalViewProps) {
  const [copied, setCopied] = useState(false);

  // Calcular presupuesto dinámico si tenemos datos de Fase 2
  const priceEstimate = lead && phase2Data ? estimatePrice(lead, phase2Data) : null;
  const finalPrice = priceEstimate?.subtotal || proposal.pricing.subtotal;

  const handleCopyProposalId = () => {
    navigator.clipboard.writeText(proposal.proposalId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='max-w-4xl mx-auto space-y-6 bg-white'>
      {/* HEADER */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>📋 Tu Propuesta Personalizada</h1>
            <p className='text-blue-100 text-lg'>{proposal.lead.name} · {proposal.lead.company}</p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-blue-100'>ID de Propuesta</p>
            <button
              onClick={handleCopyProposalId}
              className='text-2xl font-mono font-bold hover:text-blue-200 cursor-pointer transition'
              title='Copiar ID'
            >
              {proposal.proposalId}
            </button>
            {copied && <p className='text-xs text-blue-100 mt-1'>✓ Copiado</p>}
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-sm'>
          <div className='bg-white/10 p-3 rounded-lg sm:bg-transparent sm:p-0'>
            <p className='text-blue-100/80 mb-1'>Segmento</p>
            <p className='font-bold text-lg leading-none'>{proposal.lead.segment.toUpperCase()}</p>
          </div>
          <div className='bg-white/10 p-3 rounded-lg sm:bg-transparent sm:p-0'>
            <p className='text-blue-100/80 mb-1'>Solución</p>
            <p className='font-bold text-lg leading-none'>{proposal.lead.solution_type.toUpperCase()}</p>
          </div>
          <div className='bg-white/10 p-3 rounded-lg sm:bg-transparent sm:p-0'>
            <p className='text-blue-100/80 mb-1'>Vencimiento</p>
            <p className='font-bold text-lg leading-none'>{formatDate(proposal.expiresAt)}</p>
          </div>
        </div>
      </div>

      {/* PRICING SECTION */}
      <div className='bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-6 sm:p-8 shadow-sm transition-colors'>
        <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6'>💰 Presupuesto</h2>

        {/* Si tenemos datos de Fase 2, mostrar desglose dinámico */}
        {priceEstimate ? (
          <PriceBreakdown estimate={priceEstimate} darkMode={false} />
        ) : (
          <div className='space-y-6'>
            <div className='pb-6 border-b border-slate-100 dark:border-slate-800'>
              <p className='text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4'>Inversión Base del Proyecto</p>
              <div className='space-y-4'>
                {proposal.pricing.basePriceBreakdown.map((item, idx) => (
                  <div key={idx} className='flex justify-between items-start gap-4'>
                    <div className='flex-1'>
                      <p className='font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base'>{item.item}</p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed'>{item.description}</p>
                    </div>
                    <span className='font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap'>{formatCLP(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-between items-center py-4 px-2 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg'>
              <span className='text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider'>Inversión Total Estimada</span>
              <span className='text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400'>{formatCLP(proposal.pricing.subtotal)}</span>
            </div>

            {/* PAYMENT TERMS */}
            <div className='bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800'>
              <p className='text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4'>Condiciones de Pago</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mb-1'>Pago por Inicio (30%)</p>
                  <p className='text-2xl font-black text-blue-600 dark:text-blue-400'>{formatCLP(proposal.pricing.downPayment)}</p>
                </div>
                <div>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mb-1'>Hito Final (70%)</p>
                  <p className='text-2xl font-black text-slate-900 dark:text-slate-100'>{formatCLP(proposal.pricing.balance)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DELIVERABLES */}
      <div className='border border-gray-200 rounded-lg p-8'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>📦 Entregables</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {proposal.deliverables.map((del, idx) => (
            <div key={idx} className='flex gap-3 p-3 bg-gray-50 rounded-lg'>
              <span className='text-2xl'>✅</span>
              <div>
                <p className='font-semibold text-slate-900'>{del.name}</p>
                <p className='text-sm text-gray-600'>{del.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className='border border-gray-200 rounded-lg p-8'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>⏱️ Cronograma</h2>

        {/* TIMELINE REALISTA CON BUFFER */}
        <div className='mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg'>
          <p className='text-sm font-semibold text-slate-900 mb-3'>
            📌 Tiempo Estimado (con margen de seguridad)
          </p>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <p className='text-xs text-gray-600'>Desarrollo</p>
              <p className='text-2xl font-bold text-slate-900'>{proposal.timeline.totalDays}</p>
              <p className='text-xs text-gray-500'>días</p>
            </div>
            <div>
              <p className='text-xs text-gray-600'>Buffer ({proposal.timeline.bufferPercentage}%)</p>
              <p className='text-2xl font-bold text-amber-600'>+{proposal.timeline.bufferDays}</p>
              <p className='text-xs text-gray-500'>días</p>
            </div>
            <div>
              <p className='text-xs text-gray-600'>Total realista</p>
              <p className='text-2xl font-bold text-blue-600'>{proposal.timeline.totalDaysWithBuffer}</p>
              <p className='text-xs text-gray-500'>~{Math.ceil(proposal.timeline.totalDaysWithBuffer / 5)} semanas</p>
            </div>
          </div>
          <p className='text-xs text-gray-700 mt-3 pt-3 border-t border-amber-200'>
            💡 El margen incluye imprevistos técnicos, rondas de revisión adicionales, testing exhaustivo y posibles cambios menores.
          </p>
        </div>

        <div className='mb-4'>
          <div className='bg-blue-50/50 p-3 rounded-md mb-4 flex items-center gap-2 text-blue-700 border border-blue-100'>
            <span className='text-xl'>🚀</span>
            <p className='text-sm italic'>
              El cronograma comienza a contar desde el <b>Kick-off del proyecto</b> (firma de contrato y recepción de materiales base).
            </p>
          </div>

          <div className='flex justify-between mb-4 px-2'>
            <div className='text-center'>
              <p className='text-[10px] uppercase text-gray-500 font-bold'>Inicio</p>
              <p className='font-bold text-gray-900'>Día T+0</p>
            </div>
            <div className='h-px flex-1 bg-gray-200 mt-6 mx-4 relative'>
              <div className='absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full'></div>
            </div>
            <div className='text-center'>
              <p className='text-[10px] uppercase text-gray-500 font-bold'>Entrega Final</p>
              <p className='font-bold text-blue-600'>Día T+{proposal.timeline.totalDaysWithBuffer}</p>
            </div>
          </div>

          <div className='space-y-3'>
            {proposal.timeline.phases.map((phase, idx) => (
              <div key={idx} className='flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100'>
                <div className='flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md'>
                  {idx + 1}
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-center mb-1'>
                    <h4 className='font-bold text-slate-900'>{phase.phase}</h4>
                    <span className='text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-full'>
                      Día {phase.startDay} - {phase.endDay}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'>{phase.description}</p>
                  <p className='text-[11px] text-gray-400 mt-1 uppercase font-semibold'>Duración estimada: {phase.estimatedDays} días</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TERMS & CONDITIONS */}
      <div className='border border-gray-200 rounded-lg p-8'>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>📋 Términos & Condiciones</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-bold text-slate-900 mb-2'>Rondas de Revisión</h3>
            <p className='text-2xl font-bold text-blue-600'>{proposal.terms.revisionRounds}</p>
            <p className='text-sm text-gray-600'>cambios incluidos</p>
          </div>

          <div>
            <h3 className='font-bold text-slate-900 mb-2'>Soporte Post-Lanzamiento</h3>
            <p className='text-lg font-semibold text-blue-600'>{proposal.terms.supportIncluded}</p>
            <p className='text-sm text-gray-600'>fixes y ajustes</p>
          </div>

          <div>
            <h3 className='font-bold text-slate-900 mb-2'>Garantía</h3>
            <p className='text-lg font-semibold text-blue-600'>{proposal.terms.warranty}</p>
            <p className='text-sm text-gray-600'>bugs y problemas</p>
          </div>

          <div>
            <h3 className='font-bold text-slate-900 mb-2'>Repositorio & Código</h3>
            <p className='text-lg font-semibold text-blue-600'>100% Tuyo</p>
            <p className='text-sm text-gray-600'>GitHub privado incluido</p>
          </div>
        </div>
      </div>

      {/* NOTES */}
      {proposal.lead.additional_notes && (
        <div className='border border-gray-200 rounded-lg p-8 bg-gray-50'>
          <h3 className='font-bold text-slate-900 mb-3'>📝 Notas del Descubrimiento</h3>
          <p className='text-gray-700 whitespace-pre-wrap'>{proposal.lead.additional_notes}</p>
        </div>
      )}

      {/* BOOKING SECTION */}
      <div className='no-print'>
        <DiscoveryScheduler 
          proposalId={proposal.proposalId} 
          lead={{
            name: proposal.lead.name,
            email: proposal.lead.email
          }} 
        />
      </div>

      <div className='flex justify-center gap-4 pt-4 no-print'>
        <button
          onClick={() => window.print()}
          className='px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition-all text-lg shadow-lg flex items-center gap-2'
        >
          🖨️ Imprimir / Guardar PDF
        </button>
      </div>

      {/* FOOTER */}
      <div className='border-t pt-6 text-center text-sm text-gray-600'>
        <p>✓ Propuesta válida hasta {formatDate(proposal.expiresAt)}</p>
        <p className='mt-2'>
          ¿Preguntas? Contáctanos: <span className='font-semibold'>leads@tudominio.cl</span> • <span className='font-semibold'>+56 9 XXXX XXXX</span>
        </p>
      </div>
    </div>
  );
}
