import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../_fields/CreateSideNavLink'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichText',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      localized: true,
    },
  ...CreateSideNavLinkFields,
  ],
  imageURL: '/icons/align-left.svg',
  imageAltText: 'Rich text block icon',
}
