import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateEntry = {
  count: number;
  firstRequestAt: number;
};

const rateMap = new Map<string, RateEntry>();

const getClientId = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? request.ip ?? "unknown";
};

const isRateLimited = (clientId: string) => {
  const now = Date.now();
  const entry = rateMap.get(clientId);

  if (!entry) {
    rateMap.set(clientId, { count: 1, firstRequestAt: now });
    return false;
  }

  if (now - entry.firstRequestAt > RATE_LIMIT_WINDOW) {
    rateMap.set(clientId, { count: 1, firstRequestAt: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  rateMap.set(clientId, entry);
  return false;
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(request: NextRequest) {
  const clientId = getClientId(request);
  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { message: "Demasiadas solicitudes. Intenta mas tarde." },
      { status: 429 }
    );
  }

  const body = (await request.json()) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json(
      { message: "El nombre es obligatorio." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Email invalido." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { message: "El mensaje debe tener al menos 10 caracteres." },
      { status: 400 }
    );
  }

  if (subject.length < 3) {
    return NextResponse.json(
      { message: "El asunto es obligatorio." },
      { status: 400 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (resendKey && contactEmail) {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      reply_to: email,
      subject: `${subject} | Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\n${message}`
    });
  } else {
    console.log("Contacto recibido:", { name, email, subject, message });
  }

  return NextResponse.json({ message: "Mensaje enviado correctamente." });
}
