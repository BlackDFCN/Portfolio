# 📝 PLAN DE IMPLEMENTACIÓN FORMULARIOS + PROPUESTAS

**Status**: Ready to Code ✅  
**Fecha**: Marzo 2026  
**Versión**: 1.0 Final  

---

## 🎯 OBJETIVO GENERAL

Crear un sistema de captura de leads intelligent que:
1. **Califica leads** rápidamente (Fase 1: 2-3 min)
2. **Segmenta por tipo** (Persona/PYME/Empresa × Blog/Web/E-comm/Sistema)
3. **Genera propuestas automáticas** con precios dinámicos
4. **Permite booking directo** para llamada de confirmación

---

## 📊 ARQUITECTURA DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────┐
│                    VISITANTE EN /solicitud                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │     FASE 1: LEAD QUALIFICATION       │
        │    (5 pasos, 2-3 minutos, mobile)   │
        │                                      │
        │ ✓ Información contacto               │
        │ ✓ Tipo de cliente                    │
        │ ✓ Solución que busca                 │
        │ ✓ Budget estimado                    │
        │ ✓ Confirmación + consent             │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │  LEAD CLASSIFIER (Auto-Route)        │
        │                                      │
        │ if Persona -> CLP $400-450K          │
        │ if PYME + Web -> CLP $1.5M           │
        │ if PYME + E-comm -> CLP $2M          │
        │ if Empresa + Sistema -> CLP $30M     │
        │                                      │
        │ ✓ Determine viabilidad               │
        │ ✓ Assign propuesta template          │
        │ ✓ Calculate pricing automático       │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │  FASE 2: REQUERIMIENTOS (Cond.)      │
        │   (5-15 min según tier)              │
        │                                      │
        │ Mostrar SOLO campos relevantes:      │
        │                                      │
        │ BLOG: CMS, Newsletter, SEO           │
        │ WEB: Módulos, Integraciones          │
        │ E-COMM: Pagos, Inventario            │
        │ SISTEMA: Auth, Database, Reports     │
        │                                      │
        │ ✓ Calcular refinements en precio    │
        │ ✓ Estimar timeline más preciso       │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │   PROPUESTA AUTO-GENERADA (PDF)      │
        │                                      │
        │ ✓ Logo + branding nuestro            │
        │ ✓ pricing breakdown                  │
        │ ✓ entregables itemizados             │
        │ ✓ timeline estimado                  │
        │ ✓ términos y condiciones             │
        │ ✓ botón "Agendar llamada"            │
        │                                      │
        │ Email enviado a cliente              │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │   BOOKING CALENDLY INTEGRACIÓN       │
        │                                      │
        │ ✓ 30 min discovery call              │
        │ ✓ Revisamos propuesta                │
        │ ✓ Responden preguntas                │
        │ ✓ Firman SOW si OK                   │
        └──────────────────────────────────────┘
```

---

## 📋 FASE 1: LEAD QUALIFICATION FORM (YA EXISTE)

**Archivo**: `/src/app/solicitud/page.tsx` (481 líneas)

### Estado Actual: ✅ COMPLETADO

```typescript
COMPONENTS:
├─ SolicitudPage (Main container)
│  ├─ Step 1: StepContact
│  │  ├─ name
│  │  ├─ email
│  │  └─ phone
│  ├─ Step 2: StepBusiness
│  │  ├─ company
│  │  ├─ industry
│  │  └─ business_location
│  ├─ Step 3: StepProject
│  │  ├─ solution_type (Blog/Website/E-commerce/Sistema)
│  │  ├─ main_objective
│  │  ├─ has_design
│  │  └─ has_content
│  ├─ Step 4: StepBudget (Aproximado)
│  │  ├─ estimated_budget
│  │  ├─ timeline
│  │  └─ additional_notes
│  └─ Step 5: StepConfirm
│     ├─ consent_data (GDPR compliance)
│     └─ send to API

FEATURES:
✅ Auto-save localStorage every 10s
✅ Progress bar 20%-100%
✅ Per-step validation
✅ Error handling
✅ Success confirmation screen
✅ Time tracking (2-3 min típico)
✅ Mobile-responsive
```

### API Endpoint: `/src/app/api/solicitud/route.ts`

```typescript
VALIDACIÓN:
✅ Zod schema matches form fields
✅ Rate limit 3 req/IP/15min
✅ Honeypot spam protection
✅ Resend email integration

