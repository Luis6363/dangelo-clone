/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ext.same-assets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '/**',
      },
    ],
  },
  // Fix react-pageflip compatibility issue with Next.js
  transpilePackages: ['react-pageflip'],
};

module.exports = nextConfig;
