import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_talking_points" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_banner_toggle_page_banner" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_footer_c_t_a" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_footer_c_t_a_button_button_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "page_banner_banner_text" jsonb;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "page_footer_c_t_a_button_button_text" varchar;
  ALTER TABLE "news_locales" ADD COLUMN IF NOT EXISTS "content" jsonb;
  ALTER TABLE "news" DROP COLUMN IF EXISTS "content";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news" ADD COLUMN IF NOT EXISTS "content" jsonb;
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_banner_toggle_page_banner";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_banner_banner_text";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_text";
  ALTER TABLE "news_locales" DROP COLUMN IF EXISTS "content";`)
}
