import type { Field } from 'payload'

export const TeamGrid: Field[] = [
  {
    name: 'teamGrid',
    type: 'group',
    label: 'Team Page Template',
    interfaceName: 'TeamGrid',
    fields: [
      {
        name: 'gridTitle',
        label: 'Title',
        type: 'text',
        localized: true,
      },
      {
        name: 'team',
        type: 'relationship',
        relationTo: 'people',
        hasMany: true,
      },
    ],
    admin: {
      description: 'Add title text above the Team Grid. Manage Team members using the People Collection.',
      condition: (data, siblingData, { user }) => {
        return siblingData.pageTemplate === 'team'
       },
    },
  }
]
