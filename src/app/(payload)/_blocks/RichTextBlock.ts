import { Block } from 'payload'

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
}
