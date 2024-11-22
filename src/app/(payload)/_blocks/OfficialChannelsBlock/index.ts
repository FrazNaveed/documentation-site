import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { SelectSocialChannels } from '../../_fields/SelectSocialChannels'

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
    ...SelectSocialChannels,
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/bell.svg`,
  imageAltText: 'Official Channels block icon',
}
