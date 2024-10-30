import { i18n } from '@/src/app/i18n-config'
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
      ],
      admin: {
        isSortable: true,
      },
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/edit.svg`,
  imageAltText: 'Application Process block icon',
}
