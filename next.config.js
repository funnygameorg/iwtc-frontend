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
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/', // change to appropriate path
                headers: [
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
