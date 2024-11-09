import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const FlareDropDatesBlock: Block = {
  slug: 'flareDropDates',
  interfaceName: 'FlareDropDates',
  labels: {
    singular: 'Flare Drop Dates',
    plural: 'Flare Drop Dates',
  },
  fields: [
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings
  ],
  imageURL: `/${i18n.defaultLocale}/icons/droplet.svg`,
  imageAltText: 'Flare Drop Dates block icon',
}
