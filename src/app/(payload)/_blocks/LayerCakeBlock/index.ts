import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const LayerCakeBlock: Block = {
  slug: 'layerCake',
  interfaceName: 'ILayerCake',
  fields: [
    {
      name: 'bannerText',
      type: 'text',
      localized: true,
    },
    {
      name: 'primaryColumnLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'layers',
      type: 'array',
      maxRows: 3,
      localized: true,
      fields: [
        {
          name: 'header',
          type: 'text',
        },
        {
          name: 'text',
          type: 'text',
        },
      ],
      admin: {
        isSortable: true,
      },
    },
    {
      name: 'secondaryColumnSections',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'products',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          maxRows: 2,
          admin: {
            isSortable: true,
          },
        },
      ],
      admin: {
        isSortable: true,
      },
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/layers.svg`,
  imageAltText: 'Layer Cake block layers icon',
}