CAMPOS ESPERADOS:
{
  name: string,
  email: string,
  phone: string,
  company: string,
  industry: string,
  business_location: string,
  solution_type: string,
  main_objective: string,
  has_design: boolean,
  has_content: boolean,
  estimated_budget: string,
  timeline: string,
  consent_data: boolean,
  additional_notes: string
}

EMAIL TEMPLATE:
Secciones claras con datos del cliente
Enviado a: leads@tudominio.cl
```

---

## 📊 FASE 2: LEAD CLASSIFIER + AUTO-ROUTING

**Archivo a crear**: `/src/lib/leadClassifier.ts` (200 líneas)

### Lógica de Segmentación

```typescript
export interface ClassifiedLead {
  leadId: string;
  segment: 'persona' | 'pyme' | 'empresa';
  productType: 'blog' | 'website' | 'ecommerce' | 'sistema';
  basePrice: number; // CLP
  estimatedDays: number;
  proposalTemplate: string;
  isQualified: boolean;
  qualificationScore: 0-100;
  nextStep: 'booking' | 'followup' | 'disqualify';
  notes: string;
}

REGLAS DE SEGMENTACIÓN:

1️⃣ PERSONA / FREELANCER (CLP $400-500K)
   IF: budget < $1M AND size = 1 person
   PRODUCTS: Blog ($400K) | Website ($450K)
   TIMELINE: 10-16 días
   SCORE: Fácil, alto margen
   
2️⃣ PYME (CLP $1.5-2.5M)
   IF: budget $1-5M AND size = 5-50 people
   PRODUCTS: Website ($1.5M) | E-commerce ($2M) | Sistema ($2.5M)
   TIMELINE: 25-40 días
   SCORE: Mediano, margen bueno
   
3️⃣ EMPRESA (CLP $6.5-30M)
   IF: budget >= $5M AND size >= 50 people
   PRODUCTS: Website ($6.5M) | E-commerce ($12M) | Sistema ($30M)
   TIMELINE: 50-160 días
   SCORE: Alto, márgenes excelentes

AUTO-DISQUALIFY:
- Persona solicitando Sistema ($30M)
- Presupuesto muy bajo (<$200K) + proyecto complex
- No consent data = no contacto
```

### Implementación

```typescript
// src/lib/leadClassifier.ts

export function classifyLead(formData: FormData): ClassifiedLead {
  const segment = determineSegment(
    formData.estimated_budget,
    formData.company
  );
  
  const productType = formData.solution_type;
  
  const basePrice = getPriceBySegmentAndProduct(
    segment,
    productType
  );
  
  const isQualified = validateQualification(
    segment,
    productType,
    formData
  );
  
  return {
    leadId: generateId(),
    segment,
    productType,
    basePrice,
    estimatedDays: getTimeline(segment, productType),
    proposalTemplate: `proposal-${segment}-${productType}`,
    isQualified,
    qualificationScore: calculateScore(formData),
    nextStep: isQualified ? 'booking' : 'followup',
    notes: generateNotes(formData)
  };
}

function determineSegment(budget: string, company: string) {
  if (budget.includes('hasta 1M') || !company) return 'persona';
  if (budget.includes('1M a 5M')) return 'pyme';
  if (budget.includes('más de 5M')) return 'empresa';
}

function getPriceBySegmentAndProduct(
  segment: string,
  product: string
): number {
  const prices = {
    persona: { blog: 400000, website: 450000 },
    pyme: { website: 1500000, ecommerce: 2000000, sistema: 2500000 },
    empresa: { website: 6500000, ecommerce: 12000000, sistema: 30000000 }
  };
  
  return prices[segment][product] || 0;
}
```

---

## 📝 FASE 3: FORMULARIOS CONDICIONALES (FASE 2)

**Archivos a crear**: `/src/components/forms/` (5 componentes)

### 3.1 Blog Form (Persona)

```typescript
// components/forms/BlogForm.tsx

CAMPOS ADICIONALES:
├─ ¿Qué temática principal? (text)
├─ ¿Con qué frecuencia publicas? (select: semanal/bisemanal/mensual)
├─ ¿Necesitas CMS para posteos? (yes/no)
├─ ¿Integrar newsletter? (yes/no)
├─ ¿SEO para 5 posts incluidos? (yes/no)
├─ ¿Integración con redes? (yes/no)
└─ ¿Fotos son tuyas o necesitas banco gratis? (select)

PRECIO ADICIONAL:
- Base: $400K
- + CMS avanzado: +$50K
- + Newsletter: +$30K
- + SEO profesional: +$50K
- Total rango: $400-530K
```

### 3.2 Website Form (Persona/PYME)

```typescript
// components/forms/WebsiteForm.tsx

