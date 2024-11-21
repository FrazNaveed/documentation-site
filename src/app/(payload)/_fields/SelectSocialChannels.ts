import type { Field } from 'payload'
import { socialChannels } from '../_options/socialChannels'

export const SelectSocialChannels: Field[] = [
  {
    name: 'selectSocialChannels',
    type: 'select',
    options: socialChannels,
    hasMany: true,
  },
]
