import type { CollectionConfig } from 'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

export const DeveloperGuides: CollectionConfig = {
  slug: 'developerGuides',
  labels: {
    singular: 'Developer Guide',
    plural: 'Developer Guides'
  },
  admin: {
    useAsTitle: 'title',
    enableRichTextLink: false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      localized: true,
    },
    {
      name: 'guideLink',
      type: 'text',
      required: false,
      localized: true,
      validate: validateTextFieldUrl,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'developerGuideTags',
      hasMany: true,
      required: false,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
      required: false,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
