import { Block } from 'payload'

export const WalletsGridBlock: Block = {
  slug: 'walletsGrid',
  interfaceName: 'WalletsGrid',
  fields: [
    {
      name: 'intro',
      type: 'richText',
      localized: true,
      hidden: true,
    },
  ],
}
