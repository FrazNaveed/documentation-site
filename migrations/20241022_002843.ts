import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_button_secondary_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "hero_button_secondary_text" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_button_secondary_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_button_secondary_text";`)
}
