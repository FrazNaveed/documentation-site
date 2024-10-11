import type { Field } from 'payload'
import {
  AlignFeature,
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const WalletsGrid: Field[] = [
  {
    name: 'walletsGrid',
    type: 'group',
    label: 'Wallets Page Template',
    interfaceName: 'WalletsGrid',
    fields: [
      {
        name: 'walletsGridIntro',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ defaultFeatures }) => [
            AlignFeature(),
            BoldFeature(),
            InlineToolbarFeature(),
            ItalicFeature(),
            ParagraphFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            UnderlineFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
            LinkFeature(),
          ],
        }),
        label: 'Wallet Grid Intro Text',
        localized: true,
      },
      {
        name: 'wallets',
        type: 'relationship',
        relationTo: 'wallets',
        hasMany: true,
        label: 'Wallets',
        admin: {
          description: 'Select the wallets to display in a grid. Manage Wallets using the Wallets Collection.',
        },
      }
    ],
    admin: {
      description: 'Add intro text above Wallets Grid. Manage Wallets using the Wallets Collection.',
      condition: (data, siblingData, { user }) => {
        return siblingData.pageTemplate === 'wallets'
       },
    },
  },
]
