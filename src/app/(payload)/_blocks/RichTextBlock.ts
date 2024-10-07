import { Block } from 'payload'
import { i18n } from '../../i18n-config'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichText',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      localized: true,
    },
    {
      name: 'createSideNavLink',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  imageURL: `/${i18n.defaultLocale}/icons/align-left.svg`,
  imageAltText: 'Rich text block icon',
}
