import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance-Optimierungen
  reactStrictMode: true,
  
  // Moderne Browser-Target (keine Polyfills für alte Browser)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bilder-Optimierung
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Moderne JS-Output (ES2020+, keine alten Polyfills)
  swcMinify: true,
};

export default nextConfig;
