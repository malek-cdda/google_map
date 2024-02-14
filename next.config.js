/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "maps.googleapis.com",
      "res.cloudinary.com",
      "plus.unsplash.com",
      "unsplash.com",
    ],
  },
  env: {
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
};

module.exports = nextConfig;
