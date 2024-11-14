import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_featured_news_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_margin_settings" boolean DEFAULT false,
  	"standard_top_margin" boolean DEFAULT false,
  	"standard_bottom_margin" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_featured_news_carousel_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_featured_news_carousel_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_people_id_idx";
  DROP INDEX IF EXISTS "pages_rels_wallets_id_idx";
  DROP INDEX IF EXISTS "pages_rels_grants_id_idx";
  DROP INDEX IF EXISTS "pages_rels_social_links_id_idx";
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "pages_rels" ADD COLUMN "news_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_featured_news_carousel" ADD CONSTRAINT "pages_blocks_featured_news_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_featured_news_carousel_locales" ADD CONSTRAINT "pages_blocks_featured_news_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_news_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_news_carousel_order_idx" ON "pages_blocks_featured_news_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_news_carousel_parent_id_idx" ON "pages_blocks_featured_news_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_news_carousel_path_idx" ON "pages_blocks_featured_news_carousel" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "grants_updated_at_idx" ON "grants" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "grant_types_updated_at_idx" ON "grant_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_rels_news_id_idx" ON "pages_rels" USING btree ("news_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "news_types_updated_at_idx" ON "news_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "news_sub_types_updated_at_idx" ON "news_sub_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "developer_guides_updated_at_idx" ON "developer_guides" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "developer_guide_tags_updated_at_idx" ON "developer_guide_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "social_links_updated_at_idx" ON "social_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "wallets_updated_at_idx" ON "wallets" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_wallets_id_idx" ON "pages_rels" USING btree ("wallets_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_grants_id_idx" ON "pages_rels" USING btree ("grants_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_social_links_id_idx" ON "pages_rels" USING btree ("social_links_id","locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_featured_news_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_news_carousel_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_featured_news_carousel" CASCADE;
  DROP TABLE "pages_blocks_featured_news_carousel_locales" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_news_fk";
  
  DROP INDEX IF EXISTS "events_updated_at_idx";
  DROP INDEX IF EXISTS "grants_updated_at_idx";
  DROP INDEX IF EXISTS "grant_types_updated_at_idx";
  DROP INDEX IF EXISTS "pages_updated_at_idx";
  DROP INDEX IF EXISTS "pages_rels_news_id_idx";
  DROP INDEX IF EXISTS "pages_rels_locale_idx";
  DROP INDEX IF EXISTS "users_updated_at_idx";
  DROP INDEX IF EXISTS "media_updated_at_idx";
  DROP INDEX IF EXISTS "news_updated_at_idx";
  DROP INDEX IF EXISTS "news_types_updated_at_idx";
  DROP INDEX IF EXISTS "news_sub_types_updated_at_idx";
  DROP INDEX IF EXISTS "people_updated_at_idx";
  DROP INDEX IF EXISTS "developer_guides_updated_at_idx";
  DROP INDEX IF EXISTS "developer_guide_tags_updated_at_idx";
  DROP INDEX IF EXISTS "products_updated_at_idx";
  DROP INDEX IF EXISTS "social_links_updated_at_idx";
  DROP INDEX IF EXISTS "wallets_updated_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_updated_at_idx";
  DROP INDEX IF EXISTS "payload_preferences_updated_at_idx";
  DROP INDEX IF EXISTS "payload_migrations_updated_at_idx";
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_people_id_idx";
  DROP INDEX IF EXISTS "pages_rels_wallets_id_idx";
  DROP INDEX IF EXISTS "pages_rels_grants_id_idx";
  DROP INDEX IF EXISTS "pages_rels_social_links_id_idx";
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_wallets_id_idx" ON "pages_rels" USING btree ("wallets_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_grants_id_idx" ON "pages_rels" USING btree ("grants_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_social_links_id_idx" ON "pages_rels" USING btree ("social_links_id");
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "news_id";`)
}
