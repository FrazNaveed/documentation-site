import type { CollectionConfig } from 'payload'
import { HeroFields } from '../_fields/HeroFields'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { RichTextBlock } from 'src/app/(payload)/_blocks/RichTextBlock'
import { getSiblingData } from 'payload/shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'slug',
      'publishedDate',
      'hideHero',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    ...HeroFields,
    {
      name: 'hideHero',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pageBanner',
      type: 'group',
      fields: [
        {
          name: 'togglePageBanner',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'bannerText',
          type: 'richText',
          localized: true,
          admin: {
            condition: (data, siblingData, { user }) => {
              if (siblingData.togglePageBanner) {
                return true
              } else {
                return false
              }
            },
          },
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'components',
      type: 'blocks',
      blocks: [
        ColumnsBlock,
        ImageBlock,
        RichTextBlock,
      ],
    },
  ],
}
