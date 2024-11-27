import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "events_locales" DROP CONSTRAINT "events_locales_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "events_meta_meta_image_idx";
  ALTER TABLE "news_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "news_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "news_locales" ADD COLUMN "meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "news_meta_meta_image_idx" ON "news_locales" USING btree ("meta_image_id","_locale");
  ALTER TABLE "events_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "events_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "events_locales" DROP COLUMN IF EXISTS "meta_image_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news_locales" DROP CONSTRAINT "news_locales_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "news_meta_meta_image_idx";
  ALTER TABLE "events_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "events_locales" ADD COLUMN "meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_meta_meta_image_idx" ON "events_locales" USING btree ("meta_image_id","_locale");
  ALTER TABLE "news_locales" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "news_locales" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "news_locales" DROP COLUMN IF EXISTS "meta_image_id";`)
}
