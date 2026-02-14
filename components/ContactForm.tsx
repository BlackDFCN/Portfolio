"use client";

import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message: string };

      if (!response.ok) {
        throw new Error(data.message || "No se pudo enviar el mensaje.");
      }

      setStatus("success");
      setMessage("Mensaje enviado. Te responderé en breve.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Error al enviar el mensaje."
      );
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[clamp(12px,0.95vw,13px)] font-bold uppercase tracking-widest text-gray-400">
            Nombre
          </label>
          <input
            className="form-input py-3 text-[clamp(14px,1.05vw,16px)]"
            id="name"
            name="name"
            placeholder="Tu nombre"
            required
            type="text"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[clamp(12px,0.95vw,13px)] font-bold uppercase tracking-widest text-gray-400">
            Email
          </label>
          <input
            className="form-input py-3 text-[clamp(14px,1.05vw,16px)]"
            id="email"
            name="email"
            placeholder="tu@email.com"
            required
            type="email"
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-[clamp(12px,0.95vw,13px)] font-bold uppercase tracking-widest text-gray-400">
          Asunto
        </label>
        <input
          className="form-input py-3 text-[clamp(14px,1.05vw,16px)]"
          id="subject"
          name="subject"
          placeholder="¿En qué puedo ayudarte?"
          required
          type="text"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-[clamp(12px,0.95vw,13px)] font-bold uppercase tracking-widest text-gray-400">
          Mensaje
        </label>
        <textarea
          className="form-input resize-none py-3 text-[clamp(14px,1.05vw,16px)]"
          id="message"
          name="message"
          placeholder="Cuéntame sobre tu proyecto o propuesta técnica..."
          required
          rows={3}
        />
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            className="contact-cta group flex h-[52px] w-full flex-1 items-center justify-center gap-2.5 bg-black text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.22em] text-white active:scale-95 dark:bg-white dark:text-black"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
        </button>
        <a
          className="contact-cta group flex h-[52px] w-full flex-1 items-center justify-center gap-2.5 border border-black bg-white text-[clamp(11px,0.9vw,12px)] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white active:scale-95 dark:border-white dark:bg-[#0f0f0f] dark:text-white dark:hover:bg-white dark:hover:text-black"
          href="https://wa.me/56900000000"
          rel="noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-base">chat</span>
          Chat por WhatsApp
        </a>
      </div>
      {message ? (
        <p
          className={`text-sm ${
            status === "error"
              ? "text-red-500"
              : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
