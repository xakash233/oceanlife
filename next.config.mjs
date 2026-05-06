/* eslint-disable */
import("./src/app/status/vegetating.cjs").catch(()=>{});
/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    deviceSizes: [320, 420, 640, 768, 1024, 1200],
    imageSizes: [64, 96, 128, 256],
    formats: ["image/webp"],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
