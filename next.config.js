/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:any*',
  //       destination: '/',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
