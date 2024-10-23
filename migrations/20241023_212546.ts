import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_button_secondary_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "page_footer_c_t_a_button_button_secondary_text" varchar;
  ALTER TABLE "news_locales" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "news" DROP COLUMN IF EXISTS "featured";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_secondary_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_secondary_text";
  ALTER TABLE "news_locales" DROP COLUMN IF EXISTS "featured";`)
}
