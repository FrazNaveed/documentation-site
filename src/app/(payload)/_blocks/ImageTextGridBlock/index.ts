import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const ImageTextGridBlock: Block = {
  slug: 'imageTextGrid',
  interfaceName: 'ImageTextGridBlock',
  fields: [
    {
      name: 'imageTextCardGrid',
      type: 'array',
      label: 'Image and Text Cards',
      localized: true,
      interfaceName: 'ImageTextCards',
      fields: [
        {
          name: 'cardHeader',
          type: 'text',
          localized: true,
        },
        {
          name: 'cardText',
          type: 'richText',
          localized: true,
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
  ],
  imageURL: `/${i18n.defaultLocale}/icons/grid.svg`,
  imageAltText: 'Image and Text Grid block icon',
}
