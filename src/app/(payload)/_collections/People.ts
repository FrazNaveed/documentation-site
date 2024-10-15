import type { CollectionConfig } from 'payload'

export const People: CollectionConfig = {
  slug: 'people',
  fields: [
    {
      name: 'fullName',
      type: 'text',
    },
    {
      name: 'jobTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  admin: {
    useAsTitle: 'fullName',
  },
}
