import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_page_teaser_grid" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_page_teaser_grid_locales" (
  	"title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_page_teaser_grid_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages" ADD COLUMN "page_teaser_icon_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "page_teaser_short_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "page_teaser_title_override" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "pages_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_teaser_grid" ADD CONSTRAINT "pages_blocks_page_teaser_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_page_teaser_grid_locales" ADD CONSTRAINT "pages_blocks_page_teaser_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_teaser_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_teaser_grid_order_idx" ON "pages_blocks_page_teaser_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_teaser_grid_parent_id_idx" ON "pages_blocks_page_teaser_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_page_teaser_grid_path_idx" ON "pages_blocks_page_teaser_grid" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_page_teaser_icon_id_media_id_fk" FOREIGN KEY ("page_teaser_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_page_teaser_page_teaser_icon_idx" ON "pages" USING btree ("page_teaser_icon_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_page_teaser_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_teaser_grid_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_page_teaser_grid" CASCADE;
  DROP TABLE "pages_blocks_page_teaser_grid_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_page_teaser_icon_id_media_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_pages_fk";
  
  DROP INDEX IF EXISTS "pages_page_teaser_page_teaser_icon_idx";
  DROP INDEX IF EXISTS "pages_rels_pages_id_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_teaser_icon_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_teaser_short_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_teaser_title_override";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "pages_id";`)
}
