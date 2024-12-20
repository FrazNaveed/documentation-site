import type { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const NewsletterSignupFormBlock: Block = {
  slug: 'newsletterSignupForm',
  interfaceName: 'INewsletterSignupFormBlock',
  dbName: 'newsletterForm',
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
  imageAltText: 'Newsletter Signup Form block clipboard icon',
}
