import { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'Stats',
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'Stats List',
      localized: true,
      minRows: 3,
      maxRows: 3,
      interfaceName: 'StatsList',
      labels: {
        singular: 'Stat',
        plural: 'Stats',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'stat',
          type: 'text',
          required: true,
          localized: true,
        }
      ],
      admin: {
        isSortable: true,
      },
    },
    {
      name: 'caption',
      type: 'richText',
      localized: true,
    },
  ],
  imageURL: '/icons/percent.svg',
  imageAltText: 'Stats block icon',
}
