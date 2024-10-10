import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
}
