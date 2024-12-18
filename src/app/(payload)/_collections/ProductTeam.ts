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
    useAsTitle: 'teamTitle',
  },
  fields: [
    {
      name: 'teamTitle',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
