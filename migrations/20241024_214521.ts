import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_header" varchar,
  	"card_text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_text_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_text_grid_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_image_text_grid_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" ADD CONSTRAINT "pages_blocks_image_text_grid_image_text_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_text_grid" ADD CONSTRAINT "pages_blocks_image_text_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_text_grid_locales" ADD CONSTRAINT "pages_blocks_image_text_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid_order_idx" ON "pages_blocks_image_text_grid_image_text_card_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid_parent_id_idx" ON "pages_blocks_image_text_grid_image_text_card_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid_locale_idx" ON "pages_blocks_image_text_grid_image_text_card_grid" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_order_idx" ON "pages_blocks_image_text_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_parent_id_idx" ON "pages_blocks_image_text_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_path_idx" ON "pages_blocks_image_text_grid" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_image_text_grid_image_text_card_grid";
  DROP TABLE "pages_blocks_image_text_grid";
  DROP TABLE "pages_blocks_image_text_grid_locales";`)
}
