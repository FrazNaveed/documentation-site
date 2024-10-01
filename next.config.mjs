import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['en', 'es', 'de'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/:slug*',
        destination: '/:slug*',
      },
      {
        source: '/:slug*',
        has: [
          {
            type: 'host',
            value: `es.${process.env.ROOT_DOMAIN}`,
          },
        ],
        destination: '/:slug*?locale=es',
      },
      // repeat for 'de' and other locales as needed
    ]
  },
}

export default bundleAnalyzer(withPayload(nextConfig))
