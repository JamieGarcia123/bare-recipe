/** @type {import('next').NextConfig} */
// next.config.js
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "" : "",
  assetPrefix: isProd ? "/" : "",
  output: 'export',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
