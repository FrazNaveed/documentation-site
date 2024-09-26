import type { CollectionConfig } from 'payload'

export const NewsTypes: CollectionConfig = {
  slug: 'news-types',
  access: {
    // for seeding purposes; review for production
    read: () => true,
    create: () => true,
  },
  labels: {
    singular: 'News Type',
    plural: 'News Types',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    {
      name: 'heroBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}