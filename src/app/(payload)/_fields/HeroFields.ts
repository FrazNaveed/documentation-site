import type { Field } from 'payload'
import { ButtonFields } from './ButtonFields'

export const HeroFields: Field[] = [
  {
    name: 'hero',
    type: 'group',
    interfaceName: 'PageHero',
    fields: [
      {
        name: 'style',
        type: 'select',
        options: [
          {
            label: 'Standard',
            value: 'standard',
          },
          {
            label: 'Protocol',
            value: 'protocol',
          },
        ],
        required: true,
        defaultValue: 'standard',
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
          description: 'Defaults to Page Title if empty.'
        },
        localized: true,
      },
      ...ButtonFields(true),
      {
        name: 'backgroundImage',
        type: 'relationship',
        relationTo: 'media',
      },
      {
        name: 'protocolInfo',
        interfaceName: 'PageHeroProtocolInfo',
        type: 'group',
        fields: [
          {
            name: 'logo',
            type: 'relationship',
            relationTo: 'media',
          },
          {
            name: 'text',
            type: 'richText',
          },
          {
            name: 'providers',
            type: 'number',
          },
          {
            name: 'feeds',
            type: 'number',
          },
          {
            name: 'stakeTokens',
            type: 'number',
          },
          {
            name: 'stakeValue',
            type: 'number',
          },
          {
            name: 'averageBlockTime',
            type: 'number',
          },
        ],
        admin: {
          condition: (data, siblingData, { user }) => {
            return siblingData.style === 'protocol'
          },
        },
      },
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
