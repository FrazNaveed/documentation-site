import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import validateSlug from '../_utils/validateSlug'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'

export const GrantTypes: CollectionConfig = {
  slug: 'grant-types',
  access: {
    read: () => true,
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
  ],
  admin: {
    useAsTitle: 'title',
    group: 'Grant Types',
  },
}