CAMPOS ADICIONALES:
├─ ¿Cuántas páginas aproximadamente? (number 5-20)
├─ ¿Necesitas blog integrado? (yes/no)
├─ ¿Formularios de contacto? (yes/no)
├─ ¿Galería de proyectos? (yes/no)
├─ ¿Integración Google Maps? (yes/no)
├─ ¿Email newsletter? (yes/no)
├─ ¿Integraciones (Calendly, etc)? (multiselect)
└─ ¿Copywriting incluido en presupuesto? (yes/no)

PRECIO ADICIONAL:
- Base PYME: $1.5M
- Por integración: +$50-100K c/u
- Copywriting: +$100K
- Total rango: $1.5-2.2M
```

### 3.3 E-Commerce Form (PYME)

```typescript
// components/forms/EcommerceForm.tsx

CAMPOS ADICIONALES:
├─ ¿Cuántos productos tienen? (number 50-300)
├─ ¿Necesitas inventario en tiempo real? (yes/no)
├─ ¿Qué pasarelas de pago? (multiselect: Webpay/Stripe/Transfer)
├─ ¿Categorías complejas? (yes/no)
├─ ¿Envíos a nivel nacional? (yes/no)
├─ ¿Integración con contabilidad? (yes/no)
├─ ¿Integración con proveedor sistema? (yes/no)
├─ ¿Email transaccional?
└─ ¿Reportes de ventas?

PRECIO AJUSTE:
- Base: $2M
- Por 100 productos extra: +$100K
- Shipping integration: +$150K
- ERP integration: +$800K-1.5M (separado)
- Total rango: $2-3.5M

NOTA: Si piden ERP = cotización separada
```

### 3.4 Sistema Form (PYME/Empresa)

```typescript
// components/forms/SystemForm.tsx

CAMPOS ADICIONALES:
├─ ¿Cuántos usuarios estimados? (number 5-500)
├─ ¿Cuántos módulos principales? (number 1-10)
├─ ¿Necesitas integraciones ERP? (yes/no) ⚠️
├─ ¿Reportes avanzados / BI? (yes/no)
├─ ¿Mobile app también? (yes/no) ⚠️
├─ ¿Autenticación compleja? (SAML/OAuth/Custom) 
├─ ¿Database muy grande? (GB estimados)
├─ ¿Soporte 24/7 desde inicio? (yes/no)
└─ ¿Compliance específico? (GDPR/otros)

PRECIO AJUSTE:
- Base PYME: $2.5M
- Por integración ERP: +$500K-2M
- Mobile app: +$2M
- BI avanzado: +$300K
- Compliance: +$200K
- 24/7 support: +$500K primer año
- Total rango: $2.5-10M+

NOTA: 
- Si piden ERP + mobile = cotización separada
- Sistemas complejos = reunión antes de propuesta
```

### 3.5 Enterprise Form (Empresa)

```typescript
// components/forms/EnterpriseForm.tsx

CAMPOS ADICIONALES:
├─ ¿Arquitectura multi-locación? (yes/no)
├─ ¿Integraciones múltiples? (list: SAP/Oracle/NetSuite/etc)
├─ ¿BI / Analytics avanzado? (yes/no)
├─ ¿Internacionalización? (number de idiomas)
├─ ¿Soporte post-lanzamiento? (nivel SLA)
├─ ¿Compliance requerida?
├─ ¿Usuarios estimados? (number)
├─ ¿Escalabilidad máxima?
└─ ¿Equipo dedicado post-año 1?

NOTA: 
Estos proyectos = reunión previa obligatoria
No se puede cotizar por formulario solo
```

---

## 💾 FASE 4: PROPOSAL GENERATION ENGINE

**Archivo a crear**: `/src/lib/proposalGenerator.ts` (300 líneas)

```typescript
export interface ProposalData {
  lead: ClassifiedLead;
  formData: FormData;
  pricing: PricingBreakdown;
  timeline: TimelinePhases;
  deliverables: Deliverable[];
  terms: TermsData;
}

