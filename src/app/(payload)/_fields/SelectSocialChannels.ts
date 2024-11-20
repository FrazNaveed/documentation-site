import type { Field } from 'payload'

export const SelectSocialChannels: Field[] = [
  {
    name: 'selectSocialChannels',
    type: 'select',
    options: [
      {
        label: 'Discord',
        value: 'discord',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin',
      },
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Telegram',
        value: 'telegram',
      },
      {
        label: 'X',
        value: 'x',
      },
      {
        label: 'YouTube',
        value: 'youtube',
      },
    ],
    hasMany: true,
    admin: {
      condition: (data, siblingData, { user }) => {
        // how to handle this field in blocks that use it without a condition
        return siblingData.useSocialMediaButtons
      },
    }
  }
]
