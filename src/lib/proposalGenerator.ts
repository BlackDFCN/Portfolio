/**
 * Proposal Generator - Genera datos detallados para la propuesta PDF/Web
 * Aplica lógica de Buffer de Tiempo (20-50%)
 */

import { ClassifiedLead } from './leadClassifier';

export interface ProposalData {
  proposalId: string;
  lead: ClassifiedLead;
  pricing: {
    basePrice: number;
    basePriceBreakdown: Array<{ item: string; amount: number; description: string }>;
    adjustments: Array<{ name: string; amount: number; description: string }>;
    subtotal: number;
    downPayment: number;
    balance: number;
    hostingIncluded: string;
    postYearCost: { min: number; max: number; description: string };
  };
  timeline: {
    startDate: Date;
    totalDays: number;
    bufferPercentage: number;
    bufferDays: number;
    totalDaysWithBuffer: number;
    endDateWithBuffer: Date;
    phases: Array<{ 
      phase: string; 
      estimatedDays: number; 
      startDay: number;
      endDay: number;
      description: string 
    }>;
  };
  deliverables: Array<{ name: string; description: string }>;
  terms: {
    paymentTerms: string;
    revisionRounds: number;
    supportIncluded: string;
    warranty: string;
  };
  expiresAt: Date;
  generatedAt: Date;
}

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function calculateBasePriceBreakdown(
  type: string,
  totalBase: number
): Array<{ item: string; amount: number; description: string }> {
  const items: Array<{ item: string; amount: number; description: string }> = [];

  switch (type) {
    case 'blog':
      items.push(
        { item: 'Core CMS Setup (Next.js/React)', amount: Math.floor(totalBase * 0.25), description: 'Infraestructura, configuración de dominio y hosting CMS.' },
        { item: 'Diseño UI & Adaptabilidad', amount: Math.floor(totalBase * 0.45), description: 'Diseño de interfaz personalizado y responsive (Mobile-first).' },
        { item: 'Estrategia SEO & Social', amount: Math.floor(totalBase * 0.2), description: 'Meta-tags, sitemaps e integración con redes sociales.' },
        { item: 'Manual & Entrenamiento', amount: Math.floor(totalBase * 0.1), description: 'Documentación para autogestión de contenidos.' }
      );
      break;
    case 'website':
      items.push(
        { item: 'Arquitectura & UX Design', amount: Math.floor(totalBase * 0.3), description: 'Estructura de navegación y prototipado visual.' },
        { item: 'Desarrollo Frontend & Performance', amount: Math.floor(totalBase * 0.4), description: 'Codificación con Next.js optimizada para velocidad (PWA Ready).' },
        { item: 'Copywriting & On-page SEO', amount: Math.floor(totalBase * 0.2), description: 'Optimización de textos y contenidos para buscadores.' },
        { item: 'Testeo de Usabilidad & Lanzamiento', amount: Math.floor(totalBase * 0.1), description: 'Pruebas en múltiples dispositivos y browsers.' }
      );
      break;
    case 'ecommerce':
      items.push(
        { item: 'Checkout Engine & Cart', amount: Math.floor(totalBase * 0.35), description: 'Lógica compleja de gestión de pedidos y carrito.' },
        { item: 'Integración Webpay/Stripe', amount: Math.floor(totalBase * 0.2), description: 'Configuración segura de pasarelas de pago (Certificación PCI).' },
        { item: 'Catálogo & Inventario', amount: Math.floor(totalBase * 0.3), description: 'Sincronización de stock y categorías dinámicas.' },
        { item: 'Logística & Despachos', amount: Math.floor(totalBase * 0.15), description: 'Integración con Courier o cálculo de costos de envío.' }
      );
      break;
    case 'sistema':
      items.push(
        { item: 'Engine / Backend Architecture', amount: Math.floor(totalBase * 0.4), description: 'Estructura de datos robusta, API design y seguridad.' },
        { item: 'Desarrollo de Módulos Custom', amount: Math.floor(totalBase * 0.3), description: 'Funcionalidades de negocio específicas solicitadas.' },
        { item: 'Gestión de Auth & Roles (RBAC)', amount: Math.floor(totalBase * 0.2), description: 'Control de accesos y seguridad granular.' },
        { item: 'Documentación de API / QA', amount: Math.floor(totalBase * 0.1), description: 'Tests automáticos y manual de integración técnica.' }
      );
      break;
    default:
      items.push({ item: 'Desarrollo Integral', amount: totalBase, description: 'Solución personalizada a medida del cliente.' });
  }

  // Ajustar redondeo para que sume exactamente el totalBase
  const sum = items.reduce((acc, curr) => acc + curr.amount, 0);
  if (sum !== totalBase && items.length > 0) {
    items[0].amount += (totalBase - sum);
  }

  return items;
}

