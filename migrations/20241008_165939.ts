import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_wallets_tags" AS ENUM('wrap', 'delegate', 'stake', 'autoclaim', 'claim', 'voting');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_wallets_platforms" AS ENUM('ios', 'android', 'hardware');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "wallets_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_wallets_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "wallets_platforms" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_wallets_platforms",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "wallets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"wallet_link" varchar NOT NULL,
  	"flr_functionality" boolean DEFAULT false,
  	"wallet_connect" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "wallets_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "wallets_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "wallets_id" integer;
  
  DO $$ BEGIN
   ALTER TABLE "wallets_tags" ADD CONSTRAINT "wallets_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets_platforms" ADD CONSTRAINT "wallets_platforms_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets" ADD CONSTRAINT "wallets_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets_locales" ADD CONSTRAINT "wallets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "wallets_tags_order_idx" ON "wallets_tags" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "wallets_tags_parent_idx" ON "wallets_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "wallets_platforms_order_idx" ON "wallets_platforms" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "wallets_platforms_parent_idx" ON "wallets_platforms" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "wallets_created_at_idx" ON "wallets" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wallets_fk" FOREIGN KEY ("wallets_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  DROP TABLE "wallets_tags";
  DROP TABLE "wallets_platforms";
  DROP TABLE "wallets";
  DROP TABLE "wallets_locales";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_wallets_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "wallets_id";`)
}
