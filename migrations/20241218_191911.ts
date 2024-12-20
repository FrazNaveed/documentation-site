import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "careers_locales" (
  	"job_title" varchar NOT NULL,
  	"product_team_id" integer NOT NULL,
  	"locations_locations_remote" boolean,
  	"locations_locations_europe" boolean,
  	"locations_locations_asia" boolean,
  	"locations_locations_americas" boolean,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "careers_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "product_teams" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "product_teams_locales" (
  	"team_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "product_teams_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "careers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_teams_id" integer;
  DO $$ BEGIN
   ALTER TABLE "careers_locales" ADD CONSTRAINT "careers_locales_product_team_id_product_teams_id_fk" FOREIGN KEY ("product_team_id") REFERENCES "public"."product_teams"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "careers_locales" ADD CONSTRAINT "careers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_teams_locales" ADD CONSTRAINT "product_teams_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_teams"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "careers_created_at_idx" ON "careers" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "careers_product_team_idx" ON "careers_locales" USING btree ("product_team_id","_locale");
  CREATE INDEX IF NOT EXISTS "product_teams_updated_at_idx" ON "product_teams" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_teams_created_at_idx" ON "product_teams" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_teams_fk" FOREIGN KEY ("product_teams_id") REFERENCES "public"."product_teams"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_teams_id_idx" ON "payload_locked_documents_rels" USING btree ("product_teams_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "careers_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_teams_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "careers" CASCADE;
  DROP TABLE "careers_locales" CASCADE;
  DROP TABLE "product_teams" CASCADE;
  DROP TABLE "product_teams_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_careers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_teams_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_careers_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_product_teams_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "careers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "product_teams_id";`)
}
