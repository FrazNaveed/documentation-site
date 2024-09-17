import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
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
      hasMany: true,
      minRows: 1,
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        'Flare Updates',
        'AMA & Interviews',
        'Past Events',
        'Ecosystem',
        'Research',
      ],
      defaultValue: 'Flare Updates',
    },
    {
      name: 'pin',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'pin priority',
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
