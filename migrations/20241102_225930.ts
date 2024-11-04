import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points_points_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_regional_link_grid_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"name" varchar,
  	"translated_name" varchar,
  	"country" "enum_pages_blocks_regional_link_grid_links_country"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_regional_link_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_regional_link_grid_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_regional_link_grid_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_talking_points_points" ADD COLUMN IF NOT EXISTS "add_logos" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_official_channels_locales" ADD COLUMN IF NOT EXISTS "text" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_points_logos" ADD CONSTRAINT "pages_blocks_talking_points_points_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_points_logos" ADD CONSTRAINT "pages_blocks_talking_points_points_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talking_points_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_regional_link_grid_links" ADD CONSTRAINT "pages_blocks_regional_link_grid_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_regional_link_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_regional_link_grid" ADD CONSTRAINT "pages_blocks_regional_link_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_regional_link_grid_locales" ADD CONSTRAINT "pages_blocks_regional_link_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_regional_link_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_order_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_parent_id_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_locale_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_logo_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_links_order_idx" ON "pages_blocks_regional_link_grid_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_links_parent_id_idx" ON "pages_blocks_regional_link_grid_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_links_locale_idx" ON "pages_blocks_regional_link_grid_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_order_idx" ON "pages_blocks_regional_link_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_parent_id_idx" ON "pages_blocks_regional_link_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_path_idx" ON "pages_blocks_regional_link_grid" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_talking_points_points_logos";
  DROP TABLE "pages_blocks_regional_link_grid_links";
  DROP TABLE "pages_blocks_regional_link_grid";
  DROP TABLE "pages_blocks_regional_link_grid_locales";
  ALTER TABLE "pages_blocks_talking_points_points" DROP COLUMN IF EXISTS "add_logos";
  ALTER TABLE "pages_blocks_official_channels_locales" DROP COLUMN IF EXISTS "text";`)
}
