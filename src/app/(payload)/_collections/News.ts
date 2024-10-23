import type { CollectionConfig } from 'payload'
import setSlugFromTitle from '../_utils/setSlugFromTitle'
import { slugAdminConfig } from '../_utils/SlugDescriptionConfig'
import { richTextFieldCustomized } from '../_fields/RichText'
import { Video } from '../_blocks/VideoBlock'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
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
      admin: {
        description: slugAdminConfig.description,
      },
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
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'news',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      maxRows: 3,
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
      localized: true,
    },
    richTextFieldCustomized('content'),
  ]
}
