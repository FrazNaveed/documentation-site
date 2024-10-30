import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'

export const DeveloperGuideTags: CollectionConfig = {
  slug: 'developerGuideTags',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Developer Guide Tag',
    plural: 'Developer Guide Tags',
  },
  admin: {
    useAsTitle: 'title',
    enableRichTextLink: false,
    group: 'Developer Guide Types',
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
  ],
}