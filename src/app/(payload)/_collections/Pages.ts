import type { CollectionConfig, FieldHook } from 'payload'
import { HeroFields } from '../_fields/HeroFields'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { RichTextBlock } from 'src/app/(payload)/_blocks/RichTextBlock'
import { StatsBlock } from '../_blocks/StatsBlock'
import setSlugFromTitle from '../_utils/setSlugFromTitle'

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
      hooks: {
        beforeValidate: [setSlugFromTitle],
      },
    },
    ...HeroFields,
    {
      name: 'hideHero',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'components',
      type: 'blocks',
      blocks: [
        ColumnsBlock,
        ImageBlock,
        RichTextBlock,
        StatsBlock,
      ],
    },
  ],
}
