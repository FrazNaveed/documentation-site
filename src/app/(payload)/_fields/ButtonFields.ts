import type { Field } from 'payload'

export const ButtonFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'buttonText',
        type: 'text',
        localized: true,
        admin: {
          width: '25%',
        },
      },
      {
        name: 'buttonLink',
        type: 'text',
        admin: {
          width: '75%',
        }
      },
    ],
  },
]
