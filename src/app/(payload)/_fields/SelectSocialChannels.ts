import type { Field } from 'payload'
import { socialChannels } from '../_options/socialChannels'

export const SelectSocialChannels: Field[] = [
  {
    name: 'selectSocialChannels',
    type: 'select',
    options: socialChannels,
    hasMany: true,
    admin: {
      condition: (data, siblingData, { user }) => {
        // how to handle this field in blocks that use it without a condition
        return siblingData.useSocialMediaButtons
      },
    }
  }
]
