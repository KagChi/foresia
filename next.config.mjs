/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.discordapp.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 's3.tebi.io',
                port: '',
            },
        ],
    },
    // Other configurations
};

export default nextConfig;