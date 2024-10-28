import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'

export const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  interfaceName: 'twoColumns',
  fields: [
    {
      name: 'layout',
      type: 'select',
      options: [
        {
          label: 'Default (standard / wide)',
          value: 'default',
        },
        {
          label: 'Reverse (wide / standard)',
          value: 'reverse',
        },
        {
          label: 'Even (Equal Widths)',
          value: 'even',
        },
      ],
      defaultValue: 'default',
    },
    {
      name: 'Column 1',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'contentType',
          type: 'radio',
          options: [
            {
              label: 'Image',
              value: 'image',
            },
            {
              label: 'Text',
              value: 'text',
            },
          ],
          defaultValue: 'image',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'image'
            },
          },
        },
        {
          name: 'text',
          type: 'richText',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'text'
            },
          },
        },
        {
          name: 'imageAlignment',
          type: 'select',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          defaultValue: 'center',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'image'
            },
          },
        },
        {
          name: 'imageFill',
          type: 'select',
          options: [
            {
              label: 'Contain',
              value: 'contain',
            },
            {
              label: 'Cover',
              value: 'cover',
            },
          ],
          defaultValue: 'contain',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'image'
            },
          },
        },
      ],
    },
    {
      name: 'Column 2',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'contentType',
          type: 'radio',
          options: [
            {
              label: 'Image',
              value: 'image',
            },
            {
              label: 'Text',
              value: 'text',
            },
          ],
          defaultValue: 'image',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'image'
            },
          },
        },
        {
          name: 'text',
          type: 'richText',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'text'
            },
          },
        },
        {
          name: 'imageAlignment',
          type: 'select',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          defaultValue: 'center',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'image'
            },
          },
        },
        {
          name: 'imageFill',
          type: 'select',
          options: [
            {
              label: 'Contain',
              value: 'contain',
            },
            {
              label: 'Cover',
              value: 'cover',
            },
          ],
          defaultValue: 'contain',
          admin: {
            condition: (data, siblingData, { user }) => {
              return siblingData.contentType === 'image'
            },
          },
        },
      ],
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/columns.svg`,
  imageAltText: 'Two Column block icon',
}
