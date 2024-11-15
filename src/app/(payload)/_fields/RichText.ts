import { Field } from 'payload'
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
import { SubheaderBlock } from '../_blocks/SubheaderBlock'
import { Video } from '../_blocks/VideoBlock'
import { CreateSideNavLinkFields } from '../_fields/CreateSideNavLink'

export const RichTextField: Field = {
  name: 'richText',
  type: 'richText',
  localized: true,
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
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
      LinkFeature(),
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
        blocks: [SubheaderBlock, Video],
      }),
    ],
  }),
}

export const richTextFieldCustomized = (name = 'richText'): Field => {
  return {
    ...RichTextField,
    name,
  }
}