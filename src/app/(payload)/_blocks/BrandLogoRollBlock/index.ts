import { Block } from 'payload'
import { i18n } from '../../../i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const BrandLogoRollBlock: Block = {
  slug: 'brandLogoRoll',
  interfaceName: 'IBrandLogoRoll',
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'logos',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'link',
          type: 'text',
          validate: validateTextFieldUrl,
        },
      ],
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/list.svg`,
  imageAltText: 'Brand Logo Roll block icon',
}