export function generateProposal(
  lead: ClassifiedLead,
  form2Data: FormData2
): ProposalData {
  
  const basePrice = lead.basePrice;
  
  // Calcular ajustes según requerimientos
  const adjustments = calculateAdjustments(form2Data);
  
  const finalPrice = basePrice + adjustments;
  
  const pricing = {
    basePrice,
    adjustments,
    finalPrice,
    downPayment: Math.round(finalPrice * 0.3),
    balance: Math.round(finalPrice * 0.7),
    hostingIncluded: '1 año',
    postYearCost: estimateRecurringCost(lead.segment)
  };
  
  const deliverables = getDeliverables(
    lead.segment,
    lead.productType,
    form2Data
  );
  
  const timeline = {
    phases: getPhases(lead.segment, lead.productType),
    estimatedDays: lead.estimatedDays,
    startDate: new Date(),
    endDate: addDays(new Date(), lead.estimatedDays)
  };
  
  return {
    lead,
    formData: form2Data,
    pricing,
    timeline,
    deliverables,
    terms: getTermsBySegment(lead.segment)
  };
}

function calculateAdjustments(form2Data: FormData2): number {
  let total = 0;
  
  // Blog
  if (form2Data.blogCMS) total += 50000;
  if (form2Data.newsletter) total += 30000;
  
  // Website
  if (form2Data.integrations) {
    total += form2Data.integrations.length * 50000;
  }
  
  // E-commerce
  if (form2Data.extraProducts) {
    total += (form2Data.extraProducts / 100) * 100000;
  }
  
  // Sistema
  if (form2Data.erpIntegration) total += 800000; // Separado
  
  return total;
}

function getDeliverables(
  segment: string,
  product: string,
  form2Data: FormData2
): Deliverable[] {
  
  const deliverables = [
    {
      name: 'Código fuente',
      description: 'Repositorio GitHub completo (TUYO)',
      included: true
    },
    {
      name: 'Hospedaje 1 año',
      description: segment === 'empresa' ? 'AWS' : 'Vercel',
      included: true
    }
  ];
  
  // Agregar específicos por tipo
  if (product === 'blog') {
    deliverables.push({
      name: '5 posts SEO optimizados',
      included: true
    });
  }
  
  // ... más según product
  
  return deliverables;
}
```

---

## 📧 FASE 5: PROPUESTA PDF + EMAIL

**Archivo a crear**: `/src/lib/proposalPdf.ts` (250 líneas)

```typescript
// Generar PDF con jsPDF + html2canvas

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateProposalPdf(
  proposal: ProposalData
): Promise<Buffer> {
  
  const html = renderProposalTemplate(proposal);
  
  const canvas = await html2canvas(html);
  const pdf = new jsPDF();
  
  pdf.addImage(canvas, 'PNG', 10, 10, 190, 277);
  
  return pdf.output('arraybuffer');
}

function renderProposalTemplate(proposal: ProposalData): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 40px;">
      <h1>Propuesta de Proyecto Web</h1>
      
      <section>
        <h2>Cliente</h2>
        <p>${proposal.lead.name} - ${proposal.lead.company}</p>
        <p>Email: ${proposal.lead.email}</p>
      </section>
      
      <section>
        <h2>Solución Propuesta</h2>
        <p>Tipo: ${proposal.lead.segment.toUpperCase()}</p>
        <p>Producto: ${proposal.lead.productType.toUpperCase()}</p>
      </section>
      
      <section>
        <h2>Pricing</h2>
        <table>
          <tr>
            <td>Precio Base</td>
            <td>$ ${proposal.pricing.basePrice}</td>
          </tr>
          <tr>
            <td>Ajustes</td>
            <td>$ ${proposal.pricing.adjustments}</td>
          </tr>
          <tr style="font-weight: bold;">
            <td>TOTAL PROYECTO</td>
            <td>$ ${proposal.pricing.finalPrice}</td>
          </tr>
          <tr>
            <td>Pago Inicial (30%)</td>
            <td>$ ${proposal.pricing.downPayment}</td>
          </tr>
          <tr>
            <td>Pago Balance (70%)</td>
            <td>$ ${proposal.pricing.balance}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px; color: #666;">
          ✅ Incluye hospedaje y dominio por ${proposal.pricing.hostingIncluded}
        </p>
      </section>
      
      <section>
        <h2>Entregables</h2>
        <ul>
          ${proposal.deliverables.map(d => 
            `<li>✅ ${d.name}</li>`
          ).join('')}
        </ul>
      </section>
      
      <section>
        <h2>Timeline</h2>
        <p>Duración estimada: ${proposal.timeline.estimatedDays} días</p>
        <p>Inicio: ${proposal.timeline.startDate.toLocaleDateString('es-CL')}</p>
        <p>Fin estimado: ${proposal.timeline.endDate.toLocaleDateString('es-CL')}</p>
      </section>
      
      <section>
        <h2>Próximos Pasos</h2>
        <ol>
          <li>Revisar propuesta con tu equipo</li>
          <li>Agendar llamada (link en email)</li>
          <li>Firmar Statement of Work (SOW)</li>
          <li>Realizar pago inicial</li>
          <li>¡Comenzamos!</li>
        </ol>
      </section>
      
      <footer style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; color: #666; font-size: 12px;">
        <p>Esta propuesta válida por 30 días</p>
        <p>Para preguntas: leads@tudominio.cl | +56 9 XXXX XXXX</p>
      </footer>
    </div>
  `;
}
```

