import type { Field } from 'payload'
import validateTextFieldUrl from '../_utils/validateTextFieldUrl'

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
          condition: ( data, siblingData, { user }) => {
            if (siblingData.useSocialMediaButtons) {
              return false
            } else {
              return true
            }
          },
        },
      },
      {
        name: 'buttonLink',
        type: 'text',
        localized: true,
        validate: validateTextFieldUrl,
        admin: {
          width: '75%',
          condition: ( data, siblingData, { user }) => {
            if (siblingData.useSocialMediaButtons) {
              return false
            } else {
              return true
            }
          },
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
            condition: ( data, siblingData, { user }) => {
              if (siblingData.useSocialMediaButtons) {
                return false
              } else {
                return true
              }
            },
          },
        },
        {
          name: 'buttonSecondaryLink',
          type: 'text',
          localized: true,
          validate: validateTextFieldUrl,
          admin: {
            width: '75%',
            condition: ( data, siblingData, { user }) => {
              if (siblingData.useSocialMediaButtons) {
                return false
              } else {
                return true
              }
            },
          }
        },
      ],
    }
    buttonFields.push(secondaryButton)
  }

  return buttonFields
}
