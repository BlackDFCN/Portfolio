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

// Validación de los datos esperados
const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(10, "El mensaje es muy corto"),
  honeypot: z.string().optional() // Campo trampa para bots
});

// Simple In-Memory Rate Limit per IP (Note: resets on cold starts in serverless environments, but provides base mitigation)
const rateLimit = new Map<string, { requests: number; timestamp: number }>();
const LIMIT_PER_WINDOW = 5; // max 5 emails
const WINDOW_MS = 1000 * 60 * 15; // 15 mins

export async function POST(request: Request) {
  try {
    // Basic IP-based rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    if (ip !== "unknown") {
      const clientData = rateLimit.get(ip);
      if (clientData) {
        if (now - clientData.timestamp < WINDOW_MS) {
          if (clientData.requests >= LIMIT_PER_WINDOW) {
            return NextResponse.json({ error: "Demasiadas solicitudes. Intenta más tarde." }, { status: 429 });
          }
          clientData.requests++;
        } else {
          // Reset window
          rateLimit.set(ip, { requests: 1, timestamp: now });
        }
      } else {
        rateLimit.set(ip, { requests: 1, timestamp: now });
      }
    }

    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: "Datos inválidos", details: result.error.format() }, { status: 400 });
    }

    const { name, email, message, honeypot } = result.data;

    // Protección Honeypot: si viene el campo oculto "honeypot" con valor, fingimos éxito pero no enviamos nada
    if (honeypot) {
      console.warn("Spam bot detectado por honeypot");
      return NextResponse.json({ success: true, message: "Mensaje recibido." }, { status: 200 });
    }

    // Enviar el correo a través de Resend
    const resend = getResend();
    const data = await resend.emails.send({
      from: 'Portfolio Bastián Tapia <onboarding@resend.dev>', // Usar onbording para Free tier de Resend (o tu dominio si está verificado e.g. hello@tudominio.com)
      to: 'bastiantapia.dev@gmail.com', // A dónde llegan tus correos
      subject: `Nuevo mensaje de ${name} (Contacto Portafolio)`,
      replyTo: email,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en el endpoint de contacto:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
