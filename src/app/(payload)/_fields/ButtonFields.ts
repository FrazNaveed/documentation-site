import type { Field } from 'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

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
        validate: validateTextFieldUrl,
        admin: {
          width: '75%',
        }
      },
    ],
  },
]
