
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Adicionado para exportação estática
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // unoptimized: true, // Considerar se houver problemas com next/image em exportações estáticas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'noticias.maisesports.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thinkworklab.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
