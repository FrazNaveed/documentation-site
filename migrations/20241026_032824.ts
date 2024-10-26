import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_grants_country" AS ENUM('AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'EH', 'YE', 'ZM', 'ZW');
  CREATE TYPE "public"."enum_pages_grants_featured_grants_countries_country" AS ENUM('AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'EH', 'YE', 'ZM', 'ZW');
  ALTER TYPE "public"."enum_pages_page_template" ADD VALUE 'grants';
  CREATE TABLE IF NOT EXISTS "grants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"announcement_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "grants_locales" (
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"country" "enum_grants_country" DEFAULT 'US' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "grants_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "grants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"grant_types_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "grant_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "grant_types_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "grant_types_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_grants_featured_grants_countries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"country" "enum_pages_grants_featured_grants_countries_country"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_grants_featured_grants_top_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type_id" integer,
  	"number" numeric
  );
  
  ALTER TABLE "pages" ADD COLUMN "grants_featured_grants_grants_awarded" numeric;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "grants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "grant_types_id" integer;
  DO $$ BEGIN
   ALTER TABLE "grants" ADD CONSTRAINT "grants_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "grants_rels" ADD CONSTRAINT "grants_rels_grant_types_fk" FOREIGN KEY ("grant_types_id") REFERENCES "public"."grant_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "grant_types_locales" ADD CONSTRAINT "grant_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grant_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_grants_featured_grants_countries" ADD CONSTRAINT "pages_grants_featured_grants_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_grants_featured_grants_top_categories" ADD CONSTRAINT "pages_grants_featured_grants_top_categories_type_id_grant_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."grant_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_grants_featured_grants_top_categories" ADD CONSTRAINT "pages_grants_featured_grants_top_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "grants_logo_idx" ON "grants" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "grants_created_at_idx" ON "grants" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "grants_rels_order_idx" ON "grants_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "grants_rels_parent_idx" ON "grants_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "grants_rels_path_idx" ON "grants_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "grants_rels_grant_types_id_idx" ON "grants_rels" USING btree ("grant_types_id","locale");
  CREATE INDEX IF NOT EXISTS "grants_rels_locale_idx" ON "grants_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "grant_types_created_at_idx" ON "grant_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "grant_types_title_idx" ON "grant_types_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "grant_types_slug_idx" ON "grant_types_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_countries_order_idx" ON "pages_grants_featured_grants_countries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_countries_parent_id_idx" ON "pages_grants_featured_grants_countries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_countries_locale_idx" ON "pages_grants_featured_grants_countries" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_order_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_parent_id_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_locale_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_type_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("type_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grant_types_fk" FOREIGN KEY ("grant_types_id") REFERENCES "public"."grant_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_grants_id_idx" ON "payload_locked_documents_rels" USING btree ("grants_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_grant_types_id_idx" ON "payload_locked_documents_rels" USING btree ("grant_types_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "grants";
  DROP TABLE "grants_locales";
  DROP TABLE "grants_rels";
  DROP TABLE "grant_types";
  DROP TABLE "grant_types_locales";
  DROP TABLE "pages_grants_featured_grants_countries";
  DROP TABLE "pages_grants_featured_grants_top_categories";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_grants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_grant_types_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_grants_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_grant_types_id_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "grants_featured_grants_grants_awarded";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "grants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "grant_types_id";
  ALTER TABLE "public"."pages_locales" ALTER COLUMN "page_template" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_page_template";
  CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'devHub', 'events', 'team', 'wallets');
  ALTER TABLE "public"."pages_locales" ALTER COLUMN "page_template" SET DATA TYPE "public"."enum_pages_page_template" USING "page_template"::"public"."enum_pages_page_template";
  DROP TYPE "public"."enum_grants_country";
  DROP TYPE "public"."enum_pages_grants_featured_grants_countries_country";`)
}
