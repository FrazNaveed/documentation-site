import { Block } from 'payload'
import { i18n } from '../../../i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const ResponsiveImageBlock: Block = {
  slug: 'responsiveImage',
  interfaceName: 'IResponsiveImage',
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'imageDefault',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      required: true,
    },
    {
      name: 'imageMedium',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    {
      name: 'imageMobile',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/image.svg`,
  imageAltText: 'Responsive Image block icon',
}
