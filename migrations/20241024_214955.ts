import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" ADD COLUMN IF NOT EXISTS "card_image_id" integer;
  ALTER TABLE "pages_blocks_image_text_grid_locales" ADD COLUMN IF NOT EXISTS "image_text_grid_title" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" ADD CONSTRAINT "pages_blocks_image_text_grid_image_text_card_grid_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" DROP CONSTRAINT "pages_blocks_image_text_grid_image_text_card_grid_card_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_image_text_grid_image_text_card_grid" DROP COLUMN IF EXISTS "card_image_id";
  ALTER TABLE "pages_blocks_image_text_grid_locales" DROP COLUMN IF EXISTS "image_text_grid_title";`)
}
