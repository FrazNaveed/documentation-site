import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const SecurePanelBlock: Block = {
  slug: 'securePanel',
  interfaceName: 'ISecurePanel',
  fields: [
    {
      name: 'text',
      type: 'text',
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/lock.svg`,
  imageAltText: 'Secure Panel block lock icon',
}
