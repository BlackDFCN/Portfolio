/**
 * Lead Classifier - Segmenta y clasifica leads automáticamente
 * Basado en la información de Fase 1
 */

export type Segment = 'persona' | 'pyme' | 'empresa';
export type ProductType = 'blog' | 'website' | 'ecommerce' | 'sistema';
export type NextStep = 'fase2' | 'propuesta_automatica' | 'reunion_previa' | 'rechazado';

export interface FormDataPhase1 {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  business_location: string;
  solution_type: ProductType;
  main_objective: string;
  has_design: boolean;
  has_content: boolean;
  estimated_budget: string;
  timeline: string;
  consent_data: boolean;
  additional_notes: string;
}

export interface ClassifiedLead extends FormDataPhase1 {
  leadId: string;
  segment: Segment;
  basePrice: number; // CLP
  estimatedDays: number;
  proposalTemplate: string;
  isQualified: boolean;
  qualificationScore: number; // 0-100
  nextStep: NextStep;
  notes: string;
  createdAt: string;
}

/**
 * Precios base por segmento y tipo de producto
 */
const PRICE_MATRIX: Record<Segment, Record<ProductType, number>> = {
  persona: {
    blog: 400000,
    website: 450000,
    ecommerce: 0, 
    sistema: 0, 
  },
  pyme: {
    blog: 0, 
    website: 1500000,
    ecommerce: 2000000,
    sistema: 2500000,
  },
  empresa: {
    blog: 0, 
    website: 6500000,
    ecommerce: 12000000,
    sistema: 30000000,
  },
};

/**
 * Timeline estimado en días
 */
const TIMELINE_MATRIX: Record<Segment, Record<ProductType, number>> = {
  persona: {
    blog: 12,
    website: 16,
    ecommerce: 0,
    sistema: 0,
  },
  pyme: {
    blog: 0,
    website: 30,
    ecommerce: 35,
    sistema: 40,
  },
  empresa: {
    blog: 0,
    website: 60,
    ecommerce: 75,
    sistema: 160,
  },
};

/**
 * Determina el segmento del cliente basado en presupuesto
 */
function determineSegment(budgetStr: string, company?: string): Segment {
  if (!budgetStr || budgetStr === 'sin definir') {
    if (!company || company.length < 3) return 'persona';
    if (company.length > 30) return 'empresa';
    return 'pyme';
  }
  if (budgetStr === 'bajo') return 'persona';
  if (budgetStr === 'medio') return 'pyme';
  if (budgetStr === 'alto') return 'empresa';
  return 'pyme';
}

/**
 * Valida si el cliente es apto
 */
function validateQualification(
  segment: Segment,
  product: ProductType,
  formData: FormDataPhase1
): boolean {
  if (!formData.consent_data) return false;
  if (segment === 'persona' && (product === 'sistema' || product === 'ecommerce')) return false;
  return true;
}

/**
 * Calcula un score de calificación (0-100)
 */
function calculateQualificationScore(formData: FormDataPhase1, segment: Segment): number {
  let score = 60;
  if (formData.company && formData.company.length > 3) score += 10;
  if (formData.has_design) score += 5;
  if (formData.has_content) score += 5;
  if (formData.additional_notes && formData.additional_notes.length > 50) score += 10;
  if (segment === 'empresa') score += 10;
  if (segment === 'pyme') score += 5;
  return Math.min(score, 100);
}

/**
 * Genera notas sobre el lead
 */
function generateNotes(
  formData: FormDataPhase1,
  segment: Segment,
  product: ProductType
): string {
  const notes: string[] = [];
  if (segment === 'persona') notes.push('👤 Lead individual');
  else if (segment === 'pyme') notes.push('🏢 PYME');
  else notes.push('🏛️ Empresa');
  if (product === 'sistema') notes.push('⚙️ Sistema complejo');
  if (formData.has_design) notes.push('🎨 Tiene diseño');
  else notes.push('📐 Requiere diseño');
  return notes.join(' | ');
}

/**
 * FUNCIÓN PRINCIPAL: Clasifica un lead
 */
export function classifyLead(formData: FormDataPhase1): ClassifiedLead {
  const segment = determineSegment(formData.estimated_budget, formData.company);
  const isQualified = validateQualification(segment, formData.solution_type, formData);
  const qualificationScore = calculateQualificationScore(formData, segment);
  const basePrice = PRICE_MATRIX[segment][formData.solution_type] || 0;

  let finalBasePrice = basePrice;
  if (finalBasePrice === 0) {
    if (formData.solution_type === 'blog' && segment !== 'persona') finalBasePrice = PRICE_MATRIX[segment]['website'];
    else if ((formData.solution_type === 'ecommerce' || formData.solution_type === 'sistema') && segment === 'persona') finalBasePrice = PRICE_MATRIX[segment]['website'];
  }

  const estimatedDays = TIMELINE_MATRIX[segment][formData.solution_type] || TIMELINE_MATRIX[segment]['website'] || 0;

  let nextStep: NextStep;
  if (!isQualified) nextStep = 'rechazado';
  else if (segment === 'empresa' && formData.solution_type === 'sistema') nextStep = 'reunion_previa';
  else if (qualificationScore >= 80) nextStep = 'propuesta_automatica';
  else nextStep = 'fase2';

  return {
    ...formData,
    leadId: `LEAD-${Date.now()}`,
    segment,
    basePrice: finalBasePrice,
    estimatedDays,
    proposalTemplate: `proposal-${segment}-${formData.solution_type}`,
    isQualified,
    qualificationScore,
    nextStep,
    notes: generateNotes(formData, segment, formData.solution_type),
    createdAt: new Date().toISOString(),
  };
}
