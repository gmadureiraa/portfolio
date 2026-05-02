"use client";

import { useState } from "react";

export function AdminLogin() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Erro");
        return;
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm text-neutral-400">Senha (ADMIN_SECRET)</span>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          required
          className="h-12 rounded-md border border-neutral-700 bg-neutral-900 px-4 text-sm text-foreground focus:border-neutral-500 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !secret}
        className="h-12 rounded-md bg-foreground text-sm font-semibold text-background transition-colors hover:bg-neutral-200 disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </form>
  );
}
