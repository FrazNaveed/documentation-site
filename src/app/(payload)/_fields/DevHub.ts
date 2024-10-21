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
    ],
    admin: {
      description: 'Settings for the Dev Hub Page Template. Manage content using the Products Collection.',
      condition: (data, siblingData, { user }) => {
        return siblingData.pageTemplate === 'devHub'
       },
    },
  }
]
