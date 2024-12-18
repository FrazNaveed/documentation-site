import type { CollectionConfig } from 'payload'

export const ProductTeams: CollectionConfig = {
  slug: 'product-teams',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Product Team',
    plural: 'Product Teams',
  },
  admin: {
    useAsTitle: 'teamName',
  },
  fields: [
    {
      name: 'teamName',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
