import { withPayload } from '@payloadcms/next/withPayload';
import { withContentCollections } from '@content-collections/next'; // Import withContentCollections
import withBundleAnalyzer from '@next/bundle-analyzer';
// eslint-disable-next-line import/extensions
import manualRedirects from './manualRedirects.js';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  sassOptions: {
    silenceDeprecations: [
      'mixed-decls',
      'legacy-js-api',
      'import',
      'global-builtin',
      'slash-div',
      'color-functions',
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=600, stale-while-revalidate=60' },
      ],
    },
    {
      source: '/api/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'private, no-cache, no-store, max-age=0, must-revalidate' },
      ],
    },
    {
      source: '/admin(.*)',
      headers: [
        { key: 'Cache-Control', value: 'private, no-cache, no-store, max-age=0, must-revalidate' },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
      ],
    },
    {
      source: '/admin(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: '' },
        { key: 'X-Content-Type-Options', value: '' },
        { key: 'X-Frame-Options', value: '' },
        { key: 'X-XSS-Protection', value: '' },
        { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
        { key: 'Permissions-Policy', value: '' },
      ],
    },
  ],
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false, 
    };
    return config;
  },

  async redirects() {
    return [
      ...manualRedirects,
    ];
  },
};

// Wrap with both withPayload and withContentCollections
export default withContentCollections(bundleAnalyzer(withPayload(nextConfig)));
