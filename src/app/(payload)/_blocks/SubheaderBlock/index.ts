import { Block } from 'payload'
import { i18n } from '@/src/app/i18n-config'

export const SubheaderBlock: Block = {
  slug: 'subheader',
  interfaceName: 'Subheader',
  fields: [
    {
      name: 'subheader',
      type: 'textarea',
    },
  ],
  imageURL: `/${i18n.defaultLocale}/icons/type.svg`,
  imageAltText: 'Subheader icon',
}