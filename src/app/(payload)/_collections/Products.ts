import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Product',
    plural: 'Products',
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
    {
      name: 'link',
      type: 'text',
      validate: validateTextFieldUrl,
      admin: {
        description: 'External link'
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'text',
      localized: true,
    },
    {
      name: 'titleOverride',
      type: 'text',
      localized: true,
      admin: {
        description: 'Title override for the Explore section',
      },
    },
  ],
}