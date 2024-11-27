import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "events_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_meta_meta_image_idx" ON "events_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "events_locales" DROP CONSTRAINT "events_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "events_meta_meta_image_idx";
  DROP INDEX IF EXISTS "pages_meta_meta_image_idx";
  ALTER TABLE "events_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "events_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "events_locales" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "meta_image_id";`)
}
