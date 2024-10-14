import type { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'

export const VideoEmbedBlock: Block = {
  slug: 'videoEmbedBlock',
  interfaceName: 'videoEmbedBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/video.svg`,
  imageAltText: 'Video block icon',
}
