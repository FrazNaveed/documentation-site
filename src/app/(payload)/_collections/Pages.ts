import type { CollectionConfig, FieldHook } from 'payload'
import { HeroFields } from '../_fields/HeroFields'
import { PageFooterCTA } from '../_fields/PageFooterCTA'
import { ColumnsBlock } from '../_blocks/ColumnsBlock'
import { ImageBlock } from '../_blocks/ImageBlock'
import { ImageTextGridBlock } from '../_blocks/ImageTextGridBlock'
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
import { ApplicationProcess } from '../_blocks/ApplicationProcessBlock'
import { TableDrawersBlock } from '../_blocks/TableDrawersBlock'
import { DevHub } from '../_fields/DevHub'
import { RegionalLinkGrid } from '../_blocks/RegionalLinkGridBlock'
import { MarqueeGallery } from '../_blocks/MarqueeGallery'
import { TeamGrid } from '../_fields/Team'
import { WalletsGrid } from '../_fields/WalletsGrid'
import { TalkingPoints } from '../_blocks/TalkingPointsBlock'
import { PastFeaturedGrantsGridBlock } from '../_blocks/PastFeaturedGrantsGridBlock'
import { TwoColumnBlock } from '../_blocks/TwoColumnBlock'
import { TwoColumnCtaBlock } from '../_blocks/TwoColumnCtaBlock'
import { OfficialChannelsBlock } from '../_blocks/OfficialChannelsBlock'
import { FlareDropDatesBlock } from '../_blocks/FlareDropDatesBlock'
import { VideoEmbedBlock } from '../_blocks/VideoEmbedComponentBlock'
import { CodeCtaBlock } from '../_blocks/CodeCtaBlock'
import { FeaturedNewsCarouselBlock } from '../_blocks/FeaturedNewsCarouselBlock'
import { BrandLogoRollBlock } from '../_blocks/BrandLogoRollBlock'
import { ResponsiveImageBlock } from '../_blocks/ResponsiveImage'
import { StepsBlock } from '../_blocks/StepsBlock'
import { LayerCakeBlock } from '../_blocks/LayerCakeBlock'
import { FastPanelBlock } from '../_blocks/FastPanelBlock'
import { DecentralizedPanelBlock } from '../_blocks/DecentralizedPanelBlock'
import { SecurePanelBlock } from '../_blocks/SecurePanelBlock'
import { EventsWidgetBlock } from '../_blocks/EventsWidgetBlock'
import { ContactFormBlock } from '../_blocks/ContactFormBlock'

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
      },
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
    ...DevHub,
    ...TeamGrid,
    ...WalletsGrid,
    {
      name: 'components',
      type: 'blocks',
      blocks: [
        ColumnsBlock,
        ImageBlock,
        ImageTextGridBlock,
        RichTextBlockWithSideNavLink,
        PastFeaturedGrantsGridBlock,
        StatsBlock,
        TableDrawersBlock,
        TalkingPoints,
        TwoColumnBlock,
        ApplicationProcess,
        OfficialChannelsBlock,
        RegionalLinkGrid,
        FlareDropDatesBlock,
        TwoColumnCtaBlock,
        VideoEmbedBlock,
        CodeCtaBlock,
        FeaturedNewsCarouselBlock,
        BrandLogoRollBlock,
        MarqueeGallery,
        ResponsiveImageBlock,
        StepsBlock,
        LayerCakeBlock,
        FastPanelBlock,
        DecentralizedPanelBlock,
        SecurePanelBlock,
        EventsWidgetBlock,
        ContactFormBlock,
      ],
      admin: {
        condition: (data, siblingData, { user }) => {
          const pageTemplatesWithNoComponents = [ 'devHub', 'events', 'team', 'wallets', ]
          if (pageTemplatesWithNoComponents.includes(siblingData.pageTemplate)) {
            return false
          } else {
            return true
          }
         }
      }
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
    ...PageFooterCTA,
    {
      name: 'pageTemplate',
      type: 'select',
      label: 'Page Template',
      required: true,
      defaultValue: 'default',
      localized: true,
      options: [
        { label: 'Default', value: 'default', },
        { label: 'Dev Hub ', value: 'devHub', },
        { label: 'Events ', value: 'events', },
        { label: 'Full-width', value: 'fullWidth', },
        { label: 'Team', value: 'team' },
        { label: 'Wallets', value: 'wallets', },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
