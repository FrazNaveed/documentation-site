import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_official_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_official_channels_locales" (
  	"title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_official_channels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "social_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "social_links_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "social_links_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_official_channels" ADD CONSTRAINT "pages_blocks_official_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_official_channels_locales" ADD CONSTRAINT "pages_blocks_official_channels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_official_channels"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "social_links" ADD CONSTRAINT "social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_official_channels_order_idx" ON "pages_blocks_official_channels" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_official_channels_parent_id_idx" ON "pages_blocks_official_channels" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_official_channels_path_idx" ON "pages_blocks_official_channels" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "social_links_icon_idx" ON "social_links" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "social_links_created_at_idx" ON "social_links" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_social_links_id_idx" ON "pages_rels" USING btree ("social_links_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_social_links_id_idx" ON "payload_locked_documents_rels" USING btree ("social_links_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_official_channels";
  DROP TABLE "pages_blocks_official_channels_locales";
  DROP TABLE "social_links";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_social_links_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_social_links_fk";
  
  DROP INDEX IF EXISTS "pages_rels_social_links_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_social_links_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "social_links_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "social_links_id";`)
}
