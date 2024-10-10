import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'

export const NewsTypes: CollectionConfig = {
  slug: 'news-types',
  access: {
    // for seeding purposes; review for production
    read: () => true,
    create: () => true,
    update: () => true,
  },
  labels: {
    singular: 'News Type',
    plural: 'News Types',
  },
  admin: {
    useAsTitle: 'title',
    enableRichTextLink: false,
    group: 'News Types',
  },
  fields: [
    {
      name: 'title',
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
      hooks: {
        beforeValidate: [setSlugFromTitle],
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}