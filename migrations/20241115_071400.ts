import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_responsive_image" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_responsive_image_locales" (
  	"header" varchar,
  	"image_default_id" integer,
  	"image_medium_id" integer,
  	"image_mobile_id" integer,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_responsive_image_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_responsive_image" ADD CONSTRAINT "pages_blocks_responsive_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_responsive_image_locales" ADD CONSTRAINT "pages_blocks_responsive_image_locales_image_default_id_media_id_fk" FOREIGN KEY ("image_default_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_responsive_image_locales" ADD CONSTRAINT "pages_blocks_responsive_image_locales_image_medium_id_media_id_fk" FOREIGN KEY ("image_medium_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_responsive_image_locales" ADD CONSTRAINT "pages_blocks_responsive_image_locales_image_mobile_id_media_id_fk" FOREIGN KEY ("image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_responsive_image_locales" ADD CONSTRAINT "pages_blocks_responsive_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_responsive_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_responsive_image_order_idx" ON "pages_blocks_responsive_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_responsive_image_parent_id_idx" ON "pages_blocks_responsive_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_responsive_image_path_idx" ON "pages_blocks_responsive_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_responsive_image_image_default_idx" ON "pages_blocks_responsive_image_locales" USING btree ("image_default_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_responsive_image_image_medium_idx" ON "pages_blocks_responsive_image_locales" USING btree ("image_medium_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_responsive_image_image_mobile_idx" ON "pages_blocks_responsive_image_locales" USING btree ("image_mobile_id","_locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_responsive_image";
  DROP TABLE "pages_blocks_responsive_image_locales";`)
}