function calculateAdjustments(
  lead: ClassifiedLead,
  phase2Data?: Record<string, any>
): Array<{ name: string; amount: number; description: string }> {
  const adjustments: Array<{ name: string; amount: number; description: string }> = [];
  if (!phase2Data) return adjustments;
  if (phase2Data.idiomas && phase2Data.idiomas.length > 1) {
    adjustments.push({
      name: 'Módulo Multi-idioma',
      amount: (phase2Data.idiomas.length - 1) * 150000,
      description: `${phase2Data.idiomas.length} idiomas configurados con i18next`,
    });
  }
  if (phase2Data.seo_avanzado) {
    adjustments.push({
      name: 'Estrategia SEO Full',
      amount: 120000,
      description: 'Auditoría técnica exhaustiva y optimización on-page completa',
    });
  }
  return adjustments;
}

export function generateProposal(
  lead: ClassifiedLead,
  phase2Data?: Record<string, any>
): ProposalData {
  const adjustments = calculateAdjustments(lead, phase2Data);
  const subtotal = lead.basePrice + adjustments.reduce((acc, adj) => acc + adj.amount, 0);

  const bufferMap = { persona: 20, pyme: 30, empresa: 50 };
  const bufferPercentage = bufferMap[lead.segment];
  const bufferDays = Math.ceil(lead.estimatedDays * (bufferPercentage / 100));
  const totalDaysWithBuffer = lead.estimatedDays + bufferDays;

  const startDate = new Date();
  const endDateWithBuffer = new Date();
  endDateWithBuffer.setDate(startDate.getDate() + totalDaysWithBuffer);

  const expiresAt = new Date();
  expiresAt.setDate(startDate.getDate() + 30);

  const basePriceBreakdown = calculateBasePriceBreakdown(lead.solution_type, lead.basePrice);

  return {
    proposalId: `PROP-${lead.leadId.split('-')[1] || Date.now()}`,
    lead,
    pricing: {
      basePrice: lead.basePrice,
      basePriceBreakdown,
      adjustments,
      subtotal,
      downPayment: Math.floor(subtotal * 0.3),
      balance: Math.floor(subtotal * 0.7),
      hostingIncluded: '1 año',
      postYearCost: { min: 100000, max: 250000, description: 'Hosting + Mantenimiento básico' },
    },
    timeline: {
      startDate,
      totalDays: lead.estimatedDays,
      bufferPercentage: bufferPercentage,
      bufferDays,
      totalDaysWithBuffer,
      endDateWithBuffer,
      phases: [
        { 
          phase: 'Descubrimiento & UX/UI', 
          estimatedDays: Math.ceil(totalDaysWithBuffer * 0.2),
          startDay: 0,
          endDay: Math.ceil(totalDaysWithBuffer * 0.2),
          description: 'Definición de requerimientos detallados y prototipos visuales.' 
        },
        { 
          phase: 'Desarrollo Core & Backend', 
          estimatedDays: Math.ceil(totalDaysWithBuffer * 0.5),
          startDay: Math.ceil(totalDaysWithBuffer * 0.2),
          endDay: Math.ceil(totalDaysWithBuffer * 0.7),
          description: 'Implementación de funcionalidades principales y lógica de servidor.' 
        },
        { 
          phase: 'QA, Ajustes & Lanzamiento', 
          estimatedDays: Math.ceil(totalDaysWithBuffer * 0.3),
          startDay: Math.ceil(totalDaysWithBuffer * 0.7),
          endDay: totalDaysWithBuffer,
          description: 'Testing exhaustivo en dispositivos, integración de contenidos y puesta en marcha.' 
        },
      ],
    },
    deliverables: [
      { name: 'Código Fuente', description: 'Acceso a repositorio privado en GitHub' },
      { name: 'Documentación', description: 'Manual de usuario y guía técnica básica' },
    ],
    terms: {
      paymentTerms: '30% inicio, 70% contra entrega final',
      revisionRounds: lead.segment === 'empresa' ? 3 : 2,
      supportIncluded: '1 mes post-lanzamiento',
      warranty: '6 meses contra bugs críticos',
    },
    expiresAt,
    generatedAt: startDate,
  };
}
