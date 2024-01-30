/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "*.bigcommerce.com",
      }
    ]
  }
};

export default nextConfig;
