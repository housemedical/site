/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // static export for GitHub Pages
  images: { unoptimized: true }, // no Image Optimization server on Pages
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
};
export default nextConfig;
