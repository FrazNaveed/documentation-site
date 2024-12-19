import type { CollectionConfig } from 'payload'
import validateSlug from '../_utils/validateSlug'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'
import setSlugFromTitle from '../_utils/setSlugFromTitle'

export const Careers: CollectionConfig = {
  slug: 'careers',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Career',
    plural: 'Careers',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      validate: validateSlug,
      admin: {
        description: slugAdminConfig.description,
      },
      hooks: {
        beforeValidate: [setSlugFromTitle],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description that displays in card'
      },
    },
    {
      name: 'productTeam',
      type: 'relationship',
      relationTo: 'product-teams',
      hasMany: false,
      required: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'locations',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'Remote',
          type: 'checkbox',
          label: 'Remote',
        },
        {
          name: 'Europe',
          type: 'checkbox',
          label: 'Europe',
        },
        {
          name: 'Asia',
          type: 'checkbox',
          label: 'Asia',
        },
        {
          name: 'Americas',
          type: 'checkbox',
          label: 'Americas',
        },
      ],
      validate: (value) => {
        if (!value || !Object.values(value).some(Boolean)) {
          return 'Please select at least one location'
        }
        return true
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
  ],
}
