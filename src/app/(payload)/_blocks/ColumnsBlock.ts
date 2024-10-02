import { Block } from 'payload'

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
          imageURL: '',
          imageAltText: 'Left Column image block icon',
        },
        {
          slug: 'leftColumnText',
          fields: [
            {
              name: 'text',
              type: 'richText',
            },
          ],
          imageURL: '',
          imageAltText: 'Left Column text block icon',
        },
      ],
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
          imageURL: '',
          imageAltText: 'Right Column image block icon',
        },
        {
          slug: 'rightColumnText',
          fields: [
            {
              name: 'text',
              type: 'richText',
            },
          ],
          imageURL: '',
          imageAltText: 'Right Column text block icon',
        },
      ],
      maxRows: 1,
    },
    {
      name: 'createSideNavLink',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  imageURL: '',
  imageAltText: 'Columns block icon',
}
