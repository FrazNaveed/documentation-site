import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const ApplicationProcess: Block = {
  slug: 'applicationProcess',
  interfaceName: 'ApplicationProcess',
  dbName: 'appProcess',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'steps',
      type: 'array',
      maxRows: 7,
      localized: true,
      interfaceName: 'ApplicationProcessSteps',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'graphicTitle',
          type: 'text',
          admin: {
            description: 'Graphic step titles will use the title field by default. Override it here.',
          }
        },
        {
          name: 'graphicText',
          type: 'text',
          admin: {
            description: 'This will appear inside the colored area of the step in the graphic.',
          }
        },
      ],
      admin: {
        isSortable: true,
      },
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/edit.svg`,
  imageAltText: 'Application Process block icon',
}
