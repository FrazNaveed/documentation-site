import type { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'IContactFormBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/clipboard.svg`,
  imageAltText: 'Contact Form block clipboard icon',
}
