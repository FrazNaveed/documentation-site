import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'

export const NewsTypes: CollectionConfig = {
  slug: 'news-types',
  access: {
    read: () => true,
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
      admin: {
        description: slugAdminConfig.description,
      },
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