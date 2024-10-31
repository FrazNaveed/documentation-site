import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_talking_points_variation" AS ENUM('standard', 'wideList');
  CREATE TYPE "public"."enum_pages_blocks_two_column_layout" AS ENUM('default', 'reverse', 'even');
  CREATE TYPE "public"."enum_pages_blocks_two_column_column_one_content_type" AS ENUM('image', 'text');
  CREATE TYPE "public"."enum_pages_blocks_two_column_column_one_image_alignment" AS ENUM('center', 'left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_two_column_column_one_image_fill" AS ENUM('contain', 'cover');
  CREATE TYPE "public"."enum_pages_blocks_two_column_column_two_content_type" AS ENUM('image', 'text');
  CREATE TYPE "public"."enum_pages_blocks_two_column_column_two_image_alignment" AS ENUM('center', 'left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_two_column_column_two_image_fill" AS ENUM('contain', 'cover');
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_two_column_layout" DEFAULT 'default',
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column_locales" (
  	"column_one_content_type" "enum_pages_blocks_two_column_column_one_content_type" DEFAULT 'image',
  	"column_one_image_id" integer,
  	"column_one_text" jsonb,
  	"column_one_image_alignment" "enum_pages_blocks_two_column_column_one_image_alignment" DEFAULT 'center',
  	"column_one_image_fill" "enum_pages_blocks_two_column_column_one_image_fill" DEFAULT 'contain',
  	"column_two_content_type" "enum_pages_blocks_two_column_column_two_content_type" DEFAULT 'image',
  	"column_two_image_id" integer,
  	"column_two_text" jsonb,
  	"column_two_image_alignment" "enum_pages_blocks_two_column_column_two_image_alignment" DEFAULT 'center',
  	"column_two_image_fill" "enum_pages_blocks_two_column_column_two_image_fill" DEFAULT 'contain',
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_two_column_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_past_f_grants_grid" RENAME TO "pastGrantsGrid";
  ALTER TABLE "pages_blocks_past_f_grants_grid_locales" RENAME TO "pastGrantsGrid_locales";
  ALTER TABLE "pastGrantsGrid_locales" DROP CONSTRAINT "pages_blocks_past_f_grants_grid_locales_locale_parent_id_unique";
  ALTER TABLE "pastGrantsGrid" DROP CONSTRAINT "pages_blocks_past_f_grants_grid_parent_id_fk";
  
  ALTER TABLE "pastGrantsGrid_locales" DROP CONSTRAINT "pages_blocks_past_f_grants_grid_locales_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_past_f_grants_grid_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_past_f_grants_grid_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_past_f_grants_grid_path_idx";
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN "variation" "enum_pages_blocks_talking_points_variation" DEFAULT 'standard';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column" ADD CONSTRAINT "pages_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_locales" ADD CONSTRAINT "pages_blocks_two_column_locales_column_one_image_id_media_id_fk" FOREIGN KEY ("column_one_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_locales" ADD CONSTRAINT "pages_blocks_two_column_locales_column_two_image_id_media_id_fk" FOREIGN KEY ("column_two_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_locales" ADD CONSTRAINT "pages_blocks_two_column_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_column"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_order_idx" ON "pages_blocks_two_column" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_parent_id_idx" ON "pages_blocks_two_column" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_path_idx" ON "pages_blocks_two_column" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_column_one_column_one_image_idx" ON "pages_blocks_two_column_locales" USING btree ("column_one_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_column_two_column_two_image_idx" ON "pages_blocks_two_column_locales" USING btree ("column_two_image_id");
  DO $$ BEGIN
   ALTER TABLE "pastGrantsGrid" ADD CONSTRAINT "pastGrantsGrid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pastGrantsGrid_locales" ADD CONSTRAINT "pastGrantsGrid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pastGrantsGrid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pastGrantsGrid_order_idx" ON "pastGrantsGrid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pastGrantsGrid_parent_id_idx" ON "pastGrantsGrid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pastGrantsGrid_path_idx" ON "pastGrantsGrid" USING btree ("_path");
  ALTER TABLE "pastGrantsGrid_locales" ADD CONSTRAINT "pastGrantsGrid_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_past_f_grants_grid_locales" (
  	"grid_title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_past_f_grants_grid_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP TABLE "pastGrantsGrid_locales";
  DROP TABLE "pages_blocks_two_column";
  DROP TABLE "pages_blocks_two_column_locales";
  ALTER TABLE "pastGrantsGrid" RENAME TO "pages_blocks_past_f_grants_grid";
  ALTER TABLE "pages_blocks_past_f_grants_grid" DROP CONSTRAINT "pastGrantsGrid_parent_id_fk";
  
  DROP INDEX IF EXISTS "pastGrantsGrid_order_idx";
  DROP INDEX IF EXISTS "pastGrantsGrid_parent_id_idx";
  DROP INDEX IF EXISTS "pastGrantsGrid_path_idx";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_past_f_grants_grid_locales" ADD CONSTRAINT "pages_blocks_past_f_grants_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_past_f_grants_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_past_f_grants_grid" ADD CONSTRAINT "pages_blocks_past_f_grants_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_past_f_grants_grid_order_idx" ON "pages_blocks_past_f_grants_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_past_f_grants_grid_parent_id_idx" ON "pages_blocks_past_f_grants_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_past_f_grants_grid_path_idx" ON "pages_blocks_past_f_grants_grid" USING btree ("_path");
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "variation";
  DROP TYPE "public"."enum_pages_blocks_talking_points_variation";
  DROP TYPE "public"."enum_pages_blocks_two_column_layout";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_one_content_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_one_image_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_one_image_fill";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_two_content_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_two_image_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_two_image_fill";`)
}
