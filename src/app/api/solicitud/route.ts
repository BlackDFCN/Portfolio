import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Validación de la solicitud con Zod (Estándar Chile / Límites de Proyecto)
const solicitudSchema = z.object({
  // Fase 1: Identificación
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  company: z.string().optional(),
  phone: z.string().optional(),

  // Fase 2: Alcance Web Exacto
  project_type: z.string().min(1, "Especifique el alcance de web a desarrollar (Landing, Sistema, etc.)"),
  business_pain: z.string().min(5, "Redacte el dolor comercial a mitigar"),
  ticket_size: z.string().min(1, "Seleccione su ticket promedio u operativa de ingresos"),

  // Fase 3: Integraciones y Diseño (Chile Local)
  gateways: z.array(z.string()).optional(),
  integrations: z.string().optional(),
  design_status: z.string().min(1, "Debe aclarar el estatus del diseño o UX"),

  // Fase 4: Activos y Referencias
  assets: z.array(z.string()).optional(),
  references: z.string().min(3, "Provea URLs como referencia de diseño y arquitectura"),

  // Fase 5: Tiempos y Honorarios (CLP)
  budget: z.string().min(1, "Indique el rango de base presupuestaria (en Pesos o UF)"),
  urgency: z.string().min(1, "El plazo límite de factibilidad"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Acepte la condición de scoping para cotizar",
  }),

  // Anti-spam
  honeypot: z.string().optional() 
});

