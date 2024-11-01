import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'
import countryArray from '../../_utils/countryArray'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'

export const RegionalLinkGrid: Block = {
  slug: 'regionalLinkGrid',
  interfaceName: 'IRegionalLinkGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'links',
      type: 'array',
      maxRows: 7,
      localized: true,
      fields: [
        {
          name: 'link',
          type: 'text',
          required: true,
          validate: validateTextFieldUrl,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'translatedName',
          type: 'text',
        },
        {
          name: 'country',
          type: 'select',
          options: countryArray,
          hasMany: false,
        },
      ],
      admin: {
        isSortable: true,
      },
    },
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/link.svg`,
  imageAltText: 'Application Process block icon',
}
