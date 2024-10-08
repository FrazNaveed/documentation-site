import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_columns_layout" AS ENUM('equal', 'wideLeft', 'wideRight');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_col_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"stat" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"link_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_locales" (
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_stats_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP TABLE "pages_blocks_left_column_image";
  DROP TABLE "pages_blocks_left_column_text" CASCADE;
  DROP TABLE "pages_blocks_left_column_text_locales" CASCADE;
  DROP TABLE "pages_blocks_right_column_image";
  DROP TABLE "pages_blocks_right_column_text" CASCADE;
  DROP TABLE "pages_blocks_right_column_text_locales" CASCADE;
  ALTER TABLE "pages_blocks_columns" ADD COLUMN "layout" "enum_pages_blocks_columns_layout" DEFAULT 'equal';
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "link_text" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_col_image" ADD CONSTRAINT "pages_blocks_col_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_col_image" ADD CONSTRAINT "pages_blocks_col_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_order_idx" ON "pages_blocks_col_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_parent_id_idx" ON "pages_blocks_col_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_path_idx" ON "pages_blocks_col_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_locale_idx" ON "pages_blocks_stats_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_left_column_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_left_column_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_left_column_text_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_left_column_text_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_right_column_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_right_column_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_right_column_text_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_right_column_text_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DROP TABLE "pages_blocks_col_image";
  DROP TABLE "pages_blocks_stats_stats";
  DROP TABLE "pages_blocks_stats";
  DROP TABLE "pages_blocks_stats_locales";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_left_column_image" ADD CONSTRAINT "pages_blocks_left_column_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_left_column_image" ADD CONSTRAINT "pages_blocks_left_column_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_left_column_text" ADD CONSTRAINT "pages_blocks_left_column_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_left_column_text_locales" ADD CONSTRAINT "pages_blocks_left_column_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_left_column_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_right_column_image" ADD CONSTRAINT "pages_blocks_right_column_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_right_column_image" ADD CONSTRAINT "pages_blocks_right_column_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_right_column_text" ADD CONSTRAINT "pages_blocks_right_column_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_right_column_text_locales" ADD CONSTRAINT "pages_blocks_right_column_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_right_column_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_left_column_image_order_idx" ON "pages_blocks_left_column_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_left_column_image_parent_id_idx" ON "pages_blocks_left_column_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_left_column_image_path_idx" ON "pages_blocks_left_column_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_left_column_text_order_idx" ON "pages_blocks_left_column_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_left_column_text_parent_id_idx" ON "pages_blocks_left_column_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_left_column_text_path_idx" ON "pages_blocks_left_column_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_right_column_image_order_idx" ON "pages_blocks_right_column_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_right_column_image_parent_id_idx" ON "pages_blocks_right_column_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_right_column_image_path_idx" ON "pages_blocks_right_column_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_right_column_text_order_idx" ON "pages_blocks_right_column_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_right_column_text_parent_id_idx" ON "pages_blocks_right_column_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_right_column_text_path_idx" ON "pages_blocks_right_column_text" USING btree ("_path");
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "layout";
  ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "link_text";`)
}
