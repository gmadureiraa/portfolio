"use client";

import { useState } from "react";
import type { Newsletter } from "@/lib/db/newsletter";

interface Props {
  initialPosts: Newsletter[];
}

interface FormState {
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  hero_image_url: string;
  og_image_url: string;
  publish: boolean;
  published_at: string;
}

const EMPTY_FORM: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  content_md: "",
  hero_image_url: "",
  og_image_url: "",
  publish: false,
  published_at: "",
};

function fmt(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("pt-BR");
}

export function AdminNewsletterDashboard({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Newsletter[]>(initialPosts);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  async function refresh() {
    const res = await fetch("/api/admin/newsletter", { cache: "no-store" });
    const data = await res.json();
    if (data.ok) setPosts(data.items);
  }

  function startNew() {
    setEditing({ ...EMPTY_FORM });
    setFeedback("");
  }

  function startEdit(p: Newsletter) {
    setEditing({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content_md: p.content_md,
      hero_image_url: p.hero_image_url || "",
      og_image_url: p.og_image_url || "",
      publish: false,
      published_at: p.published_at
        ? new Date(p.published_at).toISOString().slice(0, 16)
        : "",
    });
    setFeedback("");
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setFeedback("");
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFeedback(`Erro: ${data.message}`);
        return;
      }
      setFeedback("Salvo.");
      setEditing(null);
      await refresh();
    } finally {
      setSaving(false);
    }
  }

  async function sendBlast(slug: string) {
    if (
      !confirm(
        `Enviar "${slug}" pra TODOS os subscribers confirmados? (irreversível)`,
      )
    ) {
      return;
    }
    setSending(slug);
    setFeedback("");
    try {
      const res = await fetch(`/api/admin/newsletter/${encodeURIComponent(slug)}/send`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.skipped) {
        setFeedback("Resend não configurado — envio simulado.");
      } else if (!data.ok) {
        setFeedback(
          `Falhou (${data.failed}/${data.recipients}). ${data.error || ""} ${data.domainWarning || ""}`,
        );
      } else {
        setFeedback(`Enviado pra ${data.sent}/${data.recipients}.`);
      }
      await refresh();
    } finally {
      setSending(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {posts.find((p) => p.slug === editing.slug)
              ? "Editando post"
              : "Novo post"}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-900"
          >
            Cancelar
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Slug *"
            hint="URL: /newsletter/<slug>. Lower-case, hifens."
            value={editing.slug}
            onChange={(v) => setEditing({ ...editing, slug: v })}
          />
          <Field
            label="Título *"
            value={editing.title}
            onChange={(v) => setEditing({ ...editing, title: v })}
          />
        </div>

        <Field
          label="Excerpt *"
          hint="1-2 linhas pra preview e OG description."
          value={editing.excerpt}
          onChange={(v) => setEditing({ ...editing, excerpt: v })}
          textarea
          rows={2}
        />

        <Field
          label="Content (Markdown) *"
          value={editing.content_md}
          onChange={(v) => setEditing({ ...editing, content_md: v })}
          textarea
          rows={20}
          mono
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Hero image URL"
            value={editing.hero_image_url}
            onChange={(v) => setEditing({ ...editing, hero_image_url: v })}
          />
          <Field
            label="OG image URL"
            value={editing.og_image_url}
            onChange={(v) => setEditing({ ...editing, og_image_url: v })}
          />
        </div>

        <div className="flex flex-col gap-3 rounded-md border border-neutral-800 bg-neutral-950 p-4">
          <label className="flex items-center gap-2 text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={editing.publish}
              onChange={(e) =>
                setEditing({ ...editing, publish: e.target.checked })
              }
            />
            Publicar agora
          </label>
          <label className="flex flex-col gap-1 text-sm text-neutral-400">
            <span>Ou publicar em data específica:</span>
            <input
              type="datetime-local"
              value={editing.published_at}
              onChange={(e) =>
                setEditing({ ...editing, published_at: e.target.value })
              }
              className="h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-foreground"
            />
          </label>
          <p className="text-xs text-neutral-500">
            Sem nenhum dos dois marcado: salva como draft.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={
              saving ||
              !editing.slug ||
              !editing.title ||
              !editing.excerpt ||
              !editing.content_md
            }
            className="h-11 rounded-md bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-neutral-200 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
          {feedback ? (
            <p className="text-sm text-neutral-400">{feedback}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        <div className="flex gap-3">
          <button
            onClick={startNew}
            className="h-10 rounded-md bg-foreground px-4 text-sm font-semibold text-background hover:bg-neutral-200"
          >
            Novo post
          </button>
          <button
            onClick={logout}
            className="h-10 rounded-md border border-neutral-700 px-4 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Sair
          </button>
        </div>
      </div>

      {feedback ? (
        <div className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-300">
          {feedback}
        </div>
      ) : null}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-8 text-center">
          <p className="text-neutral-400">Sem posts ainda.</p>
          <button
            onClick={startNew}
            className="mt-4 h-10 rounded-md bg-foreground px-4 text-sm font-semibold text-background hover:bg-neutral-200"
          >
            Criar primeiro post
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="min-w-full divide-y divide-neutral-800 text-sm">
            <thead className="bg-neutral-950">
              <tr>
                <Th>Status</Th>
                <Th>Título</Th>
                <Th>Slug</Th>
                <Th>Publicado</Th>
                <Th>Enviado</Th>
                <Th>Views</Th>
                <Th align="right">Ações</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {posts.map((p) => (
                <tr key={p.id} className="text-neutral-300">
                  <Td>
                    {p.published_at ? (
                      <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-300">
                        Publicado
                      </span>
                    ) : (
                      <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400">
                        Draft
                      </span>
                    )}
                  </Td>
                  <Td>
                    <span className="font-medium text-foreground">{p.title}</span>
                  </Td>
                  <Td>
                    <code className="text-xs text-neutral-500">{p.slug}</code>
                  </Td>
                  <Td>{fmt(p.published_at)}</Td>
                  <Td>{fmt(p.sent_at)}</Td>
                  <Td>{p.view_count}</Td>
                  <Td align="right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="rounded-md border border-neutral-700 px-3 py-1 text-xs hover:bg-neutral-900"
                      >
                        Editar
                      </button>
                      {p.published_at ? (
                        <button
                          onClick={() => sendBlast(p.slug)}
                          disabled={sending === p.slug}
                          className="rounded-md bg-foreground px-3 py-1 text-xs font-semibold text-background hover:bg-neutral-200 disabled:opacity-60"
                        >
                          {sending === p.slug ? "Enviando..." : "Enviar"}
                        </button>
                      ) : null}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  textarea,
  rows = 1,
  mono,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-300">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={`rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-foreground focus:border-neutral-500 focus:outline-none ${
            mono ? "font-mono text-sm" : "text-sm"
          }`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm text-foreground focus:border-neutral-500 focus:outline-none"
        />
      )}
      {hint ? <span className="text-xs text-neutral-500">{hint}</span> : null}
    </label>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <td className={`px-4 py-3 ${align === "right" ? "text-right" : ""}`}>
      {children}
    </td>
  );
}
