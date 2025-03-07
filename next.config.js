/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  output: 'standalone',
  // Disable SSL validation for local development
  // This helps with the SSL issues mentioned in the requirements
  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = {
        ...config.devServer,
        // Fixes issues with self-signed certificates
        https: {
          key: null,
          cert: null,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig; 