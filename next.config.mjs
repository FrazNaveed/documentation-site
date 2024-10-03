import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  sassOptions: {
    silenceDeprecations: ['mixed-decls', 'legacy-js-api'],
  },
}

export default bundleAnalyzer(withPayload(nextConfig))
