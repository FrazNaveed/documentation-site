import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_locales" ADD COLUMN "hero_text_link_text" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_text_link_button" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_text_link_text";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_text_link_button";`)
}
