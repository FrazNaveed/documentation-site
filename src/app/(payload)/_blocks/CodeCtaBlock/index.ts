import { Block } from 'payload'
import { ButtonFields } from '../../_fields/ButtonFields'
import { CreateSideNavLinkFields } from '../../_fields/CreateSideNavLink'
import { i18n } from '@/src/app/i18n-config'
import validateTextFieldUrl from '../../_utils/validateTextFieldUrl'
import { BlockMarginSettings } from '../../_fields/BlockMarginSettings'

export const CodeCtaBlock: Block = {
  slug: 'codeCta',
  interfaceName: 'ICodeCta',
  labels: {
    singular: 'Code CTA',
    plural: 'Code CTAs',
  },
  fields: [
    {
      name: 'header',
      type: 'text',
      localized: true,
    },
    {
      name: 'text',
      type: 'richText',
      localized: true,
    },
    ...ButtonFields(true),
    {
      name: 'hideCode',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide the code examples with the option of using an image instead.',
      },
    },
    {
      name: 'solidityLabelOverride',
      type: 'text',
      localized: true,
      admin: {
        description: 'Code label will be "Solidity" by default. Override it here.',
      },
    },
    {
      name: 'codeSolidity',
      label: 'Solidity Code',
      type: 'code',
      admin: {
        language: 'solidity',
        condition: (data, siblingData, { user }) => {
          return !siblingData.hideCode
        },
      },
    },
    {
      name: 'javaScriptLabelOverride',
      label: 'JavaScript Label Override',
      type: 'text',
      localized: true,
      admin: {
        description: 'Code label will be "JavaScript" by default. Override it here.',
      },
    },
    {
      name: 'codeJs',
      label: 'JavaScript Code',
      type: 'code',
      admin: {
        language: 'javascript',
        condition: (data, siblingData, { user }) => {
          return !siblingData.hideCode
        },
      },
    },
    {
      name: 'pythonLabelOverride',
      type: 'text',
      localized: true,
      admin: {
        description: 'Code label will be "Python" by default. Override it here.',
      },
    },
    {
      name: 'codePython',
      label: 'Python Code',
      type: 'code',
      admin: {
        language: 'python',
        condition: (data, siblingData, { user }) => {
          return !siblingData.hideCode
        },
      },
    },
    {
      name: 'rustLabelOverride',
      type: 'text',
      localized: true,
      admin: {
        description: 'Code label will be "Rust" by default. Override it here.',
      },
    },
    {
      name: 'codeRust',
      label: 'Rust Code',
      type: 'code',
      admin: {
        language: 'rust',
        condition: (data, siblingData, { user }) => {
          return !siblingData.hideCode
        },
      },
    },
    {
      name: 'goLabelOverride',
      type: 'text',
      localized: true,
      admin: {
        description: 'Code label will be "Go" by default. Override it here.',
      },
    },
    {
      name: 'codeGo',
      label: 'Go Code',
      type: 'code',
      admin: {
        language: 'go',
        condition: (data, siblingData, { user }) => {
          return !siblingData.hideCode
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Used in place of code examples.',
        condition: (data, siblingData, { user }) => {
          return siblingData.hideCode
        },
      },
    },
    ...CreateSideNavLinkFields,
    ...BlockMarginSettings,
  ],
  imageURL: `/${i18n.defaultLocale}/icons/code.svg`,
  imageAltText: 'Code CTA block icon',
}
