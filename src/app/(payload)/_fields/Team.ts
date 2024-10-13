import type { Field } from 'payload'

export const TeamGrid: Field[] = [
  {
    name: 'teamGrid',
    type: 'group',
    label: 'Team Page Template',
    interfaceName: 'TeamGrid',
    fields: [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: 'teamGrid',
        type: 'relationship',
        relationTo: 'people',
        hasMany: true,
      },
    ],
  }
]
