import type { Block } from 'payload'
import { i18n } from '@/src/app/i18n-config'
import {
  AlignFeature,
  IndentFeature,
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TalkingPoints: Block = {
  slug: 'talkingPoints',
  labels: {
    singular: 'Talking Points',
    plural: 'Talking Points',
  },
  fields: [
    {
      name: 'points',
      type: 'array',
      label: 'Point',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                width: '40%',
              },
            },
            {
              name: 'header',
              type: 'text',
              admin: {
                width: '60%',
              },
            },
          ],
        },
        {
          name: 'textTest',
          type: 'text',
        },
        {
          name: 'text',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              AlignFeature(),
              IndentFeature(),
              BoldFeature(),
              InlineToolbarFeature(),
              ItalicFeature(),
              ParagraphFeature(),
              StrikethroughFeature(),
              SubscriptFeature(),
              SuperscriptFeature(),
              UnderlineFeature(),
              HeadingFeature({ enabledHeadingSizes: [] }),
              LinkFeature({
                enabledCollections: ['news', 'pages'], // extract to const
                fields: ({ defaultFields }) => [
                  ...defaultFields,
                ],
              }),
            ],
          }),
        },
      ],
      localized: true,
      minRows: 1,
      required: true,
      admin: {
        isSortable: true,
      },
    },
    {
      name: 'createSideNavLink',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  imageURL: `/${i18n.defaultLocale}/icons/grid.svg`,
  imageAltText: 'Talking Points block icon',
}
