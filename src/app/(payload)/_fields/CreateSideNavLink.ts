import type { Field } from 'payload'
import { getSiblingData } from 'payload/shared'

export const CreateSideNavLinkFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'createSideNavLink',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          width: '20%',
          condition: ( data, getSiblingData, { user }) => {
            if (data.pageTemplate !== 'fullWidth') {
              return true
            } else {
              return false
            }
          },
        },
      },
      {
        name: 'linkText',
        type: 'text',
        required: true,
        localized: true,
        admin: {
          condition: ( data, getSiblingData, { user }) => {
            if (getSiblingData.createSideNavLink && data.pageTemplate !== 'fullWidth') {
              return true
            } else {
              return false
            }
          },
        },
      },
    ],
  }
]
