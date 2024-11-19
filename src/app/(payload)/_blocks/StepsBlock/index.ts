import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const StepsBlock: Block = {
  slug: 'steps',
  interfaceName: 'IStepsBlock',
  dbName: 'steps',
  labels: {
    singular: 'Steps',
    plural: 'Steps',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'steps',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
      ],
      admin: {
        isSortable: true,
      },
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/list.svg`,
  imageAltText: 'Steps block icon',
}
