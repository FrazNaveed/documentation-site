import type { Field } from 'payload'

export const Careers: Field[] = [
  {
    name: 'careers',
    type: 'group',
    label: 'Careers Page Template',
    interfaceName: 'careers',
    fields: [
      {
        name: 'pageTitle',
        type: 'text',
        defaultValue: 'Open Roles',
        localized: true,
        admin: {
          description: 'Override default title "Open Roles"',
        },
      },
      {
        name: 'content',
        type: 'richText',
        localized: true,
        admin: {
          description: 'Displays above career listings',
        }
      },
      {
        name: 'emptyListingsText',
        type: 'richText',
        localized: true,
        admin: {
          description: 'Displays when no open roles are available',
        },
      },
    ],
    admin: {
      description: 'Settings for the Careers Page Template. Manage listings using the Careers Collection.',
      condition: (data, siblingData, { user }) => {
        return siblingData.pageTemplate === 'careers'
       },
    },
  },
]
