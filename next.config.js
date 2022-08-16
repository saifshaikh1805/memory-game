/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['static.tvmaze.com'],
  }
}

module.exports = nextConfig
