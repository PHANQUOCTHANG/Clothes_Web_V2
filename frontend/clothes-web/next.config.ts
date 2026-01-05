import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minimog.nextsky.co",
      },
      {
        protocol: "https",
        hostname: "*.nextsky.co",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
      },
      {
        protocol: "https",
        hostname: "*.example.com",
      },
    ],
  },
};

export default nextConfig;
