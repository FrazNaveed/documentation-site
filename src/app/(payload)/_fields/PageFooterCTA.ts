import type { Field } from 'payload'
import { ButtonFields } from './ButtonFields'
import { SelectSocialChannels } from './SelectSocialChannels'

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
          condition: ( data, siblingData, { user }) => {
            if (siblingData.useSocialMediaButtons) {
              return false
            } else {
              return true
            }
          },
        },
      },
      {
        name: 'useSocialMediaButtons',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          'description': 'Display Social Channels as buttons instead of CTA buttons. Manage in Globals under Page Footer CTA Social Channels.',
        },
      },
      ...SelectSocialChannels,
    ],
    admin: {
      condition: (data, siblingData, { user }) => {
        return siblingData.pageFooterCTA
      },
    },
  },
]
