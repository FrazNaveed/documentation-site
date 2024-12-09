import { Block } from 'payload'
import { i18n } from '@/src/app/i18n-config'
import { ButtonFields } from '../../_fields/ButtonFields'

export const HeadingWithButtonBlock: Block = {
  slug: 'headingWithButton',
  interfaceName: 'IHeadingWithButton',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    ...ButtonFields(),
  ],
  imageURL: `/${i18n.defaultLocale}/icons/type.svg`,
  imageAltText: 'Heading with button type icon',
}