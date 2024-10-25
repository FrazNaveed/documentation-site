import type { CollectionConfig } from 'payload'
import countryArray from '../_utils/countryArray'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

export const Grants: CollectionConfig = {
  slug: 'grants',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Grant',
    plural: 'Grants',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'country',
          type: 'select',
          options: countryArray,
          required: true,
          localized: true,
          defaultValue: 'US',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'announcementLink',
      type: 'text',
      validate: validateTextFieldUrl,
    },
    {
      name: 'grantCategory',
      type: 'relationship',
      relationTo: 'grant-types',
      hasMany: true,
      localized: true,
    },
  ],
}
