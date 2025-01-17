/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@radix-ui/react-card', '@radix-ui/react-button'],
  experimental: {
    appDir: false
  },
  swcMinify: true
}

module.exports = nextConfig 