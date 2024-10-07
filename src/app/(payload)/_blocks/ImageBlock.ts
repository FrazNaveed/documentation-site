import { Block } from 'payload'
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
    {
      name: 'createSideNavLink',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  imageURL: `${i18n.defaultLocale}/icons/image.svg`,
  imageAltText: 'Image block icon',
}
