import { Block } from 'payload'

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
  imageURL: '/en/icons/image.svg',
  imageAltText: 'Image block icon',
}
