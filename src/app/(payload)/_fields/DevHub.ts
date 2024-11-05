import type { Field } from  'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

export const DevHub: Field[] = [
  {
    name: 'devHub',
    type: 'group',
    label: 'Dev Hub Template',
    interfaceName: 'DevHub',
    fields: [
      {
        name: 'productsGrid',
        label: 'Products Grid',
        type: 'relationship',
        relationTo: 'products',
        hasMany: true,
        required: false,
      },
      {
        name: 'linkBand',
        type: 'group',
        localized: true,
        label: 'Link Band',
        fields: [
          {
            name: 'linkBandTitle',
            type: 'text',
            admin: {
              description: 'Fill in to override default title "Explorers & Resources"',
            },
          },
          {
            name: 'links',
            type: 'array',
            interfaceName: 'LinkBandLinks',
            fields: [
              {
                name: 'linkText',
                type: 'text',
              },
              {
                name: 'linkUrl',
                type: 'text',
                validate: validateTextFieldUrl,
              },
            ],
          },
        ],
      }
    ],
    admin: {
      description: 'Settings for the Dev Hub Page Template. Manage content using the Products Collection.',
      condition: (data, siblingData, { user }) => {
        return siblingData.pageTemplate === 'devHub'
       },
    },
  }
]
