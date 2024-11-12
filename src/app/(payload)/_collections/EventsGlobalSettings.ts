import { GlobalConfig } from 'payload'

export const EventSettings: GlobalConfig = {
  slug: 'eventSettings',
  fields: [
    {
      name: 'eventCardEyebrow',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'This will display on the event card in a marquee gallery when there\s no featured event.',
      },
    },
    {
      name: 'eventCardTitle',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'This will display on the event card in a marquee gallery when there\s no featured event.',
      },
    },
  ],
}
