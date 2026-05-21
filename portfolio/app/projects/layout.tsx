import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos — Gabriel Madureira | 15+ Produtos Digitais",
  description:
    "De dashboards DeFi a gateways de pagamento — cada projeto tem demo ao vivo e código real.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
