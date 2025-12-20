/** @type {import('next').NextConfig} */
// next.config.js

const nextConfig = {
  output: 'export', 
  trailingSlash: true,     // optional, helps with Netlify routing
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
