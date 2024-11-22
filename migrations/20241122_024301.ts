import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_official_channels_select_social_channels" AS ENUM('discord', 'github', 'linkedin', 'medium', 'telegram', 'x', 'youtube');
  CREATE TYPE "public"."enum_pages_blocks_marquee_gallery_cards_social_channel" AS ENUM('discord', 'github', 'linkedin', 'medium', 'telegram', 'x', 'youtube');
  CREATE TABLE IF NOT EXISTS "pages_blocks_official_channels_select_social_channels" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_official_channels_select_social_channels",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "pages_blocks_marquee_gallery_cards" DROP CONSTRAINT "pages_blocks_marquee_gallery_cards_social_channel_id_social_links_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_social_links_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_marquee_gallery_cards_social_channel_idx";
  DROP INDEX IF EXISTS "pages_rels_social_links_id_idx";
  ALTER TABLE "pages_blocks_marquee_gallery_cards" ADD COLUMN "social_channel" "enum_pages_blocks_marquee_gallery_cards_social_channel";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_official_channels_select_social_channels" ADD CONSTRAINT "pages_blocks_official_channels_select_social_channels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_official_channels"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_official_channels_select_social_channels_order_idx" ON "pages_blocks_official_channels_select_social_channels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_official_channels_select_social_channels_parent_idx" ON "pages_blocks_official_channels_select_social_channels" USING btree ("parent_id");
  ALTER TABLE "pages_blocks_marquee_gallery_cards" DROP COLUMN IF EXISTS "social_channel_id";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "social_links_id";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_official_channels_select_social_channels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_official_channels_select_social_channels" CASCADE;
  ALTER TABLE "pages_blocks_marquee_gallery_cards" ADD COLUMN "social_channel_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "social_links_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_marquee_gallery_cards" ADD CONSTRAINT "pages_blocks_marquee_gallery_cards_social_channel_id_social_links_id_fk" FOREIGN KEY ("social_channel_id") REFERENCES "public"."social_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_cards_social_channel_idx" ON "pages_blocks_marquee_gallery_cards" USING btree ("social_channel_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_social_links_id_idx" ON "pages_rels" USING btree ("social_links_id","locale");
  ALTER TABLE "pages_blocks_marquee_gallery_cards" DROP COLUMN IF EXISTS "social_channel";
  DROP TYPE "public"."enum_pages_blocks_official_channels_select_social_channels";
  DROP TYPE "public"."enum_pages_blocks_marquee_gallery_cards_social_channel";`)
}
