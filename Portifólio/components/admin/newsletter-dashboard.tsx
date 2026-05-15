"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import slugify from "slugify";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import type { Newsletter } from "@/lib/db/newsletter";

interface Props {
  initialPosts: Newsletter[];
}

interface FormState {
  originalSlug: string | null; // pra saber se é edit vs new
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  hero_image_url: string;
  og_image_url: string;
  publish: boolean;
  published_at: string;
  slugTouched: boolean;
}

const EMPTY_FORM: FormState = {
  originalSlug: null,
  slug: "",
  title: "",
  excerpt: "",
  content_md: "",
  hero_image_url: "",
  og_image_url: "",
  publish: false,
  published_at: "",
  slugTouched: false,
};

const MONO_CLASS = "font-mono text-[11px] uppercase tracking-[0.18em]";
const SERIF_CLASS = "font-serif italic font-light";

// ---------- helpers ----------

function fmt(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function makeSlug(s: string): string {
  return slugify(s, { lower: true, strict: true, trim: true });
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function readingTimeMin(words: number): number {
  return Math.max(1, Math.round(words / 220));
}

function postStatus(p: Newsletter): "draft" | "scheduled" | "published" {
  if (!p.published_at) return "draft";
  const d = new Date(p.published_at).getTime();
  return d > Date.now() ? "scheduled" : "published";
}

function renderMd(md: string): string {
  if (!md.trim()) return "";
  const html = marked.parse(md, { async: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "loading", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
  });
}

// ---------- main ----------

export function AdminNewsletterDashboard({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Newsletter[]>(initialPosts);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [filter, setFilter] = useState<"all" | "draft" | "scheduled" | "published">("all");
  const [search, setSearch] = useState("");
  const [autoSavedAt, setAutoSavedAt] = useState<Date | null>(null);
  const { toast } = useToast();

  // ----- data -----

  async function refresh() {
    const res = await fetch("/api/admin/newsletter", { cache: "no-store" });
    const data = await res.json();
    if (data.ok) setPosts(data.items);
  }

  // ----- local draft autosave -----
  // Salva form como rascunho local no localStorage (independente do DB).
  const DRAFT_KEY = "madureira_newsletter_draft_v1";
  const editingRef = useRef(editing);
  editingRef.current = editing;

  useEffect(() => {
    if (!editing) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(editing));
        setAutoSavedAt(new Date());
      } catch {
        // ignore quota
      }
    }, 800);
    return () => clearTimeout(t);
  }, [editing]);

  // ----- actions -----

  function startNew() {
    // tenta restaurar rascunho local se existir
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FormState;
        if (parsed && !parsed.originalSlug && (parsed.title || parsed.content_md)) {
          setEditing(parsed);
          toast({
            title: "Rascunho local restaurado",
            description: "Você tinha um rascunho sem publicar. Continuando do ponto.",
          });
          return;
        }
      }
    } catch {
      // ignore
    }
    setEditing({ ...EMPTY_FORM });
  }

  function startEdit(p: Newsletter) {
    setEditing({
      originalSlug: p.slug,
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
      slugTouched: true, // edit não auto-gera slug
    });
    setAutoSavedAt(null);
  }

  function discardEditing() {
    if (
      editing &&
      (editing.title || editing.content_md) &&
      !confirm("Descartar mudanças? O rascunho local será apagado.")
    ) {
      return;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    setEditing(null);
    setAutoSavedAt(null);
  }

  function updateField<K extends keyof FormState>(k: K, v: FormState[K]) {
    if (!editing) return;
    setEditing({ ...editing, [k]: v });
  }

  function onTitleChange(v: string) {
    if (!editing) return;
    const next: FormState = { ...editing, title: v };
    if (!editing.slugTouched && !editing.originalSlug) {
      next.slug = makeSlug(v);
    }
    setEditing(next);
  }

  function onSlugChange(v: string) {
    if (!editing) return;
    setEditing({ ...editing, slug: makeSlug(v), slugTouched: true });
  }

  async function save(opts: { andPublish?: boolean; andUnpublish?: boolean } = {}) {
    if (!editing) return;
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        slug: editing.slug,
        title: editing.title,
        excerpt: editing.excerpt,
        content_md: editing.content_md,
        hero_image_url: editing.hero_image_url,
        og_image_url: editing.og_image_url,
      };
      if (opts.andPublish) {
        payload.publish = true;
      } else if (opts.andUnpublish) {
        payload.published_at = null;
      } else if (editing.published_at) {
        payload.published_at = editing.published_at;
      } else if (editing.publish) {
        payload.publish = true;
      }

      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast({
          title: "Erro ao salvar",
          description: data.message || "Tente novamente.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: opts.andPublish
          ? "Publicado"
          : opts.andUnpublish
            ? "Despublicado"
            : "Salvo",
        description: `${editing.slug} — ${new Date().toLocaleTimeString("pt-BR")}`,
      });
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
      setEditing(null);
      setAutoSavedAt(null);
      await refresh();
    } catch (err) {
      toast({
        title: "Falha de rede",
        description: err instanceof Error ? err.message : "Tente de novo.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  async function unpublishExisting(slug: string) {
    if (!confirm(`Despublicar "${slug}"? Volta pra draft, sem deletar.`)) return;
    const res = await fetch(
      `/api/admin/newsletter/${encodeURIComponent(slug)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unpublish: true }),
      },
    );
    const data = await res.json();
    if (data.ok) {
      toast({ title: "Despublicado", description: slug });
      await refresh();
    } else {
      toast({
        title: "Erro",
        description: data.message || "Falhou.",
        variant: "destructive",
      });
    }
  }

  async function deleteExisting(slug: string) {
    if (
      !confirm(
        `EXCLUIR "${slug}"? Operação irreversível, não dá pra recuperar.`,
      )
    ) {
      return;
    }
    const res = await fetch(
      `/api/admin/newsletter/${encodeURIComponent(slug)}`,
      { method: "DELETE" },
    );
    const data = await res.json();
    if (data.ok) {
      toast({ title: "Excluído", description: slug });
      await refresh();
    } else {
      toast({
        title: "Erro",
        description: data.message || "Falhou.",
        variant: "destructive",
      });
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
    try {
      const res = await fetch(
        `/api/admin/newsletter/${encodeURIComponent(slug)}/send`,
        { method: "POST" },
      );
      const data = await res.json();
      if (data.skipped) {
        toast({
          title: "Envio simulado",
          description: "Resend não configurado.",
        });
      } else if (!data.ok) {
        toast({
          title: "Envio com falhas",
          description: `${data.failed}/${data.recipients} falharam. ${data.error || ""}`.trim(),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Enviado",
          description: `${data.sent}/${data.recipients} entregues.`,
        });
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

  // ----- derived state -----

  const counts = useMemo(() => {
    const c = { all: posts.length, draft: 0, scheduled: 0, published: 0 };
    for (const p of posts) c[postStatus(p)]++;
    return c;
  }, [posts]);

  const visiblePosts = useMemo(() => {
    let arr = posts;
    if (filter !== "all") arr = arr.filter((p) => postStatus(p) === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q),
      );
    }
    return arr;
  }, [posts, filter, search]);

  const slugDuplicate = useMemo(() => {
    if (!editing || !editing.slug) return false;
    return posts.some(
      (p) => p.slug === editing.slug && p.slug !== editing.originalSlug,
    );
  }, [editing, posts]);

  const previewHtml = useMemo(
    () => (editing ? renderMd(editing.content_md) : ""),
    [editing?.content_md],
  );

  const editorWords = editing ? wordCount(editing.content_md) : 0;
  const editorReadMin = readingTimeMin(editorWords);

  // ====================================================================
  // EDITOR VIEW
  // ====================================================================
  if (editing) {
    const isEditMode = Boolean(editing.originalSlug);
    const titleEmpty = !editing.title.trim();
    const excerptEmpty = !editing.excerpt.trim();
    const bodyEmpty = !editing.content_md.trim();
    const slugEmpty = !editing.slug.trim();
    const canSave = !titleEmpty && !excerptEmpty && !bodyEmpty && !slugEmpty && !slugDuplicate;

    return (
      <div className="flex flex-col gap-6">
        {/* Editor header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className={`${MONO_CLASS} text-muted-foreground`}>
              {isEditMode ? "Editando" : "Nova edição"}
            </p>
            <h2 className={`${SERIF_CLASS} mt-1 text-3xl text-foreground`}>
              {editing.title || (isEditMode ? editing.slug : "Sem título")}
            </h2>
            <p className={`${MONO_CLASS} mt-2 text-muted-foreground`}>
              {editorWords} palavras · {editorReadMin} min ·{" "}
              {autoSavedAt
                ? `rascunho local: ${autoSavedAt.toLocaleTimeString("pt-BR")}`
                : "—"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview((s) => !s)}
              className={`${MONO_CLASS} h-9 rounded-md border border-border bg-background px-3 text-foreground hover:bg-muted`}
              title="Alternar preview"
            >
              {showPreview ? "Ocultar preview" : "Mostrar preview"}
            </button>
            <button
              onClick={discardEditing}
              className={`${MONO_CLASS} h-9 rounded-md border border-border bg-background px-3 text-muted-foreground hover:bg-muted hover:text-foreground`}
            >
              Voltar
            </button>
          </div>
        </div>

        {/* Two-column split: form left, preview right */}
        <div
          className={`grid gap-6 ${
            showPreview ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : "grid-cols-1"
          }`}
        >
          {/* FORM */}
          <div className="flex flex-col gap-5">
            <Field
              label="Título"
              required
              value={editing.title}
              onChange={onTitleChange}
              error={titleEmpty ? "Obrigatório." : undefined}
              placeholder="Como mover o ponteiro com 1 número"
            />

            <Field
              label="Slug"
              required
              value={editing.slug}
              onChange={onSlugChange}
              hint={
                editing.slug
                  ? `URL: /newsletter/${editing.slug}`
                  : "Gerado automaticamente do título."
              }
              error={
                slugEmpty
                  ? "Obrigatório."
                  : slugDuplicate
                    ? "Já existe um post com esse slug."
                    : undefined
              }
              mono
              placeholder="como-mover-o-ponteiro-com-1-numero"
            />

            <Field
              label="Excerpt"
              required
              hint="1-2 linhas. Vai pro preview da listagem e OG description."
              value={editing.excerpt}
              onChange={(v) => updateField("excerpt", v)}
              textarea
              rows={3}
              error={excerptEmpty ? "Obrigatório." : undefined}
              max={280}
              placeholder="Resumo da edição — frase curta, direta, com tese clara."
            />

            <Field
              label="Conteúdo (Markdown)"
              required
              value={editing.content_md}
              onChange={(v) => updateField("content_md", v)}
              textarea
              rows={22}
              mono
              error={bodyEmpty ? "Obrigatório." : undefined}
              placeholder={"# Heading opcional\n\nSeu primeiro parágrafo vira a drop-cap.\n\n## Subtítulo\n\n- bullet\n- bullet"}
              hint={`${editorWords} palavras · ${editorReadMin} min de leitura`}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Hero image URL"
                value={editing.hero_image_url}
                onChange={(v) => updateField("hero_image_url", v)}
                hint="Aparece no topo do post."
                placeholder="https://…"
              />
              <Field
                label="OG image URL"
                value={editing.og_image_url}
                onChange={(v) => updateField("og_image_url", v)}
                hint="Imagem em links sociais. Default: hero."
                placeholder="https://…"
              />
            </div>

            {/* Schedule */}
            <div className="rounded-md border border-border bg-card p-4">
              <p className={`${MONO_CLASS} text-muted-foreground`}>
                Agendamento
              </p>
              <label className="mt-3 flex flex-col gap-1 text-sm">
                <span className="text-foreground">Publicar em data específica</span>
                <input
                  type="datetime-local"
                  value={editing.published_at}
                  onChange={(e) => updateField("published_at", e.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-3 text-foreground focus:border-foreground focus:outline-none"
                />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                Vazio = mantém status atual (rascunho ou publicado).
              </p>
            </div>
          </div>

          {/* PREVIEW */}
          {showPreview ? (
            <div className="flex flex-col gap-3">
              <p className={`${MONO_CLASS} text-muted-foreground`}>
                Preview ao vivo
              </p>
              <div className="rounded-md border border-border bg-card p-6">
                {editing.hero_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={editing.hero_image_url}
                    alt=""
                    className="mb-6 w-full rounded-md border border-border object-cover"
                    style={{ maxHeight: 200 }}
                  />
                ) : null}
                <div className={`${MONO_CLASS} text-muted-foreground`}>
                  ● {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} · {editorReadMin} min de leitura
                </div>
                <h1
                  className={`${SERIF_CLASS} mt-3 text-foreground`}
                  style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.05 }}
                >
                  {editing.title || "Sem título"}
                </h1>
                {editing.excerpt ? (
                  <p
                    className={`${SERIF_CLASS} mt-3 text-muted-foreground`}
                    style={{ fontSize: 16 }}
                  >
                    {editing.excerpt}
                  </p>
                ) : null}
                <hr className="my-6 border-border" />
                {previewHtml ? (
                  <div
                    className="madureira-prose"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    Comece a escrever em markdown pra ver o preview…
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Sticky action bar */}
        <div className="sticky bottom-0 -mx-6 mt-4 border-t border-border bg-background/95 px-6 py-4 backdrop-blur md:-mx-12 md:px-12">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => save({ andUnpublish: true })}
                disabled={saving || !canSave}
                className={`${MONO_CLASS} h-10 rounded-md border border-border bg-background px-4 text-foreground hover:bg-muted disabled:opacity-60`}
                title="Salva o conteúdo como rascunho"
              >
                Salvar rascunho
              </button>
              {isEditMode ? (
                <button
                  onClick={() => save()}
                  disabled={saving || !canSave}
                  className={`${MONO_CLASS} h-10 rounded-md border border-border bg-background px-4 text-foreground hover:bg-muted disabled:opacity-60`}
                >
                  Salvar mudanças
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {isEditMode && editing.originalSlug ? (
                <button
                  onClick={() => {
                    if (editing.originalSlug) deleteExisting(editing.originalSlug);
                  }}
                  className={`${MONO_CLASS} h-10 rounded-md border border-destructive/40 bg-background px-4 text-destructive hover:bg-destructive/10`}
                >
                  Excluir
                </button>
              ) : null}
              <button
                onClick={() => save({ andPublish: true })}
                disabled={saving || !canSave}
                className={`${MONO_CLASS} h-10 rounded-md bg-foreground px-5 font-semibold text-background hover:opacity-90 disabled:opacity-60`}
              >
                {saving ? "Publicando…" : isEditMode ? "Salvar + publicar agora" : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // LIST VIEW
  // ====================================================================
  return (
    <div className="flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={`Todos · ${counts.all}`}
          />
          <FilterPill
            active={filter === "draft"}
            onClick={() => setFilter("draft")}
            label={`Drafts · ${counts.draft}`}
          />
          <FilterPill
            active={filter === "scheduled"}
            onClick={() => setFilter("scheduled")}
            label={`Agendados · ${counts.scheduled}`}
          />
          <FilterPill
            active={filter === "published"}
            onClick={() => setFilter("published")}
            label={`Publicados · ${counts.published}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar título, slug, excerpt…"
            className="h-9 w-56 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          <Link
            href="/admin/analytics"
            className={`${MONO_CLASS} h-9 rounded-md border border-border bg-background px-3 text-foreground hover:bg-muted inline-flex items-center`}
          >
            Métricas →
          </Link>
          <button
            onClick={startNew}
            className={`${MONO_CLASS} h-9 rounded-md bg-foreground px-4 font-semibold text-background hover:opacity-90`}
          >
            + Nova edição
          </button>
          <button
            onClick={logout}
            className={`${MONO_CLASS} h-9 rounded-md border border-border bg-background px-3 text-muted-foreground hover:bg-muted hover:text-foreground`}
            title="Encerrar sessão admin"
          >
            Sair
          </button>
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="rounded-md border border-border bg-card p-12 text-center">
          <p className={`${SERIF_CLASS} text-2xl text-foreground`}>
            {posts.length === 0 ? "Sem edições ainda." : "Nada nesse filtro."}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {posts.length === 0
              ? "Escreve a primeira."
              : "Tenta limpar a busca ou outro filtro."}
          </p>
          {posts.length === 0 ? (
            <button
              onClick={startNew}
              className={`${MONO_CLASS} mt-6 h-10 rounded-md bg-foreground px-5 font-semibold text-background hover:opacity-90`}
            >
              Criar primeira edição
            </button>
          ) : null}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/40">
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
            <tbody className="divide-y divide-border">
              {visiblePosts.map((p) => {
                const status = postStatus(p);
                return (
                  <tr key={p.id} className="text-foreground hover:bg-muted/30">
                    <Td>
                      <StatusBadge status={status} />
                    </Td>
                    <Td>
                      <span className={`${SERIF_CLASS} text-base text-foreground`}>
                        {p.title}
                      </span>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {p.excerpt}
                      </p>
                    </Td>
                    <Td>
                      <code className="text-xs text-muted-foreground">
                        {p.slug}
                      </code>
                    </Td>
                    <Td>
                      <span className={MONO_CLASS}>{fmt(p.published_at)}</span>
                    </Td>
                    <Td>
                      <span className={MONO_CLASS}>{fmt(p.sent_at)}</span>
                    </Td>
                    <Td>
                      <span className={MONO_CLASS}>{p.view_count}</span>
                    </Td>
                    <Td align="right">
                      <div className="flex justify-end gap-1.5">
                        {status === "published" ? (
                          <a
                            href={`/newsletter/${p.slug}`}
                            target="_blank"
                            rel="noopener"
                            className={`${MONO_CLASS} rounded-md border border-border px-2.5 py-1 text-foreground hover:bg-muted`}
                          >
                            Ver
                          </a>
                        ) : null}
                        <button
                          onClick={() => startEdit(p)}
                          className={`${MONO_CLASS} rounded-md border border-border px-2.5 py-1 text-foreground hover:bg-muted`}
                        >
                          Editar
                        </button>
                        {status === "published" ? (
                          <button
                            onClick={() => unpublishExisting(p.slug)}
                            className={`${MONO_CLASS} rounded-md border border-border px-2.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground`}
                          >
                            Despublicar
                          </button>
                        ) : null}
                        {status === "published" ? (
                          <button
                            onClick={() => sendBlast(p.slug)}
                            disabled={sending === p.slug}
                            className={`${MONO_CLASS} rounded-md bg-foreground px-2.5 py-1 font-semibold text-background hover:opacity-90 disabled:opacity-60`}
                          >
                            {sending === p.slug ? "Enviando…" : "Enviar"}
                          </button>
                        ) : null}
                      </div>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// SUBCOMPONENTS
// =========================================================================

function Field({
  label,
  hint,
  value,
  onChange,
  textarea,
  rows = 1,
  mono,
  error,
  required,
  placeholder,
  max,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  mono?: boolean;
  error?: string;
  required?: boolean;
  placeholder?: string;
  max?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between">
        <span className={`${MONO_CLASS} text-foreground`}>
          {label}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </span>
        {max ? (
          <span
            className={`${MONO_CLASS} ${
              value.length > max ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {value.length}/{max}
          </span>
        ) : null}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={`rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none ${
            mono ? "font-mono text-[13px] leading-relaxed" : "text-sm leading-relaxed"
          } ${error ? "border-destructive" : ""}`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-10 rounded-md border border-input bg-background px-3 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none ${
            mono ? "font-mono text-[13px]" : "text-sm"
          } ${error ? "border-destructive" : ""}`}
        />
      )}
      {error ? (
        <span className="text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${MONO_CLASS} h-9 rounded-md border px-3 transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: "draft" | "scheduled" | "published" }) {
  const map = {
    draft: { label: "Rascunho", cls: "border-border text-muted-foreground" },
    scheduled: {
      label: "Agendado",
      cls: "border-foreground/40 text-foreground",
    },
    published: {
      label: "Publicado",
      cls: "border-foreground bg-foreground text-background",
    },
  } as const;
  const s = map[status];
  return (
    <span
      className={`${MONO_CLASS} inline-flex h-6 items-center rounded-full border px-2.5 ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <th
      className={`${MONO_CLASS} px-4 py-3 text-muted-foreground ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <td
      className={`px-4 py-4 align-top ${align === "right" ? "text-right" : ""}`}
    >
      {children}
    </td>
  );
}
