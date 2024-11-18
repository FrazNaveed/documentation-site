import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "newsCarousel" (
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
  
  CREATE TABLE IF NOT EXISTS "newsCarousel_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "newsCarousel_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_people_id_idx";
  DROP INDEX IF EXISTS "pages_rels_wallets_id_idx";
  DROP INDEX IF EXISTS "pages_rels_grants_id_idx";
  DROP INDEX IF EXISTS "pages_rels_social_links_id_idx";
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_use_social_media_buttons" boolean DEFAULT false;
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "pages_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "social_links_locales" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "social_links_locales" ADD COLUMN "url" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "newsCarousel" ADD CONSTRAINT "newsCarousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "newsCarousel_locales" ADD CONSTRAINT "newsCarousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."newsCarousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "newsCarousel_order_idx" ON "newsCarousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "newsCarousel_parent_id_idx" ON "newsCarousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "newsCarousel_path_idx" ON "newsCarousel" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_news_id_idx" ON "pages_rels" USING btree ("news_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_wallets_id_idx" ON "pages_rels" USING btree ("wallets_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_grants_id_idx" ON "pages_rels" USING btree ("grants_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_social_links_id_idx" ON "pages_rels" USING btree ("social_links_id","locale");
  ALTER TABLE "social_links" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "social_links" DROP COLUMN IF EXISTS "url";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "newsCarousel";
  DROP TABLE "newsCarousel_locales";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_news_fk";
  
  DROP INDEX IF EXISTS "pages_rels_news_id_idx";
  DROP INDEX IF EXISTS "pages_rels_locale_idx";
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_people_id_idx";
  DROP INDEX IF EXISTS "pages_rels_wallets_id_idx";
  DROP INDEX IF EXISTS "pages_rels_grants_id_idx";
  DROP INDEX IF EXISTS "pages_rels_social_links_id_idx";
  ALTER TABLE "social_links" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "social_links" ADD COLUMN "url" varchar NOT NULL;
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_wallets_id_idx" ON "pages_rels" USING btree ("wallets_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_grants_id_idx" ON "pages_rels" USING btree ("grants_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_social_links_id_idx" ON "pages_rels" USING btree ("social_links_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_use_social_media_buttons";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "news_id";
  ALTER TABLE "social_links_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "social_links_locales" DROP COLUMN IF EXISTS "url";`)
}
