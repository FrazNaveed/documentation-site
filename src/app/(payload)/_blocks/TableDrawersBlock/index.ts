import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '../../../i18n-config'

export const TableDrawersBlock: Block = {
  slug: 'tableDrawers',
  interfaceName: 'Table with Drawers',
  labels: {
    singular: 'Table with Drawers',
    plural: 'Tables with Drawers',
  },
  fields: [
    {
      name: 'column1Header',
      label: 'Column 1 Header',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'column2Header',
      label: 'Column 2 Header',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'sections',
      type: 'array',
      localized: true,
      interfaceName: 'Sections',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'rows',
          type: 'array',
          interfaceName: 'Rows',
          labels: {
            singular: 'Row',
            plural: 'Rows',
          },
          fields: [
            {
              name: 'rowLabel',
              type: 'text',
            },
            {
              name: 'column1Data',
              label: 'Column 1 Data',
              type: 'richText',
              required: true,
            },
            {
              name: 'column2Data',
              label: 'Column 2 Data',
              type: 'richText',
              required: true,
            },
          ],
          admin: {
            isSortable: true,
          },
        }
      ],
      admin: {
        isSortable: true,
      },
    },

    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/table.svg`,
  imageAltText: 'Table block icon',
}
