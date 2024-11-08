import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_video_embed_block" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_video_embed_block_locales" (
  	"title" varchar,
  	"url" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_video_embed_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_columns" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_columns" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_columns" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_text_grid" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_text_grid" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_text_grid" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text_block" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text_block" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text_block" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pastGrantsGrid" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pastGrantsGrid" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pastGrantsGrid" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_table_drawers" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_table_drawers" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_table_drawers" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "appProcess" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "appProcess" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "appProcess" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_official_channels" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_official_channels" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_official_channels" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_regional_link_grid" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_regional_link_grid" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_regional_link_grid" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_flare_drop_dates" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_flare_drop_dates" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_flare_drop_dates" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column_cta" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column_cta" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_two_column_cta" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_video_embed_block" ADD CONSTRAINT "pages_blocks_video_embed_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_video_embed_block_locales" ADD CONSTRAINT "pages_blocks_video_embed_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_video_embed_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_embed_block_order_idx" ON "pages_blocks_video_embed_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_embed_block_parent_id_idx" ON "pages_blocks_video_embed_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_video_embed_block_path_idx" ON "pages_blocks_video_embed_block" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_video_embed_block";
  DROP TABLE "pages_blocks_video_embed_block_locales";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_image_text_grid" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_image_text_grid" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_image_text_grid" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_rich_text_block" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_rich_text_block" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_rich_text_block" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pastGrantsGrid" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pastGrantsGrid" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pastGrantsGrid" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_table_drawers" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_table_drawers" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_table_drawers" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_two_column" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_two_column" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_two_column" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "appProcess" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "appProcess" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "appProcess" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_official_channels" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_official_channels" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_official_channels" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_regional_link_grid" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_regional_link_grid" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_regional_link_grid" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_flare_drop_dates" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_flare_drop_dates" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_flare_drop_dates" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_two_column_cta" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_two_column_cta" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_two_column_cta" DROP COLUMN IF EXISTS "standard_bottom_margin";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "standard_bottom_margin";`)
}
