// Layout intencionalmente vazio — a /eu agora usa o root layout do app.
// Mantemos este arquivo como passthrough pra preservar a estrutura de rotas
// e evitar 404 caso algum import legado aponte pra cá.
export default function EuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
