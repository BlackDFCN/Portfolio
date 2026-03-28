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

const scheduleSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  proposalId: z.string(),
  selectedDate: z.string(),
  selectedTime: z.string(),
  timezone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = scheduleSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: "Datos de agendamiento inválidos" }, { status: 400 });
    }

    const { name, email, proposalId, selectedDate, selectedTime } = result.data;

    const resend = getResend();
    
    // Email para Bastián (Notificación interna)
    const adminEmail = await resend.emails.send({
      from: 'Portfolio Bastián Tapia <onboarding@resend.dev>',
      to: 'bastiantapia.dev@gmail.com',
      subject: `📅 Agendamiento Discovery: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #2563eb;">Nuevo Agendamiento Discovery</h2>
          <p>Has recibido una nueva solicitud de llamada de inicio para un proyecto.</p>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Cliente:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>ID Propuesta:</strong> ${proposalId}</p>
            <p style="margin: 5px 0; font-size: 18px; color: #2563eb;">
              <strong>Fecha:</strong> ${selectedDate} a las ${selectedTime}
            </p>
          </div>
          
          <p>Se recomienda confirmar este horario con el cliente a la brevedad.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">Bastián Tapia Portfolio · Lead Generation System</p>
        </div>
      `,
    });

    if (adminEmail.error) {
      return NextResponse.json({ error: adminEmail.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error scheduling discovery:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
