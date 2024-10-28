import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_image_id" integer,
  	"card_header" varchar,
  	"card_text" jsonb
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" ADD CONSTRAINT "pages_blocks_image_text_grid_image_text_card_grid_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" ADD CONSTRAINT "pages_blocks_image_text_grid_image_text_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid_order_idx" ON "pages_blocks_image_text_grid_image_text_card_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid_parent_id_idx" ON "pages_blocks_image_text_grid_image_text_card_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_text_grid_image_text_card_grid_locale_idx" ON "pages_blocks_image_text_grid_image_text_card_grid" USING btree ("_locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_image_text_grid_image_text_card_grid";`)
}
