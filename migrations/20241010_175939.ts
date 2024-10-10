import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_columns_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_image_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_block_locales" (
  	"rich_text" jsonb,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_rich_text_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_talking_points_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_stats_locales" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns_locales" ADD CONSTRAINT "pages_blocks_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_locales" ADD CONSTRAINT "pages_blocks_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text_block_locales" ADD CONSTRAINT "pages_blocks_rich_text_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_locales" ADD CONSTRAINT "pages_blocks_talking_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talking_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN IF EXISTS "create_side_nav_link";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "link_text";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_columns_locales";
  DROP TABLE "pages_blocks_image_locales";
  DROP TABLE "pages_blocks_rich_text_block";
  DROP TABLE "pages_blocks_rich_text_block_locales";
  DROP TABLE "pages_blocks_talking_points_locales";
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "create_side_nav_link" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_columns" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_image" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_stats_locales" DROP COLUMN IF NOT EXISTS IF EXISTS "link_text";`)
}
