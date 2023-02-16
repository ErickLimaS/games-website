/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  env: {
    API_RENDER_URL: process.env.API_RENDER_URL,
    DB_RENDER_URL: process.env.DB_RENDER_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        port: '',
        pathname: '/igdb/image/upload/t_thumb/**',
        pathname: '/igdb/image/upload/t_cover_small/**',
        pathname: '/igdb/image/upload/t_cover_small_2x/**',
        pathname: '/igdb/image/upload/t_720p/**',
        pathname: '/igdb/image/upload/t_1080p/**',
      },
    ],
  },
}