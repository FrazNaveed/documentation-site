import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../_fields/CreateSideNavLink'

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
  imageURL: '/icons/image.svg',
  imageAltText: 'Image block icon',
}
