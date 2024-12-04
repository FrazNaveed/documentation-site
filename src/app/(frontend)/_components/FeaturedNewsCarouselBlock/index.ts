'use client'

import dynamic from 'next/dynamic'

const FeaturedNewsCarouselBlock = dynamic(() => import('./FeaturedNewsCarouselBlock'), { ssr: false })

export default FeaturedNewsCarouselBlock
