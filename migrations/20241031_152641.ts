import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_dev_hub_link_band_links" ADD COLUMN "_locale" "_locales" DEFAULT 'en';
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "caption" jsonb;
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_background_image_style" "enum_pages_page_footer_c_t_a_button_background_image_style" DEFAULT 'flipped';
  ALTER TABLE "pages_locales" ADD COLUMN "dev_hub_link_band_link_band_title" varchar;
  CREATE INDEX IF NOT EXISTS "pages_dev_hub_link_band_links_locale_idx" ON "pages_dev_hub_link_band_links" USING btree ("_locale");
  ALTER TABLE "pages_blocks_stats_locales" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "dev_hub_link_band_link_band_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_background_image_style";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "pages_dev_hub_link_band_links_locale_idx";
  ALTER TABLE "pages_blocks_stats_locales" ADD COLUMN "caption" jsonb;
  ALTER TABLE "pages" ADD COLUMN "dev_hub_link_band_link_band_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "page_footer_c_t_a_button_background_image_style" "enum_pages_page_footer_c_t_a_button_background_image_style" DEFAULT 'flipped';
  ALTER TABLE "pages_dev_hub_link_band_links" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "caption";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_background_image_style";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "dev_hub_link_band_link_band_title";`)
}
