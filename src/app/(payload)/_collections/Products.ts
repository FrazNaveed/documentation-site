import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import validateSlug from '../_utils/validateSlug'
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
      validate: validateSlug,
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
        description: 'External Link field will override internal Slug field on the Developer Hub page. Layer Cake component will link to internal Slug.'
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