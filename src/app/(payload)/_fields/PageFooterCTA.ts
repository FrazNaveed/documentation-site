import type { Field } from 'payload'
import { ButtonFields } from './ButtonFields'

export const PageFooterCTA: Field[] = [
  {
    name: 'pageFooterCTA',
    type: 'checkbox',
    label: 'Page Footer CTA',
    defaultValue: false,
  },
  {
    name: 'pageFooterCTAButton',
    type: 'group',
    label: 'Page Footer CTA Button',
    fields: [
      ...ButtonFields,
    ],
    admin: {
      condition: (data, siblingData, { user }) => {
        return siblingData.pageFooterCTA
      },
    },
  },
]
