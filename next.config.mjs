import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

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
        // eslint-disable-next-line max-len
        // { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn-cookieyes.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://flare-internal-lts-api.aflabs.org; frame-src 'self' https://www.googletagmanager.com;" },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        // { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' }, // re-enable if cookieyes supports
      ],
    },
    {
      source: '/admin(.*)',
      headers: [
        // { key: 'Content-Security-Policy', value: '' },
        { key: 'Strict-Transport-Security', value: '' },
        { key: 'X-Content-Type-Options', value: '' },
        { key: 'X-Frame-Options', value: '' },
        { key: 'X-XSS-Protection', value: '' },
        { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
        { key: 'Permissions-Policy', value: '' },
      ],
    },
  ],
}

export default bundleAnalyzer(withPayload(nextConfig))
