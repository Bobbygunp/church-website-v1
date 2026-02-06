import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mcusercontent.com',
        port: '',
        pathname: '/**',
      },
      // You can add more domains here later if needed
      {
         protocol: 'https',
         hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
