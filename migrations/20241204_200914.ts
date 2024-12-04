import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_providers_label_icon_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_providers_label_override" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_providers_unit" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_feeds_label_icon_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_feeds_label_override" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_tokens_label_icon_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_tokens_label_override" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_average_block_time_label_icon_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_average_block_time_label_override" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_protocol_info_average_block_time_unit" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_protocol_info_providers_label_icon_id_media_id_fk" FOREIGN KEY ("hero_protocol_info_providers_label_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_protocol_info_feeds_label_icon_id_media_id_fk" FOREIGN KEY ("hero_protocol_info_feeds_label_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_protocol_info_tokens_label_icon_id_media_id_fk" FOREIGN KEY ("hero_protocol_info_tokens_label_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_protocol_info_average_block_time_label_icon_id_media_id_fk" FOREIGN KEY ("hero_protocol_info_average_block_time_label_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_protocol_info_hero_protocol_info_providers_label_icon_idx" ON "pages" USING btree ("hero_protocol_info_providers_label_icon_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_protocol_info_hero_protocol_info_feeds_label_icon_idx" ON "pages" USING btree ("hero_protocol_info_feeds_label_icon_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_protocol_info_hero_protocol_info_tokens_label_icon_idx" ON "pages" USING btree ("hero_protocol_info_tokens_label_icon_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_protocol_info_hero_protocol_info_average_block_time_label_icon_idx" ON "pages" USING btree ("hero_protocol_info_average_block_time_label_icon_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_protocol_info_providers_label_icon_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_protocol_info_feeds_label_icon_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_protocol_info_tokens_label_icon_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_protocol_info_average_block_time_label_icon_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_protocol_info_hero_protocol_info_providers_label_icon_idx";
  DROP INDEX IF EXISTS "pages_hero_protocol_info_hero_protocol_info_feeds_label_icon_idx";
  DROP INDEX IF EXISTS "pages_hero_protocol_info_hero_protocol_info_tokens_label_icon_idx";
  DROP INDEX IF EXISTS "pages_hero_protocol_info_hero_protocol_info_average_block_time_label_icon_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_providers_label_icon_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_providers_label_override";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_providers_unit";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_feeds_label_icon_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_feeds_label_override";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_tokens_label_icon_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_tokens_label_override";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_average_block_time_label_icon_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_average_block_time_label_override";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_protocol_info_average_block_time_unit";`)
}
