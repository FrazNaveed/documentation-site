import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const DecentralizedPanelBlock: Block = {
  slug: 'decentralizedPanel',
  interfaceName: 'IDecentralizedPanel',
  dbName: 'decenPanel',
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'subheader',
      type: 'text',
      localized: true,
    },
    {
      name: 'text',
      type: 'text',
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/activity.svg`,
  imageAltText: 'Decentralized Panel block line chart icon',
}
