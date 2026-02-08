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
      },
      {
        protocol: 'https',
        hostname: 'tcf-website-images.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
