import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, UploadFeature, LinkFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

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
        }
      },
      required: true,
    },
    {
      name: 'author',
      type:'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'news-types',
      hasMany: false,
      required: true,
      localized: true,
    },
    {
      name: 'subtype',
      type: 'relationship',
      relationTo: 'news-sub-types',
      hasMany: false,
      required: false,
      localized: true,
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
        description: "When checked, this news item will appear at or near the top of the news page, superseded by other featured news with a more recent publish date."
      },
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
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
                  },
                ],
              },
            },
          }),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
  ]
}
