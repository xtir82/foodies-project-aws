/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb',
          },
      },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'ac-foodies-demo-users-image.s3.us-east-2.amazonaws.com',
            port: '',
            pathname: '/**',
        }]
    }
}

module.exports = nextConfig
