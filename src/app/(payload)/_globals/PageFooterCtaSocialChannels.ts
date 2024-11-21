import { GlobalConfig } from 'payload'
import { socialChannels } from '../_options/socialChannels'

export const SelectPageFooterCtaSocialChannels: GlobalConfig = {
  slug: 'selectPageFooterCtaSocialChannels',
  label: 'Page Footer CTA Social Channels',
  dbName: 'footerCtaSocials',
  fields: [
    {
      name: 'selectSocialChannels',
      type: 'select',
      options: socialChannels,
      hasMany: true,
      admin: {
        description: 'Select Social Channels to display as Social Media buttons in Page Footer CTAs.',
      },
    },
  ],
}
