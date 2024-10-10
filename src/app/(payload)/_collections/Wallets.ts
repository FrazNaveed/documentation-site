import type { CollectionConfig } from 'payload'

export const Wallets: CollectionConfig = {
  slug: 'wallets',
  labels: {
    singular: 'Wallet',
    plural: 'Wallets'
  },
  admin: {
    useAsTitle: 'name',
    enableRichTextLink: false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          }
        },
        {
          name: 'walletLink',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          }
        },
      ],
    },
    {
      name: 'flrFunctionality',
      label: 'FLR Functionality',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'walletConnect',
      label: 'Wallet Connect',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          value: 'wrap',
          label: 'Wrap',
        },
        {
          value: 'delegate',
          label: 'Delegate',
        },
        {
          value: 'stake',
          label: 'Stake',
        },
        {
          value: 'autoclaim',
          label: 'Autoclaim',
        },
        {
          value: 'claim',
          label: 'Claim',
        },
        {
          value: 'voting',
          label: 'Voting',
        },
      ]
    },
    {
      name: 'platforms',
      type: 'select',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          value: 'ios',
          label: 'iOS',
        },
        {
          value: 'android',
          label: 'Android',
        },
        {
          value: 'hardware',
          label: 'Hardware',
        },
      ]
    }
  ],
}
