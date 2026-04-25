/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "habaclothes-production.up.railway.app",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5185",
      },
    ],
  },
};

module.exports = nextConfig;
