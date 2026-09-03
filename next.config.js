/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: ['picsum.photos', 'www.youtube.com'] },
    trailingSlash: false,
    reactStrictMode: true,
};

module.exports = nextConfig;
