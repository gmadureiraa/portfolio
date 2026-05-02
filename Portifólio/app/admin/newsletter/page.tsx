import type { Metadata } from "next";
import { isAdminFromCookies, getAdminSecret } from "@/lib/server/admin";
import { listAllNewsletters, isDbConfigured } from "@/lib/db/newsletter";
import { AdminLogin } from "@/components/admin/login";
import { AdminNewsletterDashboard } from "@/components/admin/newsletter-dashboard";

export const metadata: Metadata = {
  title: "Admin · Newsletter — Madureira®",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const adminSecretSet = Boolean(getAdminSecret());
  const isAdmin = await isAdminFromCookies();

  if (!adminSecretSet) {
    return (
      <main className="bg-background min-h-screen w-full px-6 py-24">
        <div className="mx-auto max-w-xl rounded-xl border border-amber-800 bg-amber-950/40 p-6">
          <h1 className="text-xl font-semibold text-amber-200">
            ADMIN_SECRET não configurado
          </h1>
          <p className="mt-2 text-sm text-amber-300">
            Configure a env var <code className="bg-black/40 px-1.5 py-0.5 rounded">ADMIN_SECRET</code>{" "}
            no Vercel (qualquer string longa) e faça redeploy. Depois acesse de novo.
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="bg-background min-h-screen w-full px-6 py-24">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-2xl font-semibold text-foreground">
            Admin
          </h1>
          <AdminLogin />
        </div>
      </main>
    );
  }

  if (!isDbConfigured) {
    return (
      <main className="bg-background min-h-screen w-full px-6 py-24">
        <div className="mx-auto max-w-xl rounded-xl border border-red-800 bg-red-950/40 p-6">
          <h1 className="text-xl font-semibold text-red-200">DB não configurado</h1>
          <p className="mt-2 text-sm text-red-300">
            Provisione um Neon DB e configure <code className="bg-black/40 px-1.5 py-0.5 rounded">DATABASE_URL</code>.
            Rode <code className="bg-black/40 px-1.5 py-0.5 rounded">bun run scripts/migrate-newsletter.ts</code> pra criar as tabelas.
          </p>
        </div>
      </main>
    );
  }

  const posts = await listAllNewsletters();

  return (
    <main className="bg-background min-h-screen w-full px-6 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Admin
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-foreground">
              Newsletter
            </h1>
          </div>
        </header>

        <AdminNewsletterDashboard initialPosts={posts} />
      </div>
    </main>
  );
}
