import { i18n } from '@/src/app/i18n-config'
import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const FeaturedNewsCarouselBlock: Block = {
  slug: 'featuredNewsCarousel',
  interfaceName: 'IFeaturedNewsCarouselBlock',
  fields: [
    {
      name: 'newsPosts',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      minRows: 1,
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/layers.svg`,
  imageAltText: 'Featured News Carousel Block',
}
