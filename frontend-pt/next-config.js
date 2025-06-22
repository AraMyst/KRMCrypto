/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['krmcrypto.onrender.com'],
  },
}

module.exports = nextConfig
