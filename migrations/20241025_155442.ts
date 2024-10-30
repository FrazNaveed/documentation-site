import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_image_idx" ON "pages_blocks_col_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_image_idx" ON "pages_blocks_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_icon_idx" ON "pages_blocks_talking_points_points" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_background_image_idx" ON "pages" USING btree ("hero_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_page_footer_c_t_a_button_page_footer_c_t_a_button_background_image_idx" ON "pages" USING btree ("page_footer_c_t_a_button_background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_related_news_type_idx" ON "pages_locales" USING btree ("related_news_type_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_previous_page_idx" ON "pages_locales" USING btree ("previous_page_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_next_page_idx" ON "pages_locales" USING btree ("next_page_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_wallets_id_idx" ON "pages_rels" USING btree ("wallets_id");
  CREATE INDEX IF NOT EXISTS "news_logos_image_idx" ON "news_logos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "news_author_idx" ON "news" USING btree ("author_id");
  CREATE INDEX IF NOT EXISTS "news_teaser_thumbnail_idx" ON "news" USING btree ("teaser_thumbnail_id");
  CREATE INDEX IF NOT EXISTS "news_type_idx" ON "news_locales" USING btree ("type_id","_locale");
  CREATE INDEX IF NOT EXISTS "news_subtype_idx" ON "news_locales" USING btree ("subtype_id","_locale");
  CREATE INDEX IF NOT EXISTS "news_rels_news_id_idx" ON "news_rels" USING btree ("news_id","locale");
  CREATE INDEX IF NOT EXISTS "news_types_image_idx" ON "news_types" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "news_sub_types_image_idx" ON "news_sub_types" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "people_headshot_idx" ON "people" USING btree ("headshot_id");
  CREATE INDEX IF NOT EXISTS "developer_guides_product_idx" ON "developer_guides_locales" USING btree ("product_id","_locale");
  CREATE INDEX IF NOT EXISTS "developer_guides_rels_developer_guide_tags_id_idx" ON "developer_guides_rels" USING btree ("developer_guide_tags_id","locale");
  CREATE INDEX IF NOT EXISTS "products_icon_idx" ON "products" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "wallets_logo_idx" ON "wallets" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_types_id_idx" ON "payload_locked_documents_rels" USING btree ("news_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_sub_types_id_idx" ON "payload_locked_documents_rels" USING btree ("news_sub_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_developer_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("developer_guides_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_developer_guide_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("developer_guide_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_wallets_id_idx" ON "payload_locked_documents_rels" USING btree ("wallets_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_style";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_style" AS ENUM('standard');
  DROP INDEX IF EXISTS "pages_blocks_col_image_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_image_image_idx";
  DROP INDEX IF EXISTS "pages_blocks_talking_points_points_icon_idx";
  DROP INDEX IF EXISTS "pages_hero_hero_background_image_idx";
  DROP INDEX IF EXISTS "pages_page_footer_c_t_a_button_page_footer_c_t_a_button_background_image_idx";
  DROP INDEX IF EXISTS "pages_related_news_type_idx";
  DROP INDEX IF EXISTS "pages_previous_page_idx";
  DROP INDEX IF EXISTS "pages_next_page_idx";
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_people_id_idx";
  DROP INDEX IF EXISTS "pages_rels_wallets_id_idx";
  DROP INDEX IF EXISTS "news_logos_image_idx";
  DROP INDEX IF EXISTS "news_author_idx";
  DROP INDEX IF EXISTS "news_teaser_thumbnail_idx";
  DROP INDEX IF EXISTS "news_type_idx";
  DROP INDEX IF EXISTS "news_subtype_idx";
  DROP INDEX IF EXISTS "news_rels_news_id_idx";
  DROP INDEX IF EXISTS "news_types_image_idx";
  DROP INDEX IF EXISTS "news_sub_types_image_idx";
  DROP INDEX IF EXISTS "people_headshot_idx";
  DROP INDEX IF EXISTS "developer_guides_product_idx";
  DROP INDEX IF EXISTS "developer_guides_rels_developer_guide_tags_id_idx";
  DROP INDEX IF EXISTS "products_icon_idx";
  DROP INDEX IF EXISTS "wallets_logo_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_events_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_users_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_media_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_news_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_news_types_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_news_sub_types_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_people_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_developer_guides_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_developer_guide_tags_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_products_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_wallets_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_users_id_idx";
  ALTER TABLE "events" ADD COLUMN "button_buttonType" "enum_events_button_button_type";
  ALTER TABLE "pages" ADD COLUMN "hero_style" "enum_pages_hero_style" DEFAULT 'standard';
  ALTER TABLE "pages_locales" ADD COLUMN "pageFooterCTAButton_backgroundImageStyle" "enum_pages_page_footer_c_t_a_button_background_image_style" DEFAULT 'flipped';
  ALTER TABLE "pages_locales" ADD COLUMN "pageTemplate" "enum_pages_page_template" DEFAULT 'default' NOT NULL;
  ALTER TABLE "news_locales" ADD COLUMN "contentType" "enum_news_content_type";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "button_button_type";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_background_image_style";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_template";
  ALTER TABLE "news_locales" DROP COLUMN IF EXISTS "content_type";`)
}
