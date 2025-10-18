import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accepts all domains
      },
      {
        protocol: "http",
        hostname: "**", // (Optional) if you also want to allow http
      },
    ],
  },
};

export default nextConfig;
