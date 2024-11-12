import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "event_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "event_settings_locales" (
  	"event_card_eyebrow" varchar NOT NULL,
  	"event_card_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "event_settings_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "event_settings_locales" ADD CONSTRAINT "event_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."event_settings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages_blocks_marquee_gallery_locales" DROP COLUMN IF EXISTS "event_card_eyebrow";
  ALTER TABLE "pages_blocks_marquee_gallery_locales" DROP COLUMN IF EXISTS "event_card_title";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "event_settings";
  DROP TABLE "event_settings_locales";
  ALTER TABLE "pages_blocks_marquee_gallery_locales" ADD COLUMN "event_card_eyebrow" varchar;
  ALTER TABLE "pages_blocks_marquee_gallery_locales" ADD COLUMN "event_card_title" varchar;`)
}
