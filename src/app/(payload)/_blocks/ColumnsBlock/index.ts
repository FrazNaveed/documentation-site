import { Block } from 'payload'
import { RichTextBlock } from '../RichTextBlock'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '../../../i18n-config'

const imageBlock: Block = {
  slug: 'colImage',
  fields: [
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    }
  ],
  imageURL: `/${i18n.defaultLocale}/icons/image.svg`,
  imageAltText: 'Left Column image block icon',
}

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'Columns',
  labels: {
    singular: 'Columns',
    plural: 'Columns',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      options: [
        {
          label: 'Equal Width',
          value: 'equal',
        },
        {
          label: 'Wide Left',
          value: 'wideLeft',
        },
        {
          label: 'Wide Right',
          value: 'wideRight',
        },
      ],
      defaultValue: 'equal',
    },
    {
      name: 'alignColumns',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Align both columns to top of block.',
      },
    },
    {
      name: 'leftColumnBlock',
      type: 'blocks',
      blocks: [
        imageBlock,
        RichTextBlock,
      ],
      admin: {
        description: 'Add image or text to this column',
      },
      maxRows: 1,
    },
    {
      name: 'rightColumnBlock',
      type: 'blocks',
      blocks: [
        imageBlock,
        RichTextBlock,
      ],
      admin: {
        description: 'Add image or text to this column',
      },
      maxRows: 1,
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/columns.svg`,
  imageAltText: 'Columns block icon',
}
