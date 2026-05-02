"use client";

import { useState } from "react";
import { subscribe } from "@/lib/subscribe";

export function NewsletterPostFooterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const res = await subscribe(email.trim(), "madureira_post_footer");
    if (res.success) {
      setStatus("ok");
      setMessage(res.data || "Inscrito.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(res.message || "Erro.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        className="h-12 flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-4 text-sm text-foreground placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 rounded-md bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-neutral-200 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Inscrever"}
      </button>
      {message ? (
        <p
          className={`mt-2 text-xs sm:mt-0 sm:ml-3 ${
            status === "ok" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
