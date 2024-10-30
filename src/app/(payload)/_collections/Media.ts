import type { CollectionConfig } from 'payload'
import { deployEnv } from '@/src/environment'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    enableRichTextLink: false,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: {
    staticDir: deployEnv === 'docker' ? '/runtime/media' : 'media',
  },
}
