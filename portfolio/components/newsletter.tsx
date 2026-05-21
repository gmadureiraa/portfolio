"use client";

export function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-100">Newsletter</h1>
      <p className="text-lg text-neutral-400 max-w-md">Em breve. Inscreva-se para receber conteúdo sobre marketing, IA e automação.</p>
      <a
        href="/"
        className="mt-4 px-6 py-3 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-200 transition-colors"
      >
        Voltar ao portfólio
      </a>
    </div>
  );
}
