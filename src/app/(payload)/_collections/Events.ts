import type { CollectionConfig } from 'payload'
import countryArray from '../_utils/countryArray'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events'
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
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            width: '25%',
          }
        },
        {
          name: 'startTime',
          type: 'date',
          required: false,
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
            },
            width: '15%',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          required: false,
          admin: {
            width: '25%',
          }
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'select',
          options: countryArray,
          required: true,
          localized: true,
          defaultValue: 'US',
        },
        {
          name: 'location',
          type: 'text',
          required: true,
          hasMany: false,
          localized: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'flareInvolvement',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'buttonType',
              type: 'select',
              options: [
                { label: 'Announcement', value: 'announcement' },
                { label: 'RSVP', value: 'rsvp' },
              ],
              admin: {
                width: '25%',
              },
            },
            {
              name: 'link',
              type: 'text',
            },
          ]
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
