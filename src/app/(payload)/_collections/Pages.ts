import type { CollectionConfig, FieldHook } from 'payload'
import { HeroFields } from '../_fields/HeroFields'
import { PageFooterCTA } from '../_fields/PageFooterCTA'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { RichTextBlockWithSideNavLink } from 'src/app/(payload)/_blocks/RichTextBlockWithSideNavLink'
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
import { TableDrawersBlock } from '../_blocks/TableDrawersBlock'
import { TalkingPoints } from '../_blocks/TalkingPoints'
import { TeamGrid } from '../_fields/Team'

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
      name: 'relatedNewsType',
      type: 'relationship',
      relationTo: 'news-types',
      hasMany: false,
      localized: true,
      admin: {
        description: 'Select a news type to display related posts on this page.',
      }
    },
    {
      name: 'previousPage',
      type: 'relationship',
      relationTo: 'pages',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: false,
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Select a page and it will be linked to as the previous page in the footer.',
      }
    },
    {
      name: 'nextPage',
      type: 'relationship',
      relationTo: 'pages',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: false,
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Select a page to be linked as the next page in the footer.',
      }
    },
    {
      name: 'linkType',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Optionally specify what type of next or previous link this is. Defaults to "Guide" but could be something like "Page", "Article", etc.',
      }
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
              LinkFeature(),
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
    ...TeamGrid,
    {
      name: 'components',
      type: 'blocks',
      blocks: [
        ColumnsBlock,
        ImageBlock,
        RichTextBlockWithSideNavLink,
        StatsBlock,
        TableDrawersBlock,
        TalkingPoints,
      ],
    },
    ...PageFooterCTA,
  ],
}
