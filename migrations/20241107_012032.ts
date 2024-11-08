import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_code_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hide_code" boolean DEFAULT false,
  	"image_id" integer,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_code_cta_locales" (
  	"header" varchar,
  	"text" jsonb,
  	"button_text" varchar,
  	"button_link" varchar,
  	"button_secondary_text" varchar,
  	"button_secondary_link" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_code_cta_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_two_column_cta_locales" ADD COLUMN "primary_button_link" varchar;
  ALTER TABLE "pages_blocks_two_column_cta_locales" ADD COLUMN "secondary_button_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_button_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_button_secondary_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "page_footer_c_t_a_button_button_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "page_footer_c_t_a_button_button_secondary_link" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code_cta" ADD CONSTRAINT "pages_blocks_code_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code_cta" ADD CONSTRAINT "pages_blocks_code_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code_cta_locales" ADD CONSTRAINT "pages_blocks_code_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_code_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_cta_order_idx" ON "pages_blocks_code_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_cta_parent_id_idx" ON "pages_blocks_code_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_cta_path_idx" ON "pages_blocks_code_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_cta_image_idx" ON "pages_blocks_code_cta" USING btree ("image_id");
  ALTER TABLE "pages_blocks_two_column_cta" DROP COLUMN IF EXISTS "primary_button_link";
  ALTER TABLE "pages_blocks_two_column_cta" DROP COLUMN IF EXISTS "secondary_button_link";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_button_link";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_button_secondary_link";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_link";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_secondary_link";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_code_cta";
  DROP TABLE "pages_blocks_code_cta_locales";
  ALTER TABLE "pages_blocks_two_column_cta" ADD COLUMN "primary_button_link" varchar;
  ALTER TABLE "pages_blocks_two_column_cta" ADD COLUMN "secondary_button_link" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_button_link" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_button_secondary_link" varchar;
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_button_link" varchar;
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_button_secondary_link" varchar;
  ALTER TABLE "pages_blocks_two_column_cta_locales" DROP COLUMN IF EXISTS "primary_button_link";
  ALTER TABLE "pages_blocks_two_column_cta_locales" DROP COLUMN IF EXISTS "secondary_button_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_button_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_button_secondary_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_secondary_link";`)
}
