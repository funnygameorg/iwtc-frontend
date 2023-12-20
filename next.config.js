/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: ['picsum.photos', 'www.youtube.com'] },
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
