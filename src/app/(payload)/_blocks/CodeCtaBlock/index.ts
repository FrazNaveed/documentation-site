import { Block } from 'payload'
import { ButtonFields } from '../../_fields/ButtonFields'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const CodeCtaBlock: Block = {
  slug: 'codeCta',
  interfaceName: 'ICodeCta',
  labels: {
    singular: 'Code CTA',
    plural: 'Code CTAs',
  },
  fields: [
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
    ...ButtonFields(true),
    {
      name: 'hideCode',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide the code examples with the option of using an image instead.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Used in place of code examples.',
        condition: (data, siblingData, { user }) => {
          return siblingData.hideCode
        },
      },
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/code.svg`,
  imageAltText: 'Code CTA block icon',
}
