import type { Field } from  'payload'
import countryArray from '../_utils/countryArray'

export const Grants: Field[] = [
  {
    name: 'grants',
    type: 'group',
    label: 'Grants Template',
    interfaceName: 'Grants',
    fields: [
      {
        name: 'featuredGrants',
        type: 'group',
        label: 'Featured Grants in Hero',
        admin: {
          description: 'Information about grants awared to be displayed in the hero',
        },
        fields: [
          {
            name: 'grantsAwarded',
            type: 'number',
          },
          {
            name: 'countries',
            type: 'array',
            interfaceName: 'FeaturedGrantsCountries',
            localized: true,
            fields: [
              {
                name: 'country',
                type: 'select',
                options: countryArray,
                hasMany: false,
                required: true,
              },
            ],
          },
          {
            name: 'topCategories',
            type: 'array',
            interfaceName: 'FeaturedGrantsTopCategories',
            localized: true,
            fields: [
              {
                name: 'type',
                label: 'Grant Type',
                type: 'relationship',
                relationTo: 'grant-types',
                hasMany: false,
                required: true,
              },
              {
                name: 'number',
                type: 'number',
                required: false,
              },
            ],
          },
        ],
      }
    ],
    admin: {
      description: 'Settings for the Grants Page Template. Manage content using the Grants Collection and Grant Types.',
      condition: (data, siblingData, { user }) => {
        return siblingData.pageTemplate === 'grants'
       },
    },
  }
]
