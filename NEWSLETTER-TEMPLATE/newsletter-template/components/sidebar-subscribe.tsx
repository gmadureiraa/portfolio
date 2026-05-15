"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { subscribe } from "@/lib/subscribe";
import { siteMeta, socialLinks } from "@/lib/constants";

export function SidebarSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const res = await subscribe(email);
    if (res.success) {
      setStatus("ok");
      setMessage(res.data);
      setEmail("");
    } else {
      setStatus("err");
      setMessage(res.message);
    }
  }

  return (
    <aside className="md:sticky md:top-32 space-y-8">
      {/* Identity card */}
      <div className="border border-ink-30 rounded-lg p-6 bg-ink-15">
        <div className="flex items-center gap-4 mb-4">
          <span className="relative inline-block size-14 overflow-hidden rounded-full ring-1 ring-ink-30">
            <Image
              src="/avatar-madureira.jpg"
              alt="Madureira"
              fill
              sizes="56px"
              className="object-cover"
            />
          </span>
          <div>
            <p className="h-display italic font-light text-2xl text-ink-95 leading-none">
              madureira
            </p>
            <p className="meta text-ink-70 mt-1">{siteMeta.handle}</p>
          </div>
        </div>

        <p className="text-base text-ink-85 leading-relaxed mb-5">
          {siteMeta.tagline}.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <label htmlFor="sidebar-email" className="block">
            <span className="sr-only">Seu email</span>
            <input
              id="sidebar-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-transparent border border-ink-30 rounded-md px-3.5 py-2.5 text-sm text-ink-95 placeholder:text-ink-50 outline-none focus:border-vermilion caret-vermilion transition-colors"
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-cream w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "ok" ? (
              <>
                <Check className="size-4" />
                Inscrito
              </>
            ) : status === "loading" ? (
              "Enviando..."
            ) : (
              <>
                Assinar
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
          {message && (
            <p
              className={`meta ${status === "err" ? "text-vermilion" : "text-ink-70"}`}
              role="status"
            >
              {message}
            </p>
          )}
          <p className="eyebrow text-ink-50 pt-1">
            {siteMeta.spam} · {siteMeta.cadence}
          </p>
        </form>
      </div>

      {/* Social */}
      <div>
        <p className="eyebrow text-ink-50 mb-3">também em</p>
        <ul className="space-y-2">
          <SocialLink href={socialLinks.x} label="X / Twitter" />
          <SocialLink href={socialLinks.instagram} label="Instagram" />
          <SocialLink href={socialLinks.linkedin} label="LinkedIn" />
        </ul>
      </div>
    </aside>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-1 text-sm text-ink-85 hover:text-ink-95 transition-colors group"
      >
        <span>{label}</span>
        <ArrowRight className="size-3.5 text-ink-50 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </li>
  );
}