---

## 📅 FASE 6: BOOKING INTEGRATION

**Archivo a crear**: `/src/lib/calendarIntegration.ts` (100 líneas)

```typescript
// Integración con Calendly (simple) o Acuity Scheduling (avanzado)

export const CALENDAR_CONFIG = {
  provider: 'calendly', // o 'acuity'
  
  // Si Calendly:
  calendlyUrl: 'https://calendly.com/tudominio/discovery-30min',
  
  // Si Acuity:
  acuityClientId: process.env.ACUITY_CLIENT_ID,
  acuityUserId: process.env.ACUITY_USER_ID,
};

export function getBookingLink(lead: ClassifiedLead): string {
  // Precarga información del cliente
  const params = new URLSearchParams({
    name: lead.name,
    email: lead.email,
    // Más campos según provider
  });
  
  return `${CALENDAR_CONFIG.calendlyUrl}?${params}`;
}

// Email con link a booking después de propuesta enviada
```

---

## 🗄️ FASE 7: DATABASE SCHEMA (Si agregamos persistencia)

```typescript
// Tabla leads
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  company VARCHAR(255),
  industry VARCHAR(100),
  business_location VARCHAR(100),
  segment VARCHAR(50), -- persona | pyme | empresa
  product_type VARCHAR(50), -- blog | website | ecommerce | sistema
  estimated_budget VARCHAR(100),
  timeline VARCHAR(100),
  additional_notes TEXT,
  consent_data BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) -- qualified | disqualified | proposal_sent | booked
);

// Tabla proposals
CREATE TABLE proposals (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  base_price INTEGER, -- CLP
  adjustments INTEGER,
  final_price INTEGER,
  pdf_url VARCHAR(500),
  template_version VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP, -- 30 dias
  status VARCHAR(50) -- draft | sent | viewed | accepted | rejected
);

// Tabla bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  proposal_id UUID REFERENCES proposals(id),
  calendar_provider VARCHAR(50),
  event_url VARCHAR(500),
  event_id VARCHAR(255),
  event_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) -- scheduled | completed | cancelled
);
```

---

## ✅ CHECKLIST IMPLEMENTACIÓN

### FASE 1: ✅ COMPLETO
- [x] Form 5-step (solicitud/page.tsx)
- [x] API endpoint (api/solicitud/route.ts)
- [x] Email template
- [x] Build passing

### FASE 2: ⏳ PRÓXIMO
- [ ] Lead classifier (leadClassifier.ts)
- [ ] Storage leads (DB o localStorage)
- [ ] Auto-route a Fase 2 correcta

### FASE 3: ⏳ PRÓXIMO
- [ ] BlogForm.tsx
- [ ] WebsiteForm.tsx
- [ ] EcommerceForm.tsx
- [ ] SystemForm.tsx
- [ ] Conditional rendering lógica

### FASE 4: ⏳ PRÓXIMO
- [ ] proposalGenerator.ts
- [ ] Pricing calculator
- [ ] Deliverables matrix

### FASE 5: ⏳ PRÓXIMO
- [ ] proposalPdf.ts (jsPDF)
- [ ] Email con PDF adjunto
- [ ] Link a booking

### FASE 6: ⏳ PRÓXIMO
- [ ] Calendly integración
- [ ] Widget embebido o link

### FASE 7: ⏳ APARTE (SI SE NECESITA)
- [ ] PostgreSQL schema
- [ ] Supabase conexión
- [ ] Queries lectura/escritura

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

**OPCIÓN 1: Implementar todo ahora (1-2 semanas)*
- Semana 1: Fase 2-3 (Classifier + Formas)
- Semana 2: Fase 4-6 (Propuestas + Booking)

**OPCIÓN 2: MVP rápido (3-5 días)
- Directamente a calendario después Fase 1
- No calcular precio automático
- Solo template simple

**OPCIÓN 3: Mejora gradual
- Fase 2 + 3 ahora
- Fase 4-6 semana que viene

**RECOMENDACIÓN**: Opción 1 (completo en 2 semanas)

---

**Documento actualizado y listo para codificación** ✅
