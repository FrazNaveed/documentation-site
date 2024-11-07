import type { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'

export const VideoEmbedBlock: Block = {
  slug: 'videoEmbedBlock',
  interfaceName: 'VideoEmbedBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
      localized: true,
      validate: validateTextFieldUrl,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/video.svg`,
  imageAltText: 'Video block icon',
}
