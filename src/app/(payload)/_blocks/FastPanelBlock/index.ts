import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const FastPanelBlock: Block = {
  slug: 'fastPanel',
  interfaceName: 'IFastPanel',
  fields: [
    {
      name: 'text',
      type: 'text',
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/zap.svg`,
  imageAltText: 'Fast Panel block zap icon',
}
