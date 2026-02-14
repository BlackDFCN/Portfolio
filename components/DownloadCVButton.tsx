"use client";

interface DownloadCVButtonProps {
  className?: string;
  variant?: "default" | "secondary";
}

export default function DownloadCVButton({
  className = "",
  variant = "secondary"
}: DownloadCVButtonProps) {
  const baseClassName =
    "btn-lift flex items-center justify-center gap-3 rounded-full font-bold uppercase tracking-widest text-xs px-10 py-5";

  const variantClassName =
    variant === "default"
      ? "bg-black text-white shadow-lg shadow-black/10 dark:bg-white dark:text-black"
      : "border border-gray-200 bg-white text-gray-900 dark:border-white/10 dark:bg-[#0f0f0f] dark:text-white";

  const handleDownload = async () => {
    try {
      const res = await fetch("/cv/CV.pdf");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CV-BastianDev.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando CV:", error);
    }
  };

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${className}`}
      onClick={handleDownload}
      type="button"
      aria-label="Descargar curriculum vitae en formato PDF"
    >
      Descargar CV
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
    </button>
  );
}
