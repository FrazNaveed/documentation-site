import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const OfficialChannelsBlock: Block = {
  slug: 'officialChannels',
  labels: {
    singular: 'Official Channels',
    plural: 'Official Channels',
  },
  interfaceName: 'OfficialChannelsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'text',
      type: 'richText',
      localized: true,
    },
    {
      name: 'channels',
      type: 'relationship',
      relationTo: 'social-links',
      hasMany: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/bell.svg`,
  imageAltText: 'Official Channels block icon',
}
