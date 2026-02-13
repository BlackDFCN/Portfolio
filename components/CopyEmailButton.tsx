"use client";

type CopyEmailButtonProps = {
  email: string;
};

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  return (
    <button
      className="flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
      onClick={() => navigator.clipboard.writeText(email)}
      type="button"
    >
      <span className="material-symbols-outlined text-sm">content_copy</span>
      Copiar al portapapeles
    </button>
  );
}
