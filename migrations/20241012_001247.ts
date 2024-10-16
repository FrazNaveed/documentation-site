import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_page_footer_c_t_a_button_background_image_style" AS ENUM('flipped', 'offset');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'wallets');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TYPE "enum_wallets_platforms" ADD VALUE 'iOS';
  ALTER TYPE "enum_wallets_platforms" ADD VALUE 'Android';
  ALTER TYPE "enum_wallets_platforms" ADD VALUE 'Hardware';
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"wallets_id" integer
  );
  
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "stat" DROP NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column1_data" DROP NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column2_data" DROP NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_sections" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column1_header" DROP NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column2_header" DROP NOT NULL;
  ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "header" DROP NOT NULL;
  ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_footer_c_t_a_button_background_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "wallets_grid_wallets_grid_intro" jsonb;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "pageFooterCTAButton_backgroundImageStyle" "enum_pages_page_footer_c_t_a_button_background_image_style" DEFAULT 'flipped';
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "pageTemplate" "enum_pages_page_template" DEFAULT 'default' NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_wallets_fk" FOREIGN KEY ("wallets_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_page_footer_c_t_a_button_background_image_id_media_id_fk" FOREIGN KEY ("page_footer_c_t_a_button_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_wallets_platforms" ADD VALUE 'ios';
  ALTER TYPE "enum_wallets_platforms" ADD VALUE 'android';
  ALTER TYPE "enum_wallets_platforms" ADD VALUE 'hardware';
  DROP TABLE "pages_rels";
  ALTER TABLE "pages" DROP CONSTRAINT "pages_page_footer_c_t_a_button_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "stat" SET NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column1_data" SET NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column2_data" SET NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_sections" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column1_header" SET NOT NULL;
  ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column2_header" SET NOT NULL;
  ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "header" SET NOT NULL;
  ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_background_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "wallets_grid_wallets_grid_intro";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "pageFooterCTAButton_backgroundImageStyle";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "pageTemplate";`)
}
