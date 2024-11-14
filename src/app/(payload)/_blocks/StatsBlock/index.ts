import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '../../../i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'Stats',
  labels: {
    singular: 'Stats',
    plural: 'Stats',
  },
  fields: [
    {
      name: 'pullFromApi',
      label: 'Pull stats from API?',
      type: 'checkbox',
      admin: {
        description: 'If checked, stats will be pulled automatically from an API endpoint for Flaredrop APR, Delegating APR and Staking APR.',
      }
    },
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
        },
        {
          name: 'stat',
          type: 'text',
          required: true,
        }
      ],
      admin: {
        isSortable: true,
        condition: (data, siblingData) => siblingData?.pullFromApi !== true,
      },
    },
    {
      name: 'caption',
      type: 'richText',
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/percent.svg`,
  imageAltText: 'Stats block icon',
}
