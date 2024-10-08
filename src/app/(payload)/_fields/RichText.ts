import { Field } from 'payload'
  import {
  BlocksFeature,
  HeadingFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Video } from '../_blocks/Video'

export const RichTextField: Field = {
  name: 'richText',
  type: 'richText',
  localized: true,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5'] }),
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
}
