const withPWA = require("next-pwa")({
  dest: "public",
  // put other next-pwa options here
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  reactStrictMode: true,
  // put other next js options here
});

module.exports = nextConfig;  