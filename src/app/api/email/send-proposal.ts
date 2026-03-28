/**
 * API Route para enviar email de propuesta
 * POST /api/email/send-proposal
 */

import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendProposalRequest {
  email: string;
  name: string;
  proposalId: string;
  segment: string;
  productType: string;
  totalPrice: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendProposalRequest;

    const { email, name, proposalId, segment, productType, totalPrice } = body;

    // Validar campos
    if (!email || !name || !proposalId) {
      return Response.json(
        { error: 'Campos requeridos faltantes' },
        { status: 400 }
      );
    }

    // Crear HTML del email
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Segoe UI, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { padding: 30px; background: white; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .price { font-size: 24px; font-weight: bold; color: #2563eb; }
          .details { background: #f0f9ff; padding: 15px; border-left: 3px solid #2563eb; margin: 20px 0; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Tu propuesta está lista!</h1>
            <p>Hola ${name}</p>
          </div>
          
          <div class="content">
            <p>Nos alegra presentarte la propuesta para tu proyecto ${productType === 'blog' ? 'Blog' : productType === 'website' ? 'Website' : productType === 'ecommerce' ? 'E-Commerce' : 'Sistema'}.</p>
            
            <div class="details">
              <h3 style="margin-top: 0;">Resumen de tu Propuesta</h3>
              <p><strong>Tipo de cliente:</strong> ${segment.toUpperCase()}</p>
              <p><strong>Producto:</strong> ${productType.toUpperCase()}</p>
              <p><strong>Inversión Total (Año 1):</strong> <span class="price">CLP $${totalPrice.toLocaleString()}</span></p>
              <p><strong>Propuesta ID:</strong> <code style="background: #f5f5f5; padding: 2px 6px;">${proposalId}</code></p>
            </div>
            
            <p>Tu propuesta personalizada incluye:</p>
            <ul>
              <li>✅ Código 100% tuyo (GitHub)</li>
              <li>✅ Hospedaje + Dominio por 1 año</li>
              <li>✅ Entregables especificados</li>
              <li>✅ Timeline estimado</li>
              <li>✅ Soporte post-lanzamiento</li>
            </ul>
            
            <p align="center">
              <a href="https://tudominio.cl/solicitud" class="button">Ver Propuesta Completa</a>
            </p>
            
            <p style="color: #666; font-size: 14px;">
              <strong>¿Te gustaría revisar los detalles?</strong><br/>
              Haz clic en el botón arriba para ver toda la información de tu propuesta, incluido el desglose de precios, entregables y timeline.
            </p>
            
            <h3 style="margin-top: 30px;">Próximos pasos</h3>
            <ol>
              <li>Revisa la propuesta con tu equipo</li>
              <li>Si tienes preguntas, escríbenos sin dudar</li>
              <li>Cuando estés listo, agendamos una llamada</li>
              <li>Firmamos el contrato y comenzamos el proyecto</li>
            </ol>
            
            <p style="background: #fef3c7; border-left: 3px solid #eab308; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <strong>⏰ Nota importante:</strong> Esta propuesta es válida por 30 días. Si pasado ese tiempo aún intetas aceptarla, nos pondremos en contacto para validar que los términos sigan siendo los mismos.
            </p>
          </div>
          
          <div class="footer">
            <p>¿Preguntas sobre tu propuesta?</p>
            <p>📧 Escríbenos a: <strong>leads@tudominio.cl</strong></p>
            <p>📱 O llama: <strong>+56 9 XXXX XXXX</strong></p>
            <p style="margin-top: 20px; color: #999;">© ${new Date().getFullYear()} Tu Dominio. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email con Resend
    const result = await resend.emails.send({
      from: 'Propuestas <noreply@tudominio.cl>',
      to: email,
      subject: `Tu propuesta de ${productType} está lista - CLP $${totalPrice.toLocaleString()}`,
      html: emailHTML,
      replyTo: 'leads@tudominio.cl',
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return Response.json(
        { error: 'Error enviando email' },
        { status: 500 }
      );
    }

    // TODO: Aquí podrías guardar la propuesta en base de datos
    // await saveLead({ email, name, proposalId, segment, productType, totalPrice })

    return Response.json(
      {
        success: true,
        message: 'Propuesta enviada correctamente',
        proposalId,
        emailId: result.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in send-proposal:', error);
    return Response.json(
      {
        error: 'Error procesando solicitud',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
