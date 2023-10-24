/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: ['picsum.photos'] },
    // async rewrites() {
    //   return [
    //     {
    //       source: "/:path*",
    //       destination: `http://localhost:3000/:path*`,
    //     },
    //   ];
    // },
    trailingSlash: false,
};

module.exports = nextConfig;
