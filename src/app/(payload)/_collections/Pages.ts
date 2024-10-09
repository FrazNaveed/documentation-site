import type { CollectionConfig } from 'payload'
import { HeroFields } from '../_fields/HeroFields'
import { PageFooterCTA } from '../_fields/PageFooterCTA'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { RichTextBlock } from 'src/app/(payload)/_blocks/RichTextBlock'
import { StatsBlock } from '../_blocks/StatsBlock'
import { TalkingPoints } from '../_blocks/TalkingPoints'

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
    },
    {
      name: 'components',
      type: 'blocks',
      blocks: [
        ColumnsBlock,
        ImageBlock,
        RichTextBlock,
        StatsBlock,
        TalkingPoints,
      ],
    },
    ...PageFooterCTA,
  ],
}
