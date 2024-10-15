import { Block } from 'payload'
import { RichTextField } from '../../_fields/RichText'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '../../../i18n-config'

export const RichTextBlockWithSideNavLink: Block = {
  slug: 'richTextBlock',
  interfaceName: 'RichTextBlock',
  fields: [
      RichTextField,
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/align-left.svg`,
  imageAltText: 'Rich text block icon',
}
