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
      name: 'leftColumn',
      type: 'group',
      interfaceName: 'Left Column',
      fields: [
        {
          name: 'text',
          type: 'richText',
          localized: true,
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'rightColumn',
      type: 'group',
      interfaceName: 'Right Column',
      fields: [
        {
          name: 'text',
          type: 'richText',
          localized: true,
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'createSideNavLink',
      type: 'checkbox',
      defaultValue: false,
    },
  ]
}
