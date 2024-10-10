import type { CollectionConfig, FieldHook } from 'payload'
import { HeroFields } from '../_fields/HeroFields'
import { PageFooterCTA } from '../_fields/PageFooterCTA'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { RichTextBlock } from 'src/app/(payload)/_blocks/RichTextBlock'
import { getSiblingData } from 'payload/shared'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'
import {
  AlignFeature,
  IndentFeature,
  BlocksFeature,
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UploadFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { StatsBlock } from '../_blocks/StatsBlock'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
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
      admin: {
        description: slugAdminConfig.description,
      },
      hooks: {
        beforeValidate: [setSlugFromTitle],
      },
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
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              BoldFeature(),
              InlineToolbarFeature(),
              ItalicFeature(),
              ParagraphFeature(),
              SubscriptFeature(),
              SuperscriptFeature(),
              LinkFeature({
                enabledCollections: ['news', 'pages'], // addd to a config?
                fields: ({ defaultFields }) => [
                  ...defaultFields,
                ],
              }),
            ],
          }),
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
        StatsBlock,
        TalkingPoints,
      ],
    },
    ...PageFooterCTA,
  ],
}
