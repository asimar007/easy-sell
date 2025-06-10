/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tdemkajtsvdmigiyhejo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
