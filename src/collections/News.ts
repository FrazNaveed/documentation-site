import type { CollectionConfig } from 'payload'
import { fa } from 'payload/i18n/fa'
import { getSiblingData } from 'payload/shared'

export const News: CollectionConfig = {
  slug: 'news',
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
        { label: 'flareUpdates', value: 'Flare Updates' },
        { label: 'amaInterviews', value: 'AMA & Interviews'},
        { label: 'pastEvents', value: 'Past Events' },
        { label: 'ecosystem', value: 'Ecosystem' },
        { label: 'research', value: 'Research' },
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
