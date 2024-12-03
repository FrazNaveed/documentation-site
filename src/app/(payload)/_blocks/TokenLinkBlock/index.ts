import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'
import { array } from 'payload/shared'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'

export const TokenLinkBlock: Block = {
  slug: 'tokenLink',
  interfaceName: 'ITokenLinkBlock',
  dbName: 'tokenLink',
  fields: [
    {
      name: 'tokenLinks',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
          validate: validateTextFieldUrl,
        },
        {
          name: 'icon',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/link.svg`,
  imageAltText: 'Token Link block icon',
}
