/**
 * Price Estimator - Calcula precios dinámicamente en tiempo real
 * Se actualiza mientras el usuario completa los campos de Fase 2
 */

import { ClassifiedLead, Segment, ProductType } from './leadClassifier';

export interface PriceAdjustment {
  id: string;
  name: string;
  description: string;
  amount: number;
  category: 'base' | 'features' | 'complexity' | 'scale';
}

export interface PriceEstimate {
  basePrice: number;
  basePriceBreakdown: Array<{ item: string; amount: number; description: string }>;
  adjustments: PriceAdjustment[];
  subtotal: number;
  downPayment: number;
  balance: number;
  estimatedDays: number;
  bufferDays: number;
  totalDaysWithBuffer: number;
  bufferPercentage: number;
  timelinePhases: Array<{ 
    phase: string; 
    estimatedDays: number; 
    startDay: number;
    endDay: number;
    description: string 
  }>;
  breakdown: {
    category: string;
    items: PriceAdjustment[];
    subtotal: number;
  }[];
}

/**
 * Calcula presupuesto dinámico según Fase 2
 */
export function estimatePrice(
  lead: ClassifiedLead,
  phase2Data: Record<string, any>
): PriceEstimate {
  const adjustments: PriceAdjustment[] = [];
  let extraDays = 0;

  const basePrice = lead.basePrice;
  const basePriceBreakdown: Array<{ item: string; amount: number; description: string }> = [];

  switch (lead.solution_type) {
    case 'blog':
      basePriceBreakdown.push(
        { item: 'Core CMS Setup (Next.js/React)', amount: Math.floor(basePrice * 0.25), description: 'Infraestructura, configuración de dominio y hosting CMS.' },
        { item: 'Diseño UI & Adaptabilidad', amount: Math.floor(basePrice * 0.45), description: 'Diseño de interfaz personalizado y responsive (Mobile-first).' },
        { item: 'Estrategia SEO & Social', amount: Math.floor(basePrice * 0.2), description: 'Meta-tags, sitemaps e integración con redes sociales.' },
        { item: 'Manual & Entrenamiento', amount: Math.floor(basePrice * 0.1), description: 'Documentación para autogestión de contenidos.' }
      );
      break;
    case 'website':
      basePriceBreakdown.push(
        { item: 'Arquitectura & UX Design', amount: Math.floor(basePrice * 0.3), description: 'Estructura de navegación y prototipado visual.' },
        { item: 'Desarrollo Frontend & Performance', amount: Math.floor(basePrice * 0.4), description: 'Codificación con Next.js optimizada para velocidad (PWA Ready).' },
        { item: 'Copywriting & On-page SEO', amount: Math.floor(basePrice * 0.2), description: 'Optimización de textos y contenidos para buscadores.' },
        { item: 'Testeo de Usabilidad & Lanzamiento', amount: Math.floor(basePrice * 0.1), description: 'Pruebas en múltiples dispositivos y browsers.' }
      );
      break;
    case 'ecommerce':
      basePriceBreakdown.push(
        { item: 'Checkout Engine & Cart', amount: Math.floor(basePrice * 0.35), description: 'Lógica compleja de gestión de pedidos y carrito.' },
        { item: 'Integración Webpay/Stripe', amount: Math.floor(basePrice * 0.2), description: 'Configuración segura de pasarelas de pago (Certificación PCI).' },
        { item: 'Catálogo & Inventario', amount: Math.floor(basePrice * 0.3), description: 'Sincronización de stock y categorías dinámicas.' },
        { item: 'Logística & Despachos', amount: Math.floor(basePrice * 0.15), description: 'Integración con Courier o cálculo de costos de envío.' }
      );
      break;
    case 'sistema':
      basePriceBreakdown.push(
        { item: 'Engine / Backend Architecture', amount: Math.floor(basePrice * 0.4), description: 'Estructura de datos robusta, API design y seguridad.' },
        { item: 'Desarrollo de Módulos Custom', amount: Math.floor(basePrice * 0.3), description: 'Funcionalidades de negocio específicas solicitadas.' },
        { item: 'Gestión de Auth & Roles (RBAC)', amount: Math.floor(basePrice * 0.2), description: 'Control de accesos y seguridad granular.' },
        { item: 'Documentación de API / QA', amount: Math.floor(basePrice * 0.1), description: 'Tests automáticos y manual de integración técnica.' }
      );
      break;
  }

  // ==================== WEBSITE ====================
  if (lead.solution_type === 'website') {
    // Páginas adicionales
    if (phase2Data.cantidad_paginas && phase2Data.cantidad_paginas > 10) {
      const extra = Math.ceil((phase2Data.cantidad_paginas - 10) / 5) * 75000;
      adjustments.push({
        id: 'extra_pages',
        name: 'Páginas Adicionales',
        description: `${phase2Data.cantidad_paginas} páginas (base 10)`,
        amount: extra,
        category: 'scale',
      });
      extraDays += Math.ceil((phase2Data.cantidad_paginas - 10) / 5) * 2;
    }

    // Blog integrado
    if (phase2Data.necesita_blog) {
      adjustments.push({
        id: 'integrated_blog',
        name: 'Blog Integrado',
        description: 'Sistema de posts con categorías y comentarios',
        amount: 100000,
        category: 'features',
      });
      extraDays += 3;
    }

    // Multi-idioma
    if (phase2Data.idiomas && phase2Data.idiomas > 1) {
      const multiLangCost = (phase2Data.idiomas - 1) * 150000;
      adjustments.push({
        id: 'multilangage',
        name: `Multi-idioma (${phase2Data.idiomas} idiomas)`,
        description: `Configuración y traducción para ${phase2Data.idiomas} idiomas`,
        amount: multiLangCost,
        category: 'complexity',
      });
      extraDays += 5;
    }

    // Integraciones
    if (phase2Data.integraciones && phase2Data.integraciones.length > 0) {
      const integrationPrice = phase2Data.integraciones.length * 100000;
      adjustments.push({
        id: 'integrations',
        name: 'Integraciones Avanzadas',
        description: `${phase2Data.integraciones.length} integraciones (Calendly, CRM, Zapier, etc.)`,
        amount: integrationPrice,
        category: 'features',
      });
      extraDays += phase2Data.integraciones.length * 2;
    }

    // Copywriting profesional
    if (phase2Data.copywriting_incluido) {
      adjustments.push({
        id: 'copywriting',
        name: 'Copywriting Profesional',
        description: 'Redacción estratégica de contenidos',
        amount: 150000,
        category: 'features',
      });
      extraDays += 4;
    }

    // SEO avanzado
    if (phase2Data.seo_avanzado) {
      adjustments.push({
        id: 'advanced_seo',
        name: 'Estrategia SEO Avanzada',
        description: 'Auditoría, optimización on-page, enlazado interno',
        amount: 120000,
        category: 'complexity',
      });
      extraDays += 3;
    }
  }

  // ==================== E-COMMERCE ====================
  if (lead.solution_type === 'ecommerce') {
    // Productos adicionales
    if (phase2Data.cantidad_productos && phase2Data.cantidad_productos > 100) {
      const extra = Math.ceil((phase2Data.cantidad_productos - 100) / 100) * 80000;
      adjustments.push({
        id: 'extra_products',
        name: 'Gestión de Productos',
        description: `${phase2Data.cantidad_productos} productos (setup y carga)`,
        amount: extra,
        category: 'scale',
      });
      extraDays += Math.ceil((phase2Data.cantidad_productos - 100) / 200) * 2;
    }

    // Pasarelas de pago múltiples
    if (phase2Data.pasarelas_pago && phase2Data.pasarelas_pago.length > 1) {
      const pasarelaCost = (phase2Data.pasarelas_pago.length - 1) * 80000;
      adjustments.push({
        id: 'multiple_gateways',
        name: `Múltiples Pasarelas (${phase2Data.pasarelas_pago.length})`,
        description: `Integración: ${phase2Data.pasarelas_pago.join(', ')}`,
        amount: pasarelaCost,
        category: 'features',
      });
      extraDays += 3;
    }

    // Inventario en tiempo real
    if (phase2Data.necesita_inventario_realtime) {
      adjustments.push({
        id: 'realtime_inventory',
        name: 'Gestión de Inventario Realtime',
        description: 'Stock sincronizado automáticamente',
        amount: 120000,
        category: 'complexity',
      });
      extraDays += 4;
    }

    // Sistema de envíos
    if (phase2Data.envios_nacional) {
      adjustments.push({
        id: 'shipping_system',
        name: 'Sistema de Envíos Integrado',
        description: 'Cálculo automático de costos + tracking',
        amount: 150000,
        category: 'features',
      });
      extraDays += 5;
    }

    // Integración contabilidad
    if (phase2Data.integracion_contabilidad) {
      adjustments.push({
        id: 'accounting_integration',
        name: 'Integración Contable',
        description: 'Sincronización con sistema contable',
        amount: 200000,
        category: 'complexity',
      });
      extraDays += 6;
    }

    // Integración ERP/Proveedor
    if (phase2Data.integracion_proveedor) {
      adjustments.push({
        id: 'erp_integration',
        name: 'Integración ERP/Proveedor',
        description: 'Sincronización inventario con proveedor',
        amount: 250000,
        category: 'complexity',
      });
      extraDays += 8;
    }

    // Reportes avanzados
    if (phase2Data.reportes_avanzados) {
      adjustments.push({
        id: 'advanced_reports',
        name: 'Reportes Avanzados & BI',
        description: 'Dashboards de ventas y análisis',
        amount: 180000,
        category: 'features',
      });
      extraDays += 4;
    }
  }

  // ==================== BLOG ====================
  if (lead.solution_type === 'blog') {
    // Newsletter
    if (phase2Data.newsletter) {
      adjustments.push({
        id: 'newsletter',
        name: 'Sistema de Newsletter',
        description: 'Email automático + plantilla + gestión',
        amount: 80000,
        category: 'features',
      });
      extraDays += 2;
    }

    // SEO profesional
    if (phase2Data.seo_profesional) {
      adjustments.push({
        id: 'blog_seo',
        name: 'SEO Profesional para Blog',
        description: 'Auditoría + optimización para 5-10 posts',
        amount: 100000,
        category: 'complexity',
      });
      extraDays += 3;
    }

    // CMS Avanzado
    if (phase2Data.cms_avanzado) {
      adjustments.push({
        id: 'advanced_cms',
        name: 'CMS Avanzado',
        description: 'Gestor personalizado con features custom',
        amount: 120000,
        category: 'features',
      });
      extraDays += 3;
    }

    // Multi-autor
    if (phase2Data.multi_autor) {
      adjustments.push({
        id: 'multi_author',
        name: 'Sistema Multi-Autor',
        description: 'Gestión de múltiples colaboradores y roles',
        amount: 90000,
        category: 'features',
      });
      extraDays += 2;
    }
  }

  // ==================== SISTEMA ====================
  if (lead.solution_type === 'sistema') {
    // Módulos adicionales
    if (phase2Data.modulos && phase2Data.modulos > 3) {
      const moduleCost = (phase2Data.modulos - 3) * 500000;
      adjustments.push({
        id: 'extra_modules',
        name: `Módulos Adicionales (${phase2Data.modulos})`,
        description: `${phase2Data.modulos - 3} módulos personalizados`,
        amount: moduleCost,
        category: 'scale',
      });
      extraDays += (phase2Data.modulos - 3) * 8;
    }

    // Integración ERP
    if (phase2Data.integracion_erp) {
      adjustments.push({
        id: 'sistema_erp',
        name: 'Integración ERP',
        description: 'Conexión con SAP, Oracle, NetSuite, etc.',
        amount: 1000000,
        category: 'complexity',
      });
      extraDays += 15;
    }

    // App Mobile
    if (phase2Data.mobile_app) {
      adjustments.push({
        id: 'mobile_app',
        name: 'Aplicación Mobile',
        description: 'iOS + Android nativas o React Native',
        amount: 2500000,
        category: 'complexity',
      });
      extraDays += 30;
    }

    // BI/Analytics
    if (phase2Data.bi_reportes) {
      adjustments.push({
        id: 'bi_analytics',
        name: 'BI Avanzado & Analytics',
        description: 'Dashboards, reportes, análisis predictivo',
        amount: 400000,
        category: 'features',
      });
      extraDays += 8;
    }

    // Usuarios concurrentes (escala)
    if (phase2Data.usuarios && phase2Data.usuarios > 50) {
      const userScaleCost = Math.ceil((phase2Data.usuarios - 50) / 100) * 300000;
      adjustments.push({
        id: 'user_scaling',
        name: `Escalabilidad (${phase2Data.usuarios} usuarios)`,
        description: 'Optimización para alta concurrencia',
        amount: userScaleCost,
        category: 'complexity',
      });
      extraDays += 5;
    }

    // SLA 24/7
    if (phase2Data.sla_24_7) {
      adjustments.push({
        id: 'sla_247',
        name: 'SLA 24/7 - Año 1',
        description: 'Soporte e infraestructura garantizado',
        amount: 500000,
        category: 'features',
      });
    }

    // Compliance/Seguridad
    if (phase2Data.compliance) {
      adjustments.push({
        id: 'compliance',
        name: 'Compliance & Seguridad',
        description: 'GDPR, ISO, auditorías de seguridad',
        amount: 300000,
        category: 'complexity',
      });
      extraDays += 6;
    }
  }

  const adjustmentTotal = adjustments.reduce((sum, adj) => sum + adj.amount, 0);
  const subtotal = basePrice + adjustmentTotal;

  // Agrupar ajustes por categoría
  const breakdown = [
    {
      category: '🎯 Precio Base',
      items: [],
      subtotal: basePrice,
    },
    {
      category: '✨ Features & Mejoras',
      items: adjustments.filter((a) => a.category === 'features'),
      subtotal: adjustments
        .filter((a) => a.category === 'features')
        .reduce((sum, a) => sum + a.amount, 0),
    },
    {
      category: '⚙️ Complejidad & Integraciones',
      items: adjustments.filter((a) => a.category === 'complexity'),
      subtotal: adjustments
        .filter((a) => a.category === 'complexity')
        .reduce((sum, a) => sum + a.amount, 0),
    },
    {
      category: '📈 Escala & Volumen',
      items: adjustments.filter((a) => a.category === 'scale'),
      subtotal: adjustments
        .filter((a) => a.category === 'scale')
        .reduce((sum, a) => sum + a.amount, 0),
    },
  ].filter((b) => b.items.length > 0 || b.category.includes('Precio'));

  const estimatedDays = lead.estimatedDays + extraDays;

  // ==================== CALCULAR BUFFER DE TIEMPO ====================
  // Determinar % de buffer según complejidad
  let bufferPercentage = 0;
  
  // Base: según número de ajustes (más features = más margen para imprevistos)
  if (adjustments.length === 0) {
    bufferPercentage = 20; // Proyecto simple: 20% de margen
  } else if (adjustments.length <= 3) {
    bufferPercentage = 30; // Proyecto moderado: 30% de margen
  } else if (adjustments.length <= 6) {
    bufferPercentage = 40; // Proyecto complejo: 40% de margen
  } else {
    bufferPercentage = 50; // Proyecto muy complejo: 50% de margen
  }

  // Aumentar buffer si hay integraciones especiales (más riesgosas)
  if (lead.solution_type === 'sistema' || lead.solution_type === 'ecommerce') {
    bufferPercentage += 10;
  }

  // Limitar máximo a 60%
  bufferPercentage = Math.min(bufferPercentage, 60);

  const bufferDays = Math.ceil((estimatedDays * bufferPercentage) / 100);
  const totalDaysWithBuffer = estimatedDays + bufferDays;

  const timelinePhases = [
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
  ];

  return {
    basePrice,
    basePriceBreakdown,
    adjustments,
    subtotal,
    downPayment: Math.round(subtotal * 0.3),
    balance: Math.round(subtotal * 0.7),
    estimatedDays,
    bufferDays,
    totalDaysWithBuffer,
    bufferPercentage,
    timelinePhases,
    breakdown,
  };
}

/**
 * Formatea precio en CLP
 */
export function formatPrice(amount: number): string {
  return `$${Math.round(amount).toLocaleString('es-CL')}`;
}
