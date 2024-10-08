import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../_fields/CreateSideNavLink'
import { i18n } from '../../i18n-config'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'Image',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/image.svg`,
  imageAltText: 'Image block icon',
}
