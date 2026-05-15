"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import { siteMeta, type Issue } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export function ArticleHeader({ issue }: { issue: Issue }) {
  return (
    <header className="border-b border-ink-30">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 meta text-ink-70 hover:text-ink-95 transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" />
          todas as edições
        </Link>

        <div className="max-w-prose">
          <div className="flex items-center gap-2 mb-6">
            <span className="eyebrow">edição {issue.number}</span>
            <span className="accent-dot text-vermilion text-sm leading-none">·</span>
            <span className="eyebrow">{issue.category}</span>
            <span className="accent-dot text-vermilion text-sm leading-none">·</span>
            <span className="eyebrow">{issue.readMinutes} min</span>
          </div>

          <h1 className="h-display text-[40px] leading-[1.02] sm:text-[56px] md:text-[68px] lg:text-[80px] text-ink-95 mb-6">
            {issue.title}
          </h1>

          <p className="text-md md:text-lg text-ink-85 leading-relaxed mb-8">
            {issue.subtitle}
          </p>

          <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-ink-20">
            <div className="flex items-center gap-3">
              <span className="relative inline-block size-10 overflow-hidden rounded-full ring-1 ring-ink-30">
                <Image
                  src="/avatar-madureira.jpg"
                  alt="Madureira"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="text-sm text-ink-95 font-medium leading-tight">
                  Gabriel Madureira
                </p>
                <p className="meta text-ink-70 mt-0.5">
                  {formatDate(issue.date)}
                </p>
              </div>
            </div>

            <ArticleActions />
          </div>
        </div>
      </div>
    </header>
  );
}

function ArticleActions() {
  return (
    <div className="flex items-center gap-1">
      <IconButton label="curtir">
        <Heart className="size-4" />
      </IconButton>
      <IconButton label="comentar">
        <MessageCircle className="size-4" />
      </IconButton>
      <IconButton label="compartilhar">
        <Share2 className="size-4" />
      </IconButton>
    </div>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-ink-70 hover:bg-ink-15 hover:text-ink-95 transition-colors"
    >
      {children}
    </button>
  );
}

// Body renderer — simple markdown-ish parser pra prose Madureira
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\n+/);
  return (
    <article className="prose-madureira max-w-prose">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={idx}
              className="h-display italic font-light text-[30px] md:text-[38px] text-ink-95 mt-12 mb-4 leading-[1.1]"
            >
              {trimmed.replace(/^## /, "")}
            </h2>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="h-section text-xl text-ink-95 mt-10 mb-3 leading-tight"
            >
              {trimmed.replace(/^### /, "")}
            </h3>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={idx}
              className="border-l-2 border-ink-50 pl-5 my-8 font-display italic font-light text-[22px] md:text-[26px] text-ink-95 leading-[1.3]"
            >
              {renderInline(trimmed.replace(/^> /gm, ""))}
            </blockquote>
          );
        }
        // ordered list
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split(/\n/).map((l) => l.replace(/^\d+\.\s/, ""));
          return (
            <ol key={idx} className="my-6 space-y-3 max-w-prose">
              {items.map((it, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] items-baseline gap-2 text-base md:text-md text-ink-85 leading-relaxed">
                  <span className="font-mono text-vermilion text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{renderInline(it)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p
            key={idx}
            className="text-base md:text-md text-ink-85 leading-relaxed mb-5 max-w-prose"
          >
            {renderInline(trimmed)}
          </p>
        );
      })}
    </article>
  );
}

function renderInline(text: string): React.ReactNode {
  // Suporte mínimo: **bold** vira <strong> (CSS transforma em Fraunces italic vermilion)
  // e `code` vira <code>
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const boldStart = text.indexOf("**", i);
    const codeStart = text.indexOf("`", i);
    const next = [boldStart, codeStart].filter((n) => n >= 0).sort((a, b) => a - b)[0];

    if (next === undefined || next === -1) {
      parts.push(text.slice(i));
      break;
    }

    if (next > i) parts.push(text.slice(i, next));

    if (next === boldStart) {
      const end = text.indexOf("**", next + 2);
      if (end === -1) {
        parts.push(text.slice(next));
        break;
      }
      parts.push(<strong key={`b-${key++}`}>{text.slice(next + 2, end)}</strong>);
      i = end + 2;
    } else {
      const end = text.indexOf("`", next + 1);
      if (end === -1) {
        parts.push(text.slice(next));
        break;
      }
      parts.push(
        <code
          key={`c-${key++}`}
          className="font-mono text-sm bg-ink-15 text-ink-95 px-1.5 py-0.5 rounded"
        >
          {text.slice(next + 1, end)}
        </code>
      );
      i = end + 1;
    }
  }
  return parts;
}

export function ArticleFooter({ issue }: { issue: Issue }) {
  return (
    <footer className="mt-16 pt-8 border-t border-ink-20 max-w-prose">
      <div className="flex items-center justify-between meta text-ink-70">
        <span>
          {issue.number} <span className="text-vermilion">·</span>{" "}
          {formatDate(issue.date)} <span className="text-vermilion">·</span>{" "}
          {siteMeta.handle}
        </span>
        <span>fim</span>
      </div>
    </footer>
  );
}
