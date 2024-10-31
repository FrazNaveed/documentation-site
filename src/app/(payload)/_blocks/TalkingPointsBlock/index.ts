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
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'

export const TalkingPoints: Block = {
  slug: 'talkingPoints',
  labels: {
    singular: 'Talking Points',
    plural: 'Talking Points',
  },
  interfaceName: 'ITalkingPoints',
  fields: [
    {
      name: 'variation',
      type: 'select',
      options: [
        {
          label: 'Standard (2-up grid)',
          value: 'standard',
        },
        {
          label: 'Wide List',
          value: 'wideList',
        },
      ],
      required: true,
      defaultValue: 'standard',
    },
    {
      name: 'points',
      type: 'array',
      label: 'Point',
      interfaceName: 'PointsList',
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
              required: true,
              admin: {
                width: '60%',
              },
            },
          ],
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
              LinkFeature(),
            ],
          }),
          required: true,
        },
      ],
      localized: true,
      minRows: 2,
      required: true,
      admin: {
        isSortable: true,
      },
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/grid.svg`,
  imageAltText: 'Talking Points block icon',
}
