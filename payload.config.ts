// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Pages } from 'src/app/(payload)/_collections/Pages'
import { EventSettings } from 'src/app/(payload)/_globals/EventSettings'
import { SocialChannels } from 'src/app/(payload)/_globals/SocialChannels'
import { DeveloperGuides } from './src/app/(payload)/_collections/DeveloperGuides'
import { DeveloperGuideTags } from './src/app/(payload)/_collections/DeveloperGuideTags'
import { Products } from './src/app/(payload)/_collections/Products'
import { Events } from './src/app/(payload)/_collections/Events'
import { Users } from './src/app/(payload)/_collections/Users'
import { Media } from './src/app/(payload)/_collections/Media'
import { News } from './src/app/(payload)/_collections/News'
import { NewsSubTypes } from './src/app/(payload)/_collections/NewsSubTypes'
import { NewsTypes } from './src/app/(payload)/_collections/NewsTypes'
import { Wallets } from './src/app/(payload)/_collections/Wallets'
import { People } from './src/app/(payload)/_collections/People'
import { Grants } from './src/app/(payload)/_collections/Grants'
import { GrantTypes } from './src/app/(payload)/_collections/GrantTypes'
import { SocialLinks } from './src/app/(payload)/_collections/SocialLinks'
import { SelectPageFooterCtaSocialChannels } from './src/app/(payload)/_globals/PageFooterCtaSocialChannels'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Events,
    Grants,
    GrantTypes,
    Pages,
    Users,
    Media,
    News,
    NewsTypes,
    NewsSubTypes,
    People,
    DeveloperGuides,
    DeveloperGuideTags,
    Products,
    SocialLinks,
    Wallets,
  ],
  globals: [
    EventSettings,
    SelectPageFooterCtaSocialChannels,
    SocialChannels,
  ],
  editor: lexicalEditor(),
  localization: {
    locales: [
      {
        label: {
          en: 'English',
          es: 'Inglés',
          de: 'Englisch',
        },
        code: 'en',
      },
      {
        label: {
          en: 'Spanish',
          es: 'Español',
          de: 'Spanisch',
        },
        code: 'es',
      },
      {
        label: {
          en: 'German',
          es: 'Alemán',
          de: 'Deutsch',
        },
        code: 'de',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    migrationDir: './migrations',
  }),

  email: nodemailerAdapter({
    defaultFromAddress: 'donotreply@flare.network',
    defaultFromName: 'Flare',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.VERCEL,
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
