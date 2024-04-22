/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.discordapp.com',
                port: '',
            },
        ],
    },
    // Other configurations
};

export default nextConfig;