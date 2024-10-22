import type { Field } from  'payload'

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
        label: 'Link Band',
        fields: [
          {
            name: 'linkBandTitle',
            type: 'text',
          },
          {
            name: 'links',
            type: 'array',
            fields: [
              {
                name: 'linkText',
                type: 'text',
              },
              {
                name: 'linkUrl',
                type: 'text',
              },
            ],
          },
        ],
        admin: {
          description: 'Fill in Link Band Title to override default title "Explorers & Resources"',
        },
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
