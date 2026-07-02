/** @type {import('next').NextConfig} */
const nextConfig = {
  // Barrel-file tree-shaking: importa só os ícones/utilitários usados em vez
  // de puxar o pacote inteiro pro bundle client. Ganho direto em react-icons
  // (centenas de SVGs) e lucide-react.
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "framer-motion",
      "date-fns",
    ],
  },
  images: {
    unoptimized: true, // free tier: evita cache-writes de Image Optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/newsletter', permanent: true },
      { source: '/sobre', destination: '/eu', permanent: true },
      { source: '/contato', destination: '/#contato', permanent: false },
      { source: '/projetos', destination: '/projects', permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
