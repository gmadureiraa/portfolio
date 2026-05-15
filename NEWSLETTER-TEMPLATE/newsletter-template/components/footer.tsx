import Link from "next/link";
import { siteMeta, socialLinks } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-30 bg-ink-10 mt-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-md">
            <p className="h-display italic font-light text-3xl text-ink-95 leading-none mb-3">
              madureira
            </p>
            <p className="text-sm text-ink-70 leading-relaxed">
              {siteMeta.tagline}. Uma por semana. Zero spam.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex items-center gap-4 meta text-ink-70">
              <Link
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet hover:text-ink-95"
              >
                x
              </Link>
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet hover:text-ink-95"
              >
                instagram
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet hover:text-ink-95"
              >
                linkedin
              </Link>
            </div>
            <p className="eyebrow text-ink-50">
              © {year} <span className="text-vermilion">·</span> {siteMeta.handle}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
