import type { Field, User } from 'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

const hideWhenSocialMedia = (
  data: any,
  siblingData: { useSocialMediaButtons?: boolean },
  { user }: { user: User | null },
  ): boolean => !siblingData.useSocialMediaButtons

export const ButtonFields = (includeSecondaryButton = false) => {
  const baseButton: Field = {
    type: 'row',
    fields: [
      {
        name: 'buttonText',
        type: 'text',
        localized: true,
        admin: {
          width: '25%',
          condition: hideWhenSocialMedia,
        },
      },
      {
        name: 'buttonLink',
        type: 'text',
        localized: true,
        validate: validateTextFieldUrl,
        admin: {
          width: '75%',
          condition: hideWhenSocialMedia,
        }
      },
    ],
  }

  const buttonFields = [baseButton]
  if (includeSecondaryButton) {
    const secondaryButton: Field = {
      type: 'row',
      fields: [
        {
          name: 'buttonSecondaryText',
          type: 'text',
          localized: true,
          admin: {
            width: '25%',
            condition: hideWhenSocialMedia,
          },
        },
        {
          name: 'buttonSecondaryLink',
          type: 'text',
          localized: true,
          validate: validateTextFieldUrl,
          admin: {
            width: '75%',
            condition: hideWhenSocialMedia,
          }
        },
      ],
    }
    buttonFields.push(secondaryButton)
  }

  return buttonFields
}
