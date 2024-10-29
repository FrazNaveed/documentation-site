import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
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
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_column_two_column_two_image_idx" ON "pages_blocks_two_column_locales" USING btree ("column_two_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_two_column";
  DROP TABLE "pages_blocks_two_column_locales";
  DROP TYPE "public"."enum_pages_blocks_two_column_layout";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_one_content_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_one_image_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_one_image_fill";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_two_content_type";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_two_image_alignment";
  DROP TYPE "public"."enum_pages_blocks_two_column_column_two_image_fill";`)
}
