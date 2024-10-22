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
        },
      },
      {
        name: 'buttonLink',
        type: 'text',
        validate: validateTextFieldUrl,
        admin: {
          width: '75%',
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
          },
        },
        {
          name: 'buttonSecondaryLink',
          type: 'text',
          validate: validateTextFieldUrl,
          admin: {
            width: '75%',
          }
        },
      ],
    }
    buttonFields.push(secondaryButton)
  }

  return buttonFields
}
