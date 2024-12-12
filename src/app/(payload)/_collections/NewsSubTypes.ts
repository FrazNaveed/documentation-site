import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import validateSlug from '../_utils/validateSlug'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'

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
      validate: validateSlug,
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