import type { CollectionConfig } from 'payload'
import countryArray from '../_utils/countryArray'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

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
        {
          name: 'endTime',
          type: 'date',
          required: false,
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
            },
            width: '15%',
            condition: (data, siblingData, { user }) => {
              if (siblingData.startTime) {
                return true
              } else {
                return false
              }
            },
          },
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
      name: 'eventLink',
      type: 'text',
      validate: validateTextFieldUrl,
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
              validate: validateTextFieldUrl,
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
    {
      name: 'featuredHeroEyebrow',
      type: 'text',
      defaultValue: false,
      admin: {
        description: 'This will override Flare Involvement as the eyebrow in the featured event hero',
      },
    },
  ],
}
