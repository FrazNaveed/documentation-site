import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_page_footer_c_t_a_button_background_image_style" AS ENUM('flipped', 'offset');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "page_footer_c_t_a_button_background_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "pageFooterCTAButton_backgroundImageStyle" "enum_pages_page_footer_c_t_a_button_background_image_style" DEFAULT 'flipped';
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_page_footer_c_t_a_button_background_image_id_media_id_fk" FOREIGN KEY ("page_footer_c_t_a_button_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_page_footer_c_t_a_button_background_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_background_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "pageFooterCTAButton_backgroundImageStyle";`)
}
