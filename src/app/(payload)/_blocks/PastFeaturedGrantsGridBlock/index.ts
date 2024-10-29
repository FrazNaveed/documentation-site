import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const PastFeaturedGrantsGridBlock: Block = {
  slug: 'pastFeaturedGrantsGrid',
  interfaceName: 'PastFeaturedGrantsGridBlock',
  fields: [
    {
      name: 'gridTitle',
      type: 'text',
      label: 'Title',
      localized: true,
    },
    {
      name: 'pastFeaturedGrantsGrid',
      type: 'relationship',
      relationTo: 'grants',
      hasMany: true,
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/grid.svg`,
  imageAltText: 'Past Featured Grants Grid block icon', 
}
