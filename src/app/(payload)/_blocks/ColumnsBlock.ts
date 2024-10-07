import { Block } from 'payload'
import { i18n } from '../../i18n-config'

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'Columns',
  labels: {
    singular: 'Columns',
    plural: 'Columns',
  },
  fields: [
    {
      name: 'leftColumnBlock',
      type: 'blocks',
      blocks: [
        {
          slug: 'leftColumnImage',
          fields: [
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
            }
          ],
          imageURL: `/${i18n.defaultLocale}/icons/image.svg`,
          imageAltText: 'Left Column image block icon',
        },
        {
          slug: 'leftColumnText',
          fields: [
            {
              name: 'text',
              type: 'richText',
              localized: true,
            },
          ],
          imageURL: `/${i18n.defaultLocale}/icons/align-left.svg`,
          imageAltText: 'Left Column text block icon',
        },
      ],
      admin: {
        description: 'Add image or text to this column',
      },
      maxRows: 1,
    },
    {
      name: 'rightColumnBlock',
      type: 'blocks',
      blocks: [
        {
          slug: 'rightColumnImage',
          fields: [
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
            }
          ],
          imageURL: `/${i18n.defaultLocale}/icons/image.svg`,
          imageAltText: 'Right Column image block icon',
        },
        {
          slug: 'rightColumnText',
          fields: [
            {
              name: 'text',
              type: 'richText',
              localized: true,
            },
          ],
          imageURL: `/${i18n.defaultLocale}/icons/align-left.svg`,
          imageAltText: 'Right Column text block icon',
        },
      ],
      admin: {
        description: 'Add image or text to this column',
      },
      maxRows: 1,
    },
    {
      name: 'createSideNavLink',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  imageURL: `/${i18n.defaultLocale}/icons/columns.svg`,
  imageAltText: 'Columns block icon',
}
