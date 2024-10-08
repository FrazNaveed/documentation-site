// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Pages } from 'src/app/(payload)/_collections/Pages'
import { Events } from './src/app/(payload)/_collections/Events'
import { Users } from './src/app/(payload)/_collections/Users'
import { Media } from './src/app/(payload)/_collections/Media'
import { News } from './src/app/(payload)/_collections/News'
import { NewsSubTypes } from './src/app/(payload)/_collections/NewsSubTypes'
import { NewsTypes } from './src/app/(payload)/_collections/NewsTypes'
import { Wallets } from './src/app/(payload)/_collections/Wallets'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Events, Pages, Users, Media, News, NewsTypes, NewsSubTypes, Wallets],
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
