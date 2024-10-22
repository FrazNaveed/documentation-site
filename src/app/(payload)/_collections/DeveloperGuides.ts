import type { CollectionConfig } from 'payload'

export const DeveloperGuides: CollectionConfig = {
  slug: 'developerGuides',
  labels: {
    singular: 'Developer Guide',
    plural: 'Developer Guides'
  },
  admin: {
    enableRichTextLink: false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      localized: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'developerGuideTags',
      hasMany: true,
      required: false,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
      required: false,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
