import type { Block } from 'payload'

export const Video: Block = {
  slug: 'video',
  fields: [
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'foo',
      type: 'text',
    },
  ],
}
