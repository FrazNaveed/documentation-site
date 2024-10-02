import type { Field } from 'payload'
import { ButtonFields } from './ButtonFields'

export const HeroFields: Field[] = [
  {
    name: 'hero',
    type: 'group',
    fields: [
      {
        name: 'style',
        type: 'select',
        options: [
          'Standard',
        ],
        required: true,
        defaultValue: 'Standard',
      },
      {
        name: 'headline',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'eyebrow',
        type: 'text',
        admin: {
          description: 'Defaults to Headline if empty.'
        },
        localized: true,
      },
      ...ButtonFields,
      {
        name: 'backgroundImage',
        type: 'relationship',
        relationTo: 'media',
      }
    ],
    admin: {
      condition: (data, siblingData, { user }) => {
        if (data.hideHero) {
          return false
        } else {
          return true
        }
      },
    },
  },
]
