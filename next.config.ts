import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Lista de domínios permitidos para carregamento de imagens externas
    remotePatterns: [
       {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '', // Deixe vazio se não houver porta específica
        pathname: '/**', // Permite qualquer caminho sob o domínio
      },
    ],
  },
};

export default nextConfig;
