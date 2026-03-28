/**
 * Componente que muestra el desglose dinámico de precios
 * Se actualiza en tiempo real mientras completas Fase 2
 */

import React from 'react';
import { PriceEstimate, formatPrice } from '@/lib/priceEstimator';

interface PriceBreakdownProps {
  estimate: PriceEstimate;
  darkMode: boolean;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  estimate,
  darkMode,
}) => {
  const bgClass = darkMode
    ? 'bg-slate-900 border-slate-700 shadow-xl shadow-black/20'
    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm';
  const textClass = darkMode ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300';
  const labelClass = darkMode ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400';

  return (
    <div className={`rounded-lg border ${bgClass} p-6`}>
      <h3 className={`text-xl font-black mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        <span className='h-2 w-2 rounded-full bg-blue-600'></span>
        Desglose de Presupuesto
      </h3>

      {/* Breakdown by category */}
      <div className="space-y-6 mb-6">
        {estimate.breakdown.map((category, idx) => (
          <div key={idx}>
            <div
              className={`text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {category.category}
            </div>

            {/* Base price - Detailed Breakdown */}
            {category.category.includes('Precio Base') ? (
              <div className="space-y-2">
                {estimate.basePriceBreakdown.map((item, id) => (
                  <div key={id} className={`flex justify-between items-center py-2 px-3 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} border ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                    <div>
                      <p className={`text-xs font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.item}</p>
                      <p className={`text-[10px] ${labelClass}`}>{item.description}</p>
                    </div>
                    <span className="font-semibold text-xs ml-2">{formatPrice(item.amount)}</span>
                  </div>
                ))}
              </div>
            ) : (
              // Features, complexity, scale items
              <>
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={`py-3 px-3 mb-2 rounded border ${
                      darkMode
                        ? 'border-slate-700 bg-slate-800/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className={`font-medium text-sm ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                          ✓ {item.name}
                        </p>
                        <p className={`text-xs mt-1 ${labelClass}`}>
                          {item.description}
                        </p>
                      </div>
                      <span className="font-semibold text-green-600 whitespace-nowrap ml-2">
                        +{formatPrice(item.amount)}
                      </span>
                    </div>
                  </div>
                ))}
                <div className={`flex justify-between items-center py-2 px-3 rounded font-semibold ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <span className={labelClass}>Subtotal {category.category.split(/ /)[0]}</span>
                  <span>{formatPrice(category.subtotal)}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'} pt-4 mt-4`}>
        <div className="flex justify-between items-center mb-3 text-lg font-bold">
          <span>💰 Presupuesto Total</span>
          <span className="text-2xl text-green-600">
            {formatPrice(estimate.subtotal)}
          </span>
        </div>

        {/* Payment breakdown */}
        <div className={`rounded-xl p-5 ${darkMode ? 'bg-slate-800/50' : 'bg-blue-50/50'} border ${darkMode ? 'border-slate-700' : 'border-blue-100'}`}>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className={labelClass}>📌 Pago por Inicio (30%)</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(estimate.downPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={labelClass}>💳 Balance Final (70%)</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {formatPrice(estimate.balance)}
              </span>
            </div>
            <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-blue-200/50'} pt-3 mt-3 flex justify-between items-center font-black transition-colors`}>
              <span className={darkMode ? 'text-slate-100' : 'text-slate-900 dark:text-white'}>Total Proyecto</span>
              <span className="text-blue-600 dark:text-blue-400 text-lg">{formatPrice(estimate.subtotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-amber-50'} border ${darkMode ? 'border-slate-700' : 'border-amber-200'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`font-semibold text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                ⏱️ Tiempo Estimado (con margen de seguridad)
              </p>
              <p className={`text-xs mt-2 ${labelClass}`}>
                Incluye {estimate.bufferPercentage}% de buffer para:
              </p>
              <ul className={`text-xs mt-2 list-disc list-inside space-y-1 ${labelClass}`}>
                <li>Imprevistos técnicos</li>
                <li>Rondas de revisión adicionales</li>
                <li>Comunicación y cambios menores</li>
                <li>Testing y QA exhaustivo</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className={labelClass}>Días de desarrollo:</span>
              <span className="font-semibold">{estimate.estimatedDays} días</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={labelClass}>Buffer de seguridad ({estimate.bufferPercentage}%):</span>
              <span className="font-semibold text-amber-600">+{estimate.bufferDays} días</span>
            </div>
            <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-amber-200'} pt-2 flex justify-between items-center font-bold`}>
              <span>Total realista:</span>
              <span className="text-lg text-amber-600">
                ~{estimate.totalDaysWithBuffer} días ({Math.ceil(estimate.totalDaysWithBuffer / 5)} semanas)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {estimate.adjustments.length > 0 && (
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <p className={`text-xs ${labelClass}`}>
            💡 <strong>Este presupuesto</strong> se actualiza dinámicamente según tus respuestas. 
            {estimate.adjustments.length > 3 ? ` ${estimate.adjustments.length} opciones agregadas.` : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceBreakdown;
