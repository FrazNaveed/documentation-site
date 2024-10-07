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
        },
      },
      {
        name: 'linkText',
        type: 'text',
        required: true,
        admin: {
          condition: ( data, getSiblingData, { user }) => {
            if (getSiblingData.createSideNavLink) {
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
