import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
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
import { Video } from '../_blocks/Video'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    // for seeding purposes; review for production
    read: () => true,
    create: () => true,
    update: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'slug',
      'author',
      'publishDate',
      'type',
      'featured',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name:'slug',
      type:'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [setSlugFromTitle],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'author',
      type:'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'news-types',
      hasMany: false,
      required: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subtype',
      type: 'relationship',
      relationTo: 'news-sub-types',
      hasMany: false,
      required: false,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      options: [
        {
          label: 'Video',
          value: 'video',
        },
        {
          label: 'Podcast',
          value: 'podcast',
        },
      ],
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'teaserThumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 0,
      maxRows: 3,
      labels: {
        singular: 'Logo',
        plural: 'Logos',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      label: 'Featured?',
      admin : {
        description: "When checked, this news item will appear at or near the top of the news page, superseded by other featured news with a more recent publish date.",
        position: 'sidebar',
      },
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          AlignFeature(),
          IndentFeature(),
          BlockquoteFeature(),
          BoldFeature(),
          HorizontalRuleFeature(),
          InlineCodeFeature(),
          InlineToolbarFeature(),
          ItalicFeature(),
          OrderedListFeature(),
          ParagraphFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          UnderlineFeature(),
          UnorderedListFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          LinkFeature({
            enabledCollections: ['news'],
            fields: ({ defaultFields }) => [
              ...defaultFields,
            ],
          }),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'caption',
                    type: 'text',
                    localized: true,
                  },
                  {
                    name: 'float',
                    type: 'select',
                    options: [
                      {
                        label: 'Left',
                        value: 'left',
                      },
                      {
                        label: 'Right',
                        value: 'right',
                      },
                    ]
                  },
                ],
              },
            },
          }),
          BlocksFeature({
            blocks: [Video],
          }),
        ],
      }),
    },
  ]
}
