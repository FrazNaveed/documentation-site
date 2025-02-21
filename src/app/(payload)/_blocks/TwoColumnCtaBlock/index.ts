import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const TwoColumnCtaBlock: Block = {
  slug: 'twoColumnCta',
  interfaceName: 'ITwoColumnCta',
  labels: {
    singular: 'Two Column CTA',
    plural: 'Two Column CTAs',
  },
  fields: [
    {
      name: 'variation',
      type: 'select',
      defaultValue: 'standard',
      options: [
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Alternate - columns flipped, gray background',
          value: 'alternate',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Appears in left column. Appears in right column in Alternate variation.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        condition: (data, siblingData, { user }) => siblingData.variation === 'standard',
      },
    },
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'text',
      type: 'richText',
      localized: true,
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      localized: true,
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      localized: true,
      validate: validateTextFieldUrl,
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      localized: true,
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      localized: true,
      validate: validateTextFieldUrl,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/zap.svg`,
  imageAltText: 'Two Column Cta block icon',
}
