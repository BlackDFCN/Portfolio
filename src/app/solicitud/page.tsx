"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Rocket, CheckCircle2, ChevronRight, Target, Flame, FileBox, Banknote, ShieldAlert } from 'lucide-react';

export default function SolicitudPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const form = e.target as HTMLFormElement;
    
    // Obtener checkboxes de assets
    const assetCheckboxes = Array.from(form.querySelectorAll('input[name="assets"]:checked')) as HTMLInputElement[];
    const assetsData = assetCheckboxes.map(cb => cb.value);

    // Obtener checkboxes de gateways (Pasarelas Chile)
    const gatewaysCheckboxes = Array.from(form.querySelectorAll('input[name="gateways"]:checked')) as HTMLInputElement[];
    const gatewaysData = gatewaysCheckboxes.map(cb => cb.value);

    const payload = {
      // Fase 1
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,

      // Fase 2
      project_type: (form.elements.namedItem('project_type') as HTMLSelectElement).value,
      business_pain: (form.elements.namedItem('business_pain') as HTMLTextAreaElement).value,
      ticket_size: (form.elements.namedItem('ticket_size') as HTMLSelectElement).value,

      // Fase 3
      gateways: gatewaysData,
      integrations: (form.elements.namedItem('integrations') as HTMLTextAreaElement).value,
      design_status: (form.elements.namedItem('design_status') as HTMLSelectElement).value,

      // Fase 4
      assets: assetsData,
      references: (form.elements.namedItem('references') as HTMLTextAreaElement).value,

      // Fase 5
      budget: (form.elements.namedItem('budget') as HTMLSelectElement).value,
      urgency: (form.elements.namedItem('urgency') as HTMLSelectElement).value,
      consent: (form.elements.namedItem('consent') as HTMLInputElement).checked,

      // Honeypot
      honeypot: (form.elements.namedItem('honeypot') as HTMLInputElement)?.value || "",
    };

    try {
      const response = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const rawText = await response.text();
      let data: any = {};
      try { data = JSON.parse(rawText); } catch(e) {}

      if (response.ok) {
        setFormState('sent');
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.error("Status Http:", response.status, response.statusText);
        console.error("Raw response:", rawText);
        console.error("Parsed data:", data);
        
        let customErrorMsg = data.error || `HTTP ${response.status}: Error interno o validación fallida.`;
        if (data.details) {
          // Flatten Zod error dictionary
          const errs = Object.keys(data.details).filter(k => k !== '_errors');
          customErrorMsg = `Faltan campos obligatorios o son demasiado cortos: ${errs.join(', ')}`;
        }
        
        setErrorMessage(customErrorMsg);
        setFormState('error');
        window.scrollBy({ top: 300, behavior: "smooth" });
      }
    } catch (error: any) {
      console.error("Crash during fetch:", error);
      setErrorMessage(error.message || "Falla crítica en el envío.");
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen py-24 sm:py-32 flex flex-col items-center justify-center px-4 md:px-8 relative z-10 w-full animate-fade-in bg-slate-50 dark:bg-[#0a0f1c]">
      <div className="max-w-4xl w-full">
        <div className="mb-10 lg:mb-14 text-center sm:text-left">
          <Link href="/" className="text-[#2563eb] font-bold text-sm tracking-wide hover:underline mb-6 inline-flex items-center gap-2">
            ← Volver al Portfolio
          </Link>
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <span className="bg-[#2563eb]/10 text-[#2563eb] dark:bg-[#1d4ed8]/20 dark:text-[#60a5fa] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-[#2563eb]/20">
              <ShieldAlert size={14} /> Solicitud Corporativa (Discovery Base)
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Definamos los Límites Técnicos de tu <span className="text-[#2563eb]">Solución Web</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-neutral-400 font-medium max-w-3xl leading-relaxed">
            Las mejores alianzas tecnológicas se basan en expectativas y requerimientos inamovibles. Completa esta <strong>matriz de alcance técnica</strong> para enviarte una cotización formal y precisa en Peso Chileno / UF sin letras chicas.
          </p>
        </div>

        {formState === 'sent' ? (
          <div className="bg-white dark:bg-neutral-900 border border-[#2563eb]/20 rounded-3xl p-8 sm:p-14 text-center shadow-2xl animate-fade-in flex flex-col items-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Especificaciones de Arquitectura Recibidas</h2>
            <p className="text-slate-600 dark:text-neutral-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              He recibido la validación técnica total de tu proyecto. Estudiaré su viabilidad y los cuellos de botella para enviarte el requerimiento oficial junto a los honorarios en un plazo de <strong>24 a 48 horas hábiles</strong>.
            </p>
            <Link href="/" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-3 text-lg">
              Volver Atrás
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* FASE 1: Entidad / Contacto */}
            <div className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-md overflow-hidden">
              <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-white">
                <div className="bg-white/10 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold">Entidad o Persona Facturable</h3>
                  <p className="text-sm font-medium text-slate-300">Respaldo identificatorio del cliente de ingeniería.</p>
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Nombre Completo del Mandante *</label>
                  <input name="name" type="text" required disabled={formState === 'sending'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Correo Transaccional *</label>
                  <input name="email" type="email" required disabled={formState === 'sending'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Empresa Comercial (Razón Social/Proyecto)</label>
                  <input name="company" type="text" disabled={formState === 'sending'} placeholder="Ej: Importadora B2B SpA..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Número WhatsApp / Chat Directo</label>
                  <input name="phone" type="text" disabled={formState === 'sending'} placeholder="+56 9..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none transition-all font-medium" />
                </div>
              </div>
            </div>

            {/* FASE 2: Alcance Fundamental del Proyecto */}
            <div className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-md overflow-hidden">
               <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-white">
                <div className="bg-white/10 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Límites Constitutivos (Alcance Web)</h3>
                  <p className="text-sm font-medium text-slate-300">Declarar exactamente la magnitud de lo solicitado anula sorpresas.</p>
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 gap-6">
                 <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Estructura del Proyecto a Cotizar (Obligatorio)*</label>
                  <select name="project_type" required disabled={formState === 'sending'}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none font-medium appearance-none cursor-pointer">
                    <option value="">Seleccione el modelo comercial web...</option>
                    <option value="Landing Page Gráfica (1 sola página / Captura visual de Leads)">Landing Page (1 sola página / Captura de Leads o Ads) - Referencia: $150k a $350k CLP</option>
                    <option value="Sitio Corporativo Básico (Hasta 5 Pestanas)">Sitio Corporativo Pyme (Inicio, Nosotros, Servicios, etc.) - Referencia: $350k a $700k CLP</option>
                    <option value="Tienda Online / Mini E-Commerce Comercial">Tienda Online / E-Commerce (Carritos y Pagos) - Referencia: $600k a $1.2M CLP</option>
                    <option value="Sistema de Gran Escala SaaS (Plataforma o App)">Desarrollo a Medida / App Web Compleja (SaaS, Roles) - Referencia: Desde $1.5M CLP</option>
                    <option value="Auditoría / Mejora Base Crítica">Asesoría / Mejora en Plataforma Existente (Solo horas de servicio)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Dolor Analítico: ¿Qué proceso se mejorará y qué pasa si no se logra? *</label>
                  <p className="text-xs text-slate-500 mb-2">Ej: "La carga manual de presupuestos en correos no me deja crecer las ventas. Los clientes deben poder descargar PDFs automáticos".</p>
                  <textarea name="business_pain" rows={3} required disabled={formState === 'sending'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none resize-none font-medium"></textarea>
                </div>
                <div className="w-full sm:w-2/3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Rentabilidad Operativa (Tu Ticket Base / Valor venta promedio local) *</label>
                  <select name="ticket_size" required disabled={formState === 'sending'}
                    className="w-full px-4 py-3px rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none appearance-none cursor-pointer">
                    <option value="">En general, un cliente tuyo te paga...</option>
                    <option value="B2C Masivo / Minorista: Menos de $50,000 CLP / $50 USD">Masivo Retail - (Ej: Productos bajo $50.000 CLP)</option>
                    <option value="Ticket Estándar de Mercado: $50.000 a $250.000 CLP">Pymes y Mercado Genérico - ($50.000 a $250.000 CLP)</option>
                    <option value="Premium / Corportativo Menor: $250.000 a $1.000.000 CLP">Premium o Facturaciones Grandes - ($250.000 a $1.000.000 CLP)</option>
                    <option value="High Ticket Enterprise: Cierres de Más de $1 Millón CLP">High Ticket Consultivo / Licitaciones - (Más de 1.000.000 CLP / $1K USD)</option>
                    <option value="Fase de Construcción (Revisar Modelo)">Aún no tengo un MVP / No valido Ventas</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FASE 3: Integraciones y Complejidad Técnica */}
            <div className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-md overflow-hidden">
             <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-white">
                <div className="bg-white/10 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                  <Flame size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">API / Pasarelas Locales CHILE y UI</h3>
                  <p className="text-sm font-medium text-slate-300">Conexión de Software Base dentro de la región.</p>
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 gap-8">
                 <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-4">Integraciones Base Requeridas Transaccionales (Mark las requeridas)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="gateways" value="Webpay Plus / Transbank" className="w-5 h-5" />
                      <span className="text-sm font-medium">Transbank / Webpay Plus</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="gateways" value="Flow.cl Chile" className="w-5 h-5" />
                      <span className="text-sm font-medium">Flow (Pagos CL)</span>
                    </label>
                     <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="gateways" value="MercadoPago" className="w-5 h-5" />
                      <span className="text-sm font-medium">MercadoPago Checkout</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="gateways" value="Fintoc (Transferencias Nativas)" className="w-5 h-5" />
                      <span className="text-sm font-medium">Fintoc (Transferencias API)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="gateways" value="Stripe Global" className="w-5 h-5" />
                      <span className="text-sm font-medium">Stripe / PayPal (Internacional)</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">ERPs / Logística Requerida Localmente (Opcional)</label>
                    <p className="text-xs text-slate-500 mb-2">"Necesito que descuente stock en Bsale", "Factura local con Defontana", "Calcular retiros de Starken", o API Correos.</p>
                    <textarea name="integrations" rows={3} disabled={formState === 'sending'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none font-medium"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Compromiso Front-End: Diseños y Layouts *</label>
                    <select name="design_status" required disabled={formState === 'sending'}
                      className="w-full px-4 py-4 mt-2 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none appearance-none cursor-pointer">
                      <option value="">¿De dónde sacaremos el front visual?</option>
                      <option value="Diseño corporativo 100% hecho en Figma/Sketch">Hay diseño UI 100% profesional listo en Figma. Solo hay que programarlo (Front-End Only)</option>
                      <option value="Tengo un Theme/Plantilla lista en mente">Tengo una plantilla lista / Theme que me gustó (Menor costo)</option>
                      <option value="Sin Diseño - UX/UI Completa desde cero requerida">Sin diseño. Quero algo a medida diseñado desde 0 (Aumenta horas/presupuesto)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Fase 4: Entregables Base  */}
            <div className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-md overflow-hidden">
               <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-white">
                <div className="bg-white/10 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                   <FileBox size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Recursos In House (Activos Propios)</h3>
                  <p className="text-sm font-medium text-slate-300">Evidenciando que es lo que no se cotizará.</p>
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-4">¿Cuáles de esta lista tu Empresa YA POSEE totalmente activos y funcionales?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                     <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="assets" value="Identidad de Marca (Logos/Colores)" className="w-5 h-5 text-[#2563eb]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">Identidad de Marca Final o Manual</span>
                    </label>
                     <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="assets" value="Textos (Copywriting) Redactados" className="w-5 h-5 text-[#2563eb]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">Copywriting Oficial Terminado</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="assets" value="Imágenes Corporativas o Fotos de Producto" className="w-5 h-5 text-[#2563eb]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">Medios en Alta Resolución listos</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="assets" value="Dominio Comprado (NIC Chile / Godaddy)" className="w-5 h-5 text-[#2563eb]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">Dominio o NIC Chile comprado</span>
                    </label>
                     <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl cursor-pointer">
                      <input type="checkbox" name="assets" value="Infraestructura Propia de Hosting AWS / Vercel" className="w-5 h-5 text-[#2563eb]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-neutral-300">Hosting o AWS habilitado en mi tarjeta</span>
                    </label>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">URLs de Referencias o Competencia (Moodboard Obligatorio) *</label>
                   <textarea name="references" rows={3} disabled={formState === 'sending'} required placeholder="https://mercadolibre.cl (Quiero esa velocidad y el estilo)..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none transition-all resize-none font-medium"></textarea>
                </div>
              </div>
            </div>

            {/* Fase 5: Tiempos, Capital (CLP) y Firma */}
            <div className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden ring-4 ring-[#2563eb]/20">
               <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-white border-b-4 border-[#2563eb]">
                <div className="bg-white/10 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold">
                   <Banknote size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Parámetros Económicos Cierre</h3>
                  <p className="text-sm font-medium text-slate-300">Viabilidad macro antes del agendamiento.</p>
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Piso Presupuestario Factible CLP / USD (Limita alcances realistas) *</label>
                    <select name="budget" required disabled={formState === 'sending'}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none font-bold appearance-none cursor-pointer">
                      <option value="">Rango de Inversión Inicial (Realista)...</option>
                      <option value="Landing / Presencia Básica: ~$150k a ~$350k CLP">Landing Page / Sitio One-Page: Entre $150.000 y $350.000 CLP</option>
                      <option value="Sitio Empresa Normal: ~$350k a ~$700k CLP">Desarrollo Institucional Pyme (Multi-página): Entre $350.000 y $700.000 CLP</option>
                      <option value="E-Commerce / Tienda: ~$600k a ~$1.2M CLP">Tienda Online o Catálogo Dinámico: Entre $600.000 y $1.200.000 CLP</option>
                      <option value="Plataforma SaaS / Sistema a Medida: Desde ~$1.5 Millones CLP">Desarrollo App Web a Medida / SaaS: Desde $1.500.000 CLP hacia arriba</option>
                      <option value="Requiere Integración de Part Time/Horas de Codificación Remota">Requiero cotizar solo tu tarifa Hour-Rate como profesional para mi proyecto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Compromisos de Urgencia / Tiempo *</label>
                    <select name="urgency" required disabled={formState === 'sending'}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white focus:border-[#2563eb] outline-none font-bold appearance-none cursor-pointer">
                      <option value="">Restricción del Roadmap Operativo...</option>
                      <option value="Requerimiento Inmediato Absoluto (Menos de 3 Semanas) - Penaliza en Presupuesto VIP">Requerimiento Crítico-Flash (Menos de 3-4 Semanas) </option>
                      <option value="Desarrollo Escalado Normal al Trimestre (1 a 3 Meses)">Tiempo Regular y Respeto a Roadmap de Integración (1 a 3 Meses)</option>
                      <option value="Despliegue Multi-Semestre a largo plazo (6 Meses+) ">Es un desarrollo gradual que toma el resto del semestre (Más de 3 a 6 meses)</option>
                    </select>
                  </div>
                 
                  <div className="sm:col-span-2 pt-4 border-t border-slate-200 dark:border-neutral-800">
                     <label className="flex items-start gap-4 cursor-pointer group p-4 border border-slate-200 dark:border-neutral-800 rounded-xl bg-slate-50 dark:bg-neutral-900 shadow-sm hover:border-[#2563eb] transition-all">
                      <input type="checkbox" name="consent" required disabled={formState === 'sending'} className="mt-1 w-6 h-6 shrink-0 text-[#2563eb] border-slate-300 rounded focus:ring-[#2563eb] cursor-pointer" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-neutral-300 pt-1 leading-relaxed">Entiendo íntegramente que los límites especificados en esta carta de descubrimiento técnica se utilizarán legalmente y técnicamente para generar una evaluación de código e infraestructura que puede desembocar en una cotización. Acepto dar estos datos para revisión del ingeniero. *</span>
                    </label>
                  </div>
              </div>

              {formState === 'error' && (
                <div className="mx-6 md:mx-8 mb-6 p-5 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold border border-red-200 dark:border-red-900 shadow-sm flex flex-col gap-2">
                  <span className="flex items-center gap-2"><ShieldAlert size={18} /> Transmisión bloqueada (Error de Validación o Servidor)</span>
                  <span className="text-sm font-medium opacity-90">{errorMessage}</span>
                </div>
              )}

              <div className="bg-[#f8fafc] dark:bg-neutral-950 p-6 md:p-10 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-center">
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full max-w-2xl py-6 px-10 bg-[#1e293b] dark:bg-white text-white dark:text-slate-900 font-black text-xl md:text-2xl rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formState === 'sending' ? (
                    <>
                      <svg className="animate-spin h-7 w-7 text-current" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Alineando Requerimientos...
                    </>
                  ) : (
                    <>
                      Liberar Solicitud de Arquitectura <ChevronRight className="w-8 h-8" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
