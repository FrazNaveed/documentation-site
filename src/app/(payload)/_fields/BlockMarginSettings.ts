import type { Field } from 'payload'

export const BlockMarginSettings: Field [] = [
  {
    type: 'row',
    fields: [
      {
        name: 'blockMarginSettings',
        label: 'Show Margin Settings',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'standardTopMargin',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Set top margin to standard paragraph spacing',
          condition: (data, sibilngData, { user }) => {
            return sibilngData.blockMarginSettings
          },
        },
      },
      {
        name: 'standardBottomMargin',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Set bottom margin to standard paragraph spacing',
          condition: (data, sibilngData, { user }) => {
            return sibilngData.blockMarginSettings
          },
        },
      },
    ],
  },
]
