import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'hello.local'
      },
      {
        protocol: 'https',
        hostname: 'smartfire.clmntpct.xyz'
      },
    ],
  },
};

export default nextConfig;
