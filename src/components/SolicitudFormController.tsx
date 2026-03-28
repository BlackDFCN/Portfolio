'use client';

import { useState, useEffect } from 'react';
import { FormDataPhase1, classifyLead, ClassifiedLead } from '@/lib/leadClassifier';
import { generateProposal, ProposalData } from '@/lib/proposalGenerator';
import ProposalView from './ProposalView';

// Import specialized forms
import { Phase1Form } from './forms/Phase1Form';
import { BlogForm } from './forms/BlogForm';
import { WebsiteForm } from './forms/WebsiteForm';
import { EcommerceForm } from './forms/EcommerceForm';
import { SystemForm } from './forms/SystemForm';

type FormPhase = 'phase1' | 'phase2' | 'proposal' | 'success' | 'loading';

export default function SolicitudFormController() {
  const [phase, setPhase] = useState<FormPhase>('phase1');
  const [formData, setFormData] = useState<FormDataPhase1 | null>(null);
  const [phase2Data, setPhase2Data] = useState<Record<string, any>>({});
  const [classifiedLead, setClassifiedLead] = useState<ClassifiedLead | null>(null);
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('solicitud_form_phase1');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
  }, []);

  const handleSubmitPhase1 = async (data: FormDataPhase1) => {
    setError('');
    setSubmitting(true);
    setFormData(data);
    try {
      localStorage.setItem('solicitud_form_phase1', JSON.stringify(data));
      const lead = classifyLead(data);
      setClassifiedLead(lead);
      if (lead.nextStep === 'propuesta_automatica') {
        const prop = generateProposal(lead);
        setProposal(prop);
        setPhase('proposal');
      } else if (lead.nextStep === 'rechazado') {
        setError('Lo sentimos, tu solicitud no cumple los criterios para nuestros servicios en este momento.');
      } else if (lead.nextStep === 'reunion_previa') {
        setError('Tu proyecto requiere una consultoría previa. Te contactaremos a la brevedad.');
      } else {
        setPhase('phase2');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitPhase2 = async (data: Record<string, any>) => {
    setError('');
    setSubmitting(true);
    setPhase2Data(data);
    try {
      if (!classifiedLead) {
        throw new Error('Error: Lead no clasificado');
      }
      const prop = generateProposal(classifiedLead, data);
      setProposal(prop);
      localStorage.setItem('proposal_data', JSON.stringify(prop));
      setPhase('proposal');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar propuesta');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToPhase1 = () => {
    setPhase('phase1');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        {phase !== 'proposal' && phase !== 'success' && (
          <div className='mb-10 max-w-3xl mx-auto px-4'>
            {/* Desktop Stepper */}
            <div className='hidden sm:flex justify-between items-center mb-4 text-sm font-bold'>
              <div className='flex items-center gap-2'>
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${phase === 'phase1' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                  {phase === 'phase1' ? '1' : '✓'}
                </span>
                <span className={phase === 'phase1' ? 'text-blue-600' : 'text-green-600'}>Información Básica</span>
              </div>
              <div className='h-px flex-1 bg-gray-200 mx-4'></div>
              <div className='flex items-center gap-2'>
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${phase === 'phase2' ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-400'}`}>
                  2
                </span>
                <span className={phase === 'phase2' ? 'text-blue-600' : 'text-gray-400'}>Detalles del Proyecto</span>
              </div>
              <div className='h-px flex-1 bg-gray-200 mx-4'></div>
              <div className='flex items-center gap-2'>
                <span className='h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400'>3</span>
                <span className='text-gray-400'>Tu Propuesta</span>
              </div>
            </div>

            {/* Mobile Stepper */}
            <div className='sm:hidden mb-4'>
              <div className='flex justify-between items-end mb-2'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-blue-600'>
                  Paso {phase === 'phase1' ? '1' : '2'} de 3
                </span>
                <span className='text-sm font-bold text-slate-800 dark:text-slate-100'>
                  {phase === 'phase1' ? 'Información Básica' : 'Detalles del Proyecto'}
                </span>
              </div>
              <div className='w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden'>
                <div 
                  className='h-full bg-blue-600 transition-all duration-700 ease-out' 
                  style={{ width: phase === 'phase1' ? '33%' : '66%' }}
                ></div>
              </div>
            </div>

            {/* Desktop Progress Bar */}
            <div className='hidden sm:block w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden'>
              <div 
                className='h-full bg-blue-600 transition-all duration-700 ease-out' 
                style={{ width: phase === 'phase1' ? '33%' : '66%' }}
              ></div>
            </div>
          </div>
        )}

        {error && phase !== 'proposal' && (
          <div className='max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3'>
            <span>⚠️</span>
            <p className='font-medium'>{error}</p>
          </div>
        )}

        {phase === 'phase1' && (
          <Phase1Form onSubmit={handleSubmitPhase1} loading={submitting} />
        )}

        {phase === 'phase2' && classifiedLead && (
          <div className='space-y-6'>
            {classifiedLead.solution_type === 'blog' && (
              <BlogForm 
                onSubmit={handleSubmitPhase2} 
                onBack={handleBackToPhase1} 
                loading={submitting} 
              />
            )}
            {classifiedLead.solution_type === 'website' && (
              <WebsiteForm 
                onSubmit={handleSubmitPhase2} 
                onBack={handleBackToPhase1} 
                loading={submitting} 
              />
            )}
            {classifiedLead.solution_type === 'ecommerce' && (
              <EcommerceForm 
                onSubmit={handleSubmitPhase2} 
                onBack={handleBackToPhase1} 
                loading={submitting} 
              />
            )}
            {classifiedLead.solution_type === 'sistema' && (
              <SystemForm 
                onSubmit={handleSubmitPhase2} 
                onBack={handleBackToPhase1} 
                loading={submitting} 
              />
            )}
          </div>
        )}

        {phase === 'proposal' && proposal && (
          <ProposalView proposal={proposal} lead={classifiedLead} phase2Data={phase2Data} />
        )}

        {phase === 'loading' && (
          <div className='bg-white border border-gray-200 rounded-lg shadow-xl p-12 text-center max-w-2xl mx-auto'>
            <div className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent'></div>
            <h2 className='mt-6 text-2xl font-bold text-gray-900'>Generando tu propuesta...</h2>
            <p className='mt-2 text-gray-600 text-lg'>Estamos calculando los mejores tiempos y costos para tu proyecto.</p>
          </div>
        )}

        {phase === 'success' && (
          <div className='bg-white border border-gray-200 rounded-lg shadow-xl p-12 text-center max-w-2xl mx-auto'>
            <div className='w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6'>
              ✓
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>¡Solicitud Enviada!</h2>
            <p className='text-gray-600 text-xl mb-8'>
              Hemos recibido tus requerimientos. En breve recibirás un correo con el resumen.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className='px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all'
            >
              Volver al Inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}