/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
};

export default nextConfig;
