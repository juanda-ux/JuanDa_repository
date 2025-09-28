import { createSecureHeaders } from './security-headers.mjs';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ];
  },
};

export default nextConfig;
