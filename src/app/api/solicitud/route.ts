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

// Validación de la solicitud con Zod (Formulario Optimizado - 5 pasos)
const solicitudSchema = z.object({
  // Paso 1: Contacto
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(5, "Teléfono requerido"),

  // Paso 2: Tu Negocio
  company: z.string().min(2, "Nombre de empresa requerido"),
  industry: z.string().min(2, "Rubro requerido"),
  business_location: z.string().optional(),

  // Paso 3: El Proyecto
  solution_type: z.string().min(1, "Tipo de solución requerido"),
  main_objective: z.string().min(1, "Objetivo principal requerido"),
  has_design: z.boolean().optional(),
  has_content: z.boolean().optional(),

  // Paso 4: Presupuesto y Tiempos
  estimated_budget: z.string().min(1, "Presupuesto estimado requerido"),
  timeline: z.string().min(1, "Timeline requerido"),

  // Paso 5: Confirmar
  consent_data: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos para continuar",
  }),
  additional_notes: z.string().optional(),

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
    if (json.consent_data === 'true' || json.consent_data === true) json.consent_data = true;
    else json.consent_data = false;

    const result = solicitudSchema.safeParse(json);

    if (!result.success) {
      console.log('Zod Error:', result.error.format());
      return NextResponse.json({ error: "Faltan datos obligatorios para el Scoping Document.", details: result.error.format() }, { status: 400 });
    }

    const data = result.data;

    if (data.honeypot) {
      console.warn("Spam atrapado en Honeypot form.");
      return NextResponse.json({ success: true, message: "OK simulado." }, { status: 200 });
    }

    const htmlEmail = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <h1 style="color: #1e40af; margin-top: 0; font-size: 24px; border-bottom: 2px solid #2563eb; padding-bottom: 15px;">
            ✅ Nueva Solicitud de Proyecto Recibida
          </h1>

          <h2 style="color: #334155; font-size: 16px; margin-top: 20px; font-weight: 600; border-left: 3px solid #2563eb; padding-left: 10px;">
            📋 Información de Contacto
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500; width: 30%;">Nombre:</td>
              <td style="padding: 8px; color: #1e293b;">${data.name}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; color: #475569; font-weight: 500;">Email:</td>
              <td style="padding: 8px; color: #1e293b;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500;">Teléfono:</td>
              <td style="padding: 8px; color: #1e293b;">${data.phone}</td>
            </tr>
          </table>

          <h2 style="color: #334155; font-size: 16px; margin-top: 25px; font-weight: 600; border-left: 3px solid #2563eb; padding-left: 10px;">
            🏢 Información del Negocio
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500; width: 30%;">Empresa:</td>
              <td style="padding: 8px; color: #1e293b;">${data.company}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; color: #475569; font-weight: 500;">Rubro:</td>
              <td style="padding: 8px; color: #1e293b;">${data.industry}</td>
            </tr>
            ${data.business_location ? `
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500;">Ubicación:</td>
              <td style="padding: 8px; color: #1e293b;">${data.business_location}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #334155; font-size: 16px; margin-top: 25px; font-weight: 600; border-left: 3px solid #2563eb; padding-left: 10px;">
            🎯 Detalles del Proyecto
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500; width: 30%;">Tipo de Solución:</td>
              <td style="padding: 8px; color: #1e293b;">${data.solution_type}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; color: #475569; font-weight: 500;">Objetivo:</td>
              <td style="padding: 8px; color: #1e293b;">${data.main_objective}</td>
            </tr>
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500;">¿Diseño listo?</td>
              <td style="padding: 8px; color: #1e293b;">${data.has_design ? '✓ Sí' : '✗ No'}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; color: #475569; font-weight: 500;">¿Contenido listo?</td>
              <td style="padding: 8px; color: #1e293b;">${data.has_content ? '✓ Sí' : '✗ No'}</td>
            </tr>
          </table>

          <h2 style="color: #334155; font-size: 16px; margin-top: 25px; font-weight: 600; border-left: 3px solid #2563eb; padding-left: 10px;">
            💰 Presupuesto y Tiempos
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; color: #475569; font-weight: 500; width: 30%;">Presupuesto:</td>
              <td style="padding: 8px; color: #1e293b; font-weight: 500;">${data.estimated_budget}</td>
            </tr>
            <tr style="background-color: #f1f5f9;">
              <td style="padding: 8px; color: #475569; font-weight: 500;">Timeline:</td>
              <td style="padding: 8px; color: #1e293b; font-weight: 500;">${data.timeline}</td>
            </tr>
          </table>

          ${data.additional_notes ? `
          <h2 style="color: #334155; font-size: 16px; margin-top: 25px; font-weight: 600; border-left: 3px solid #2563eb; padding-left: 10px;">
            📝 Notas Adicionales
          </h2>
          <div style="background-color: #f1f5f9; padding: 12px; border-radius: 6px; margin-top: 10px; border-left: 3px solid #64748b; white-space: pre-wrap; color: #334155;">
            ${data.additional_notes}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">✓ Solicitud recibida correctamente</p>
            <p style="margin: 10px 0 0 0;">⏱️ Nos contactaremos en las próximas 24-48 horas para agendar la llamada de descubrimiento.</p>
          </div>
        </div>
      </div>
    `;

    const resend = getResend();
    const resendResponse = await resend.emails.send({
      from: 'Portfolio Onboarding <onboarding@resend.dev>',
      to: 'bastiantapia.dev@gmail.com',
      subject: `Nueva Solicitud: ${data.company || data.name}`,
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
