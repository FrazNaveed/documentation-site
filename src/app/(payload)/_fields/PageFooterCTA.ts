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
      ...ButtonFields(true),
      {
        name: 'backgroundImage',
        type: 'relationship',
        relationTo: 'media',
      },
      {
        name: 'backgroundImageStyle',
        type: 'select',
        options: [
          { label: 'Flipped - right image is inverted', value: 'flipped' },
          { label: 'Offset - images are vertically offset',value: 'offset'},
        ],
        defaultValue: 'flipped',
        hasMany: false,
        admin: {
          description: 'Choose how the background image is displayed',
        },
      },
      {
        name: 'useSocialMediaButtons',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          'description': 'Display social media buttons instead of CTA buttons',
        },
      },
      {
        name: 'socialMediaButtons',
        type: 'relationship',
        relationTo: 'social-links',
        hasMany: true,
        admin: {
          condition: ( data, siblingData, { user }) => {
            if (siblingData.useSocialMediaButtons) {
              return true
            } else {
              return false
            }
          },
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
