import { Block } from 'payload'
import { RichTextField } from '../_fields/RichText'
import { i18n } from '../../i18n-config'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichText',
  fields: [
    RichTextField,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/align-left.svg`,
  imageAltText: 'Rich text block icon',
}
