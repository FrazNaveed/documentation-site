import type { Field } from 'payload'
import { ButtonFields } from './ButtonFields'
import countryArray from '../_utils/countryArray'

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
          {
            label: 'Grants',
            value: 'grants',
          },
          {
            label: 'Centered',
            value: 'centered',
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
          description: 'Defaults to Page Title if empty.',
          condition: (data, siblingData, { user }) => {
            return siblingData.hideEyebrow !== true
          },
        },
        localized: true,
      },
      {
        name: 'hideEyebrow',
        type: 'checkbox',
        label: 'Hide Eyebrow',
        defaultValue: false,
        admin: {
          condition: (data, siblingData, { user }) => {
            return siblingData.style === 'protocol' || siblingData.style === 'centered'
          },
        },
      },
      ...ButtonFields(true),
      {
        name: 'backgroundImage',
        type: 'relationship',
        relationTo: 'media',
      },
      {
        name: 'showBackgroundVideo',
        type: 'checkbox',
        admin: {
          condition: (data, siblingData, { user }) => {
            return siblingData.style === 'centered'
          },
        },
      },
      {
        name: 'logo',
        type: 'relationship',
        relationTo: 'media',
        admin: {
          condition: (data, siblingData, { user }) => {
            return siblingData.style === 'protocol' || siblingData.style === 'centered'
          },
        },
      },
      {
        name: 'text',
        type: 'richText',
        admin: {
          condition: (data, siblingData, { user }) => {
            return siblingData.style === 'protocol' || siblingData.style === 'centered'
          },
        },
      },
      {
        name: 'grantsInfo',
        type: 'group',
        interfaceName: 'PageHeroGrantsInfo',
        fields: [
          {
            name: 'grantsAwarded',
            type: 'number',
          },
          {
            name: 'countries',
            type: 'array',
            interfaceName: 'FeaturedGrantsCountries',
            localized: true,
            fields: [
              {
                name: 'country',
                type: 'select',
                options: countryArray,
                hasMany: false,
                required: true,
              },
            ],
          },
          {
            name: 'topCategories',
            type: 'array',
            interfaceName: 'FeaturedGrantsTopCategories',
            localized: true,
            fields: [
              {
                name: 'type',
                label: 'Grant Type',
                type: 'relationship',
                relationTo: 'grant-types',
                hasMany: false,
                required: true,
              },
              {
                name: 'number',
                type: 'number',
                required: false,
              },
            ],
          },
        ],
        admin: {
          condition: (data, siblingData, { user }) => {
            return siblingData.style === 'grants'
          },
        },
      },
      {
        name: 'protocolInfo',
        interfaceName: 'PageHeroProtocolInfo',
        type: 'group',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'providersLabelIcon',
                label: 'Label Icon (optional)',
                type: 'relationship',
                relationTo: 'media',
                admin: {
                  width: '20%',
                },
              },
              {
                name: 'providersLabelOverride',
                label: 'Override label - defaults to "Data Providers"',
                type: 'text',
                admin: {
                  width: '26%',
                },
              },
              {
                name: 'providers',
                label: 'Provider Count',
                type: 'number',
                admin: {
                  width: '26%',
                },
              },
              {
                name: 'providersUnit',
                label: 'Add optional unit',
                type: 'text',
                admin: {
                  width: '26%',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'feedsLabelIcon',
                label: 'Label Icon (optional)',
                type: 'relationship',
                relationTo: 'media',
                admin: {
                  width: '20%',
                },
              },
              {
                name: 'feedsLabelOverride',
                label: 'Override label - defaults to "Live Feeds"',
                type: 'text',
                admin: {
                  width: '40%',
                },
              },
              {
                name: 'feeds',
                label: 'Feed Count',
                type: 'number',
                admin: {
                  width: '40%',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'tokensLabelIcon',
                label: 'Label Icon (optional)',
                type: 'relationship',
                relationTo: 'media',
                admin: {
                  width: '20%',
                },
              },
              {
                name: 'tokensLabelOverride',
                label: 'Override label - defaults to "Flare Staked"',
                type: 'text',
                admin: {
                  width: '26%',
                },
              },
              {
                name: 'stakeTokens',
                type: 'number',
                admin: {
                  width: '26%',
                },
              },
              {
                name: 'stakeValue',
                label: 'Stake Value in USD',
                type: 'number',
                admin: {
                  width: '26%',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'averageBlockTimeLabelIcon',
                label: 'Label Icon (optional)',
                type: 'relationship',
                relationTo: 'media',
                admin: {
                  width: '20%',
                },
              },
              {
                name: 'averageBlockTimeLabelOverride',
                label: 'Override label - defaults to "Average Block Time"',
                type: 'text',
                admin: {
                  width: '26%',
                },
              },
              {
                name: 'averageBlockTime',
                label: 'Average Block Time (in seconds)',
                type: 'number',
                admin: {
                  width: '26%',
                },
              },
              {
                name: 'averageBlockTimeUnit',
                label: 'Override unit - defaults to "s"',
                type: 'text',
                admin: {
                  width: '26%',
                },
              },
            ],
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
