import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const ImageTextGridBlock: Block = {
  slug: 'imageTextGrid',
  interfaceName: 'ImageTextGridBlock',
  fields: [
    {
      name: 'imageTextGridTitle',
      type: 'text',
      label: 'Title',
      localized: true,
    },
    {
      name: 'imageTextCardGrid',
      type: 'array',
      label: 'Image and Text Cards',
      localized: true,
      interfaceName: 'ImageTextCards',
      fields: [
        {
          name: 'cardImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'cardHeader',
          type: 'text',
        },
        {
          name: 'cardText',
          type: 'richText',
        },
      ],
      admin: {
        isSortable: true,
      },
    },
    // {
    //   name: 'columns',
    //   type: 'number', // radio?
    //   defaultValue: 2,
    //   max: 4,
    // },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/grid.svg`,
  imageAltText: 'Image and Text Grid block icon',
}
