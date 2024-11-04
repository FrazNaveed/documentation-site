import { Block } from 'payload'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'

export const FlareDropDatesBlock: Block = {
  slug: 'flareDropDates',
  interfaceName: 'FlareDropDates',
  labels: {
    singular: 'Flare Drop Dates',
    plural: 'Flare Drop Dates',
  },
  fields: [
    ...CreateSideNavLinkFields,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/droplet.svg`,
  imageAltText: 'Flare Drop Dates block icon',
}
