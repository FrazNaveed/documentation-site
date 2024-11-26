import { i18n } from '@/src/app/i18n-config'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { Block } from 'payload'

export const EventsWidgetBlock: Block = {
  slug: 'eventsWidget',
  interfaceName: 'IEventsWidget',
  fields: [
    {
      name: 'titleOverride',
      type: 'text',
      admin: {
        description: 'Override default title "Upcoming Events"',
      },
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/calendar.svg`,
  imageAltText: 'Events Widget block icon',  
}
