import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_banner_toggle_page_banner" boolean DEFAULT false;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "page_banner_banner_text" jsonb;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_banner_toggle_page_banner";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_banner_banner_text";`)
}
