import { Metadata } from 'next'
import type { Page } from 'payload-types'

type SEO = Page['meta']

const fallbackImageUrl = '/en/Flare-logo.png'
const fallbackImageMeta = {
  url: fallbackImageUrl,
  width: 1134,
  height: 592,
  alt: 'Flare logo',
}

const description = 'Flare is the blockchain for data: an EVM-based layer 1 that gives developers secure decentralized access to high-integrity data from other chains and the internet.'
const siteName = 'Flare'
const twitterCreator = '@FlareNetworks'

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://flare.network'),
  title: {
    template: '%s | Flare',
    default: 'Flare',
  },
  description,
  manifest: '/en/site.webmanifest',
  themeColor: '#ffffff',
  openGraph: {
    description,
    images: [
      fallbackImageMeta,
    ],
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: twitterCreator,
    images: [
      fallbackImageMeta,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const buildMetadata = (seoData?: SEO, pageTitle?: string | null, slug?: string) => {
  const seoDataImage = (seoData?.image && typeof seoData.image === 'object') ? seoData.image : undefined
  const imageMetadata = {
    url: seoDataImage?.url || fallbackImageMeta.url,
    width: seoDataImage?.width || fallbackImageMeta.width,
    height: seoDataImage?.height || fallbackImageMeta.height,
    alt: seoDataImage?.alt || fallbackImageMeta.alt,
  }

  return {
    title: seoData?.title || pageTitle || defaultMetadata.title,
    description: seoData?.description || defaultMetadata.description,
    alternates: {
      canonical: slug || '/',
      languages: {
        'en': '/', // eslint-disable-line quote-props
        'es': '/es', // eslint-disable-line quote-props
        'de': '/de', // eslint-disable-line quote-props
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: seoData?.title || pageTitle,
      description: seoData?.description || defaultMetadata.description,
      images: [
        imageMetadata,
      ],
      siteName,
    },
    twitter: {
      ...defaultMetadata.twitter,
      card: 'summary_large_image',
      site: twitterCreator,
      title: seoData?.title || pageTitle,
      description: seoData?.description || defaultMetadata.description,
      images: [
        imageMetadata,
      ],
    },
  }
}

export default buildMetadata
