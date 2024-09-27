import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    // for seeding purposes; review for production
    read: () => true,
    create: () => true,
    update: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'slug',
      'author',
      'publishDate',
      'type',
      'pin',
      'pinPriority',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name:'slug',
      type:'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        }
      },
      required: true,
    },
    {
      name: 'author',
      type:'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'news-types',
      hasMany: false,
      required: true,
      localized: true,
    },
    {
      name: 'subtype',
      type: 'relationship',
      relationTo: 'news-sub-types',
      hasMany: false,
      required: false,
      localized: true,
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 0,
      maxRows: 3,
      labels: {
        singular: 'Logo',
        plural: 'Logos',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'pin',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'pinPriority',
      type: 'radio',
      options: [
        '0',
        '1',
        '2',
        '3',
      ],
      defaultValue: '0',
      admin: {
        condition: (data, { user }) => {
          if (data.pin) {
            return true
          } else {
            return false
          }
        },
      },
    },
  ]
}
