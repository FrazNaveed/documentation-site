import { GlobalConfig } from 'payload'

export const SelectPageFooterCtaSocialChannels: GlobalConfig = {
  slug: 'selectPageFooterCtaSocialChannels',
  label: 'Page Footer CTA Social Channels',
  dbName: 'footerCtaSocials',
  fields: [
    {
      name: 'selectSocialChannels',
      type: 'select',
      options: [
        {
          label: 'Discord',
          value: 'discord',
        },
        {
          label: 'GitHub',
          value: 'github',
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
        description: 'Select Social Channels to display as Social Media buttons in Page Footer CTAs.',
      },
    },
  ],
}
