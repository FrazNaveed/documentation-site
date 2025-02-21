import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'
import countryArray from '../../_utils/countryArray'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

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
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/link.svg`,
  imageAltText: 'Regional Link Grid block icon',
}
