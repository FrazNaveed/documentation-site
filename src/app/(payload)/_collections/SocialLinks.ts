import { CollectionConfig } from 'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

export const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: validateTextFieldUrl,
    },
    {
      name: 'icon',
      type: 'upload',
      label: 'Override Icon (Optional)',
      relationTo: 'media',
      admin: {
        description: 'Replace default logo. Default logo is automatically matched to name used in Title.',
      },
    },
  ],
  admin: {
    useAsTitle: 'title',
  },
}
