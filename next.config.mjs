/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["myjobs.com.mm"],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET, // pulls from .env file
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // pulls from .env file
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL, // pulls from .env file
    NEXT_PUBLIC_LINKEDIN_CLIENT_ID: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID, // pulls from .env file
    NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET, // pulls from .env file
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
