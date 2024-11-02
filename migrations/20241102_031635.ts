import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"primary_button_link" varchar,
  	"secondary_button_link" varchar,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column_cta_locales" (
  	"eyebrow" varchar,
  	"header" varchar,
  	"text" jsonb,
  	"primary_button_text" varchar,
  	"secondary_button_text" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_two_column_cta_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_official_channels_locales" ADD COLUMN "text" jsonb;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_cta" ADD CONSTRAINT "pages_blocks_two_column_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_cta" ADD CONSTRAINT "pages_blocks_two_column_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_cta_locales" ADD CONSTRAINT "pages_blocks_two_column_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_column_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_cta_order_idx" ON "pages_blocks_two_column_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_cta_parent_id_idx" ON "pages_blocks_two_column_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_cta_path_idx" ON "pages_blocks_two_column_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_cta_image_idx" ON "pages_blocks_two_column_cta" USING btree ("image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  DROP TABLE "pages_blocks_two_column_cta";
  DROP TABLE "pages_blocks_two_column_cta_locales";
  ALTER TABLE "pages_blocks_official_channels_locales" DROP COLUMN IF EXISTS "text";`)
}
