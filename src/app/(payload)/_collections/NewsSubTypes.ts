import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'

export const NewsSubTypes: CollectionConfig = {
  slug: 'news-sub-types',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'News Sub Type',
    plural: 'News Sub Types',
  },
  admin: {
    useAsTitle: 'name',
    enableRichTextLink: false,
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