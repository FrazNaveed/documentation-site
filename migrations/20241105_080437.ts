import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_style" AS ENUM('standard', 'protocol');
  ALTER TABLE "pages" ADD COLUMN "hero_style" "enum_pages_hero_style" DEFAULT 'standard';
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_logo_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_providers" numeric;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_feeds" numeric;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_stake_tokens" numeric;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_stake_value" numeric;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_average_block_time" numeric;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_protocol_info_logo_id_media_id_fk" FOREIGN KEY ("hero_protocol_info_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_protocol_info_hero_protocol_info_logo_idx" ON "pages" USING btree ("hero_protocol_info_logo_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_protocol_info_logo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_protocol_info_hero_protocol_info_logo_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_style";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_logo_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_text";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_providers";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_feeds";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_stake_tokens";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_stake_value";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_average_block_time";
  DROP TYPE "public"."enum_pages_hero_style";`)
}
