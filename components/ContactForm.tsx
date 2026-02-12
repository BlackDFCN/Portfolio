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
    <form className="space-y-12" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Nombre
          </label>
          <input
            className="form-input"
            name="name"
            placeholder="Tu nombre"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Email
          </label>
          <input
            className="form-input"
            name="email"
            placeholder="tu@email.com"
            required
            type="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Asunto
        </label>
        <input
          className="form-input"
          name="subject"
          placeholder="¿En qué puedo ayudarte?"
          required
          type="text"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Mensaje
        </label>
        <textarea
          className="form-input resize-none"
          name="message"
          placeholder="Cuéntame sobre tu proyecto o propuesta técnica..."
          required
          rows={4}
        />
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <button
          className="group flex h-[64px] w-full flex-1 items-center justify-center gap-4 bg-black text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
          <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-2">
            arrow_right_alt
          </span>
        </button>
        <a
          className="group flex h-[64px] w-full flex-1 items-center justify-center gap-4 border border-black bg-white text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all hover:bg-black hover:text-white active:scale-[0.98]"
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
            status === "error" ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
