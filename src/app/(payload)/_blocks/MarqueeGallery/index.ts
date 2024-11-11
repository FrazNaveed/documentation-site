import { i18n } from '@/src/app/i18n-config'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'
import { Block } from 'payload'
import isValidSocialSlotInMarquee from 'src/app/(frontend)/_utils/isValidSocialSlotInMarquee'
import { Page, IMarqueeGallery } from 'payload-types'

function socialLinksAllowed(components: Page['components'], cardId: string) {
  let index = -1 // Set index to -1 if no card with the cardId is found
  // Iterate through each component in the components array
  if (components) {
    for (let component of components) {
      if (component.blockType === 'marqueeGallery') {
        // Find the index of the current card
        const cardIndex = component.cards?.findIndex(card => card.id === cardId)
        // If a matching card is found, set the current index
        if (cardIndex && cardIndex !== -1) {
          index = cardIndex
        }
      }
    }
  }

  const isSmallCardSlot = isValidSocialSlotInMarquee(index)
  if (isSmallCardSlot) {
    return true
  }
  return false
}

export const MarqueeGallery: Block = {
  slug: 'marqueeGallery',
  interfaceName: 'IMarqueeGallery',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'eventCardEyebrow',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'This will display on the event card when there\s no featured event.',
      },
    },
    {
      name: 'eventCardTitle',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'This will display on the event card when there\s no featured event.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'isSocialLink',
          label: 'Add social link',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Add social count and link instead of image. Use global Social Links collection to modify count, icon, and links. Social links may only be added in certain slots in the gallery to maintain the pattern of the grid',
            condition: (data, siblingData, { user }) => {
              return socialLinksAllowed(data.components, siblingData.id)
            },
          },
        },
        {
          name: 'imageCard',
          type: 'group',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'titleOverlay',
              label: 'Title Overlay (Optional)',
              type: 'text',
            },
            {
              name: 'textOverlay',
              label: 'Text Overlay (Optional)',
              type: 'richText',
            },
          ],
          admin: {
            condition: (data, siblingData, { user }) => {
              const socialLinkAllowed = socialLinksAllowed(data.components, siblingData.id)
              if (!socialLinkAllowed) {
                return true
              }
              return !siblingData.isSocialLink
            },
          },
        },
        {
          name: 'socialChannel',
          label: 'Social Channel',
          type: 'relationship',
          relationTo: 'social-links',
          hasMany: false,
          required: true,
          admin: {
            condition: (data, siblingData, { user }) => {
              const socialLinkAllowed = socialLinksAllowed(data.components, siblingData.id)
              return siblingData.isSocialLink && socialLinkAllowed
            },
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
  imageURL: `/${i18n.defaultLocale}/icons/image.svg`,
  imageAltText: 'Marquee Gallery block icon',
}
