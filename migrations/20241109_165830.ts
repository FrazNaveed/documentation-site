import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_brand_logo_roll_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_logo_roll" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_brand_logo_roll_locales" (
  	"header" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_brand_logo_roll_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logo_roll_logos" ADD CONSTRAINT "pages_blocks_brand_logo_roll_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logo_roll_logos" ADD CONSTRAINT "pages_blocks_brand_logo_roll_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_logo_roll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logo_roll" ADD CONSTRAINT "pages_blocks_brand_logo_roll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_brand_logo_roll_locales" ADD CONSTRAINT "pages_blocks_brand_logo_roll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brand_logo_roll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_logos_order_idx" ON "pages_blocks_brand_logo_roll_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_logos_parent_id_idx" ON "pages_blocks_brand_logo_roll_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_logos_locale_idx" ON "pages_blocks_brand_logo_roll_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_logos_image_idx" ON "pages_blocks_brand_logo_roll_logos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_order_idx" ON "pages_blocks_brand_logo_roll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_parent_id_idx" ON "pages_blocks_brand_logo_roll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_brand_logo_roll_path_idx" ON "pages_blocks_brand_logo_roll" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_brand_logo_roll_logos";
  DROP TABLE "pages_blocks_brand_logo_roll";
  DROP TABLE "pages_blocks_brand_logo_roll_locales";`)
}
