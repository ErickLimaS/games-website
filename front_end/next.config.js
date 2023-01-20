/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.igdb.com',
        port: '',
        pathname: '/igdb/image/upload/t_thumb/**',
        pathname: '/igdb/image/upload/t_720p/**',
        pathname: '/igdb/image/upload/t_1080p/**',
      },
    ],
  },
}