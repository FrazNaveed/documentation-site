import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Career',
    plural: 'Careers',
  },
  admin: {
    useAsTitle: 'jobTitle',
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'productTeam',
      type: 'relationship',
      relationTo: 'events', // change to productTeam collection after creation
      hasMany: false,
      required: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'locations',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'locationsRemote',
          type: 'checkbox',
          label: 'Remote',
        },
        {
          name: 'locationsEurope',
          type: 'checkbox',
          label: 'Europe',
        },
        {
          name: 'locationsAsia',
          type: 'checkbox',
          label: 'Asia',
        },
        {
          name: 'locationsAmericas',
          type: 'checkbox',
          label: 'Americas',
        },
      ],
      validate: (value) => {
        if (!value || !Object.values(value).some(Boolean)) {
          return 'Please select at least one location'
        }
        return true
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
  ],
}
