/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Se você usar imagens hospedadas em outro domínio:
  images: {
    domains: ['krmcrypto.onrender.com'],
  },
  // Variáveis de ambiente expostas ao browser devem vir com NEXT_PUBLIC_
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
