import type { Field } from 'payload'
import { ButtonFields } from './ButtonFields'

export const PageFooterCTA: Field[] = [
  {
    name: 'pageFooterCTA',
    type: 'checkbox',
    label: 'Page Footer CTA',
    defaultValue: false,
  },
  {
    name: 'pageFooterCTAButton',
    type: 'group',
    label: 'Page Footer CTA Button',
    fields: [
      ...ButtonFields,
      {
        name: 'backgroundImage',
        type: 'relationship',
        relationTo: 'media',
      },
      {
        name: 'backgroundImageStyle',
        type: 'select',
        options: [
          { label: 'Flipped', value: 'flipped' },
          { label: 'Offset',value: 'offset'},
        ],
        defaultValue: 'flipped',
        hasMany: false,
        localized: true,
        admin: {
          description: 'Choose how the background image is displayed',
        },
      },
    ],
    admin: {
      condition: (data, siblingData, { user }) => {
        return siblingData.pageFooterCTA
      },
    },
  },
]
