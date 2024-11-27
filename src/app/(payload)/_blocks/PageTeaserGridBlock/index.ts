import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const PageTeaserGrid: Block = {
  slug: 'pageTeaserGrid',
  interfaceName: 'IPageTeaserGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'teasers',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      required: true,
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/grid.svg`,
  imageAltText: 'Page Teaser Grid block icon',
}