const rateLimit = new Map<string, { requests: number; timestamp: number }>();
const LIMIT_PER_WINDOW = 3;
const WINDOW_MS = 1000 * 60 * 15; // 15 mins

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    if (ip !== "unknown") {
      const clientData = rateLimit.get(ip);
      if (clientData) {
        if (now - clientData.timestamp < WINDOW_MS) {
          if (clientData.requests >= LIMIT_PER_WINDOW) {
            return NextResponse.json({ error: "Has enviado demasiadas solicitudes (Límite IP). Intenta más tarde." }, { status: 429 });
          }
          clientData.requests++;
        } else {
          rateLimit.set(ip, { requests: 1, timestamp: now });
        }
      } else {
        rateLimit.set(ip, { requests: 1, timestamp: now });
      }
    }

    const json = await request.json();
    
    // Convertir literal strict de checkbox a boleano si viene en texto
    if (json.consent === 'true' || json.consent === true) json.consent = true;
    else json.consent = false;

    const result = solicitudSchema.safeParse(json);

    if (!result.success) {
      console.log('Zod Error:', result.error.format());
      return NextResponse.json({ error: "Faltan datos obligatorios para el Scoping Document.", details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    if (data.honeypot) {
      console.warn("Spam atrapado en Honeypot CLP form.");
      return NextResponse.json({ success: true, message: "OK simulado." }, { status: 200 });
    }

    const joinGateways = data.gateways && data.gateways.length > 0 ? data.gateways.join(', ') : 'Ninguna seleccionada.';
    const joinAssets = data.assets && data.assets.length > 0 ? data.assets.join(', ') : 'Ninguno. Asumir todo desde cero (Comprar servidor, dominios, UX).';

    const htmlEmail = `
      <div style="font-family: Arial, sans-serif; max-w: 750px; margin: auto; padding: 30px; border: 1px solid #cbd5e1; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
        <h2 style="color: #1e3a8a; border-bottom: 3px solid #1e3a8a; padding-bottom: 12px; font-weight: 900; letter-spacing: -0.5px;">📄 Blueprint Técnico (Scoping) de Lead Chile</h2>
        
        <h3 style="color: #0f172a; border-left: 5px solid #2563eb; padding-left: 10px; margin-top: 25px;">1. Facturación e Identificación</h3>
        <p><strong>Nombres y Apellidos:</strong> ${data.name}</p>
        <p><strong>Razón Social / Startup:</strong> ${data.company || 'No especificada'}</p>
        <p><strong>Mail Principal:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>WhatsApp Remoto:</strong> ${data.phone || 'No especificado'}</p>

        <h3 style="color: #0f172a; border-left: 5px solid #2563eb; padding-left: 10px; margin-top: 30px;">2. Límites Estrictos del Desarrollo (Base de SLA)</h3>
        <p style="background-color: #dbeafe; padding: 10px; border-radius: 6px; font-weight: bold; color: #1e40af;">
          <strong>Estructura Solicitada:</strong> ${data.project_type}
        </p>
        <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-weight: bold;">Dolor de Negocio (El 'Por qué' del Software):</p>
          <p style="white-space: pre-wrap; margin-top: 5px; color: #475569;">${data.business_pain}</p>
        </div>
        <p><strong>Ticket Operativo Promedio del Cliente:</strong> ${data.ticket_size}</p>

        <h3 style="color: #0f172a; border-left: 5px solid #2563eb; padding-left: 10px; margin-top: 30px;">3. Arquitectura de Integraciones Locales & UX</h3>
        <p style="color: #b91c1c; font-weight: 600;"><strong>Pasarelas de Cobro (Chile):</strong> ${joinGateways}</p>
        <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 10px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-weight: bold;">Conexiones Especiales de 3eros (ERPs, Bsale, API SII, Mailers):</p>
          <p style="white-space: pre-wrap; margin-top: 5px; color: #334155;">${data.integrations || 'Ninguna especificada.'}</p>
        </div>
        <p style="background-color: #fef08a; padding: 10px; border-radius: 6px; font-weight: bold; color: #854d0e;">
          <strong>Responsabilidad de Interfaces (UI/UX):</strong> ${data.design_status}
        </p>

        <h3 style="color: #0f172a; border-left: 5px solid #2563eb; padding-left: 10px; margin-top: 30px;">4. Activos & Assets Declarados</h3>
        <p><strong>Lo que tiene el cliente:</strong> ${joinAssets}</p>
        <div style="background-color: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 10px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-weight: bold;">Referencias Creativas o Competencia (Moodboard Legal):</p>
          <p style="white-space: pre-wrap; margin-top: 5px; color: #334155;">${data.references}</p>
        </div>

        <h3 style="color: #0f172a; border-left: 5px solid #2563eb; padding-left: 10px; margin-top: 30px;">5. Cotización Macro y Fechas</h3>
        <p style="font-size: 1.1em; border-left: 3px solid #16a34a; padding-left: 8px;"><strong>Caja / Inversión Asignada (CLP):</strong> ${data.budget}</p>
        <p style="font-size: 1.1em; border-left: 3px solid #dc2626; padding-left: 8px;"><strong>Plazo Mandatorio:</strong> ${data.urgency}</p>
        <p style="margin-top: 20px; font-size: 12px; color: #64748b;"><em>* Este requerimiento es constitutivo de un pre-acuerdo de Scoping para cotizar Desarrollo Custom. El cliente asume que adiciones extra requerirán re-presupuestación en CLP/UF.</em></p>
      </div>
    `;

    const resend = getResend();
    const resendResponse = await resend.emails.send({
      from: 'Portfolio Onboarding <onboarding@resend.dev>',
      to: 'bastiantapia.dev@gmail.com',
      subject: `Nueva Cotización Local: ${data.company || data.name} - ${data.budget.substring(0, 30)}...`,
      replyTo: data.email,
      html: htmlEmail,
    });

    if (resendResponse.error) {
      console.error("Resend Error:", resendResponse.error);
      return NextResponse.json({ error: "Error conectando con la pasarela de Mailing corporativo." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Scoping Document registrado en el CRM de Bastián." });
  } catch (error) {
    console.error("Error Endpoint Solicitud CLP:", error);
    return NextResponse.json({ error: "Error crítico procesando los parámetros de Solicitud de Desarrollo." }, { status: 500 });
  }
}
