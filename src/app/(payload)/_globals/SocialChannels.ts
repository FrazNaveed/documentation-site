import { Field, GlobalConfig } from 'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

const channelFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    localized: true,
    validate: validateTextFieldUrl,
  },
  {
    name: 'followerCount',
    type: 'text',
    localized: true,
    admin: {
      description: 'Used in Marquee Gallery block, for example.',
    },
  },
]

export const SocialChannels: GlobalConfig = {
  slug: 'social-channels',
  fields: [
    {
      name: 'discord',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
    {
      name: 'github',
      label: 'GitHub',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
    {
      name: 'medium',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
    {
      name: 'telegram',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
    {
      name: 'x',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
    {
      name: 'youtube',
      label: 'YouTube',
      type: 'group',
      fields: [
        ...channelFields,
      ],
    },
  ],
}
