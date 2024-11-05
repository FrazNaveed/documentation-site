import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "public"."enum_pages_grants_featured_grants_countries_country" RENAME TO "enum_pages_hero_grants_info_countries_country";
  ALTER TYPE "public"."enum_pages_hero_style" ADD VALUE 'grants';
  ALTER TABLE "pages_grants_featured_grants_countries" RENAME TO "pages_hero_grants_info_countries";
  ALTER TABLE "pages_grants_featured_grants_top_categories" RENAME TO "pages_hero_grants_info_top_categories";
  ALTER TABLE "pages" RENAME COLUMN "grants_featured_grants_grants_awarded" TO "hero_grants_info_grants_awarded";
  ALTER TABLE "pages_hero_grants_info_countries" DROP CONSTRAINT "pages_grants_featured_grants_countries_parent_id_fk";
  
  ALTER TABLE "pages_hero_grants_info_top_categories" DROP CONSTRAINT "pages_grants_featured_grants_top_categories_type_id_grant_types_id_fk";
  
  ALTER TABLE "pages_hero_grants_info_top_categories" DROP CONSTRAINT "pages_grants_featured_grants_top_categories_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_grants_featured_grants_countries_order_idx";
  DROP INDEX IF EXISTS "pages_grants_featured_grants_countries_parent_id_idx";
  DROP INDEX IF EXISTS "pages_grants_featured_grants_countries_locale_idx";
  DROP INDEX IF EXISTS "pages_grants_featured_grants_top_categories_order_idx";
  DROP INDEX IF EXISTS "pages_grants_featured_grants_top_categories_parent_id_idx";
  DROP INDEX IF EXISTS "pages_grants_featured_grants_top_categories_locale_idx";
  DROP INDEX IF EXISTS "pages_grants_featured_grants_top_categories_type_idx";
  DO $$ BEGIN
   ALTER TABLE "pages_hero_grants_info_countries" ADD CONSTRAINT "pages_hero_grants_info_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_grants_info_top_categories" ADD CONSTRAINT "pages_hero_grants_info_top_categories_type_id_grant_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."grant_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_grants_info_top_categories" ADD CONSTRAINT "pages_hero_grants_info_top_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_countries_order_idx" ON "pages_hero_grants_info_countries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_countries_parent_id_idx" ON "pages_hero_grants_info_countries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_countries_locale_idx" ON "pages_hero_grants_info_countries" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_top_categories_order_idx" ON "pages_hero_grants_info_top_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_top_categories_parent_id_idx" ON "pages_hero_grants_info_top_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_top_categories_locale_idx" ON "pages_hero_grants_info_top_categories" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_hero_grants_info_top_categories_type_idx" ON "pages_hero_grants_info_top_categories" USING btree ("type_id");
  ALTER TABLE "public"."pages_locales" ALTER COLUMN "page_template" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_page_template" CASCADE;
  CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'devHub', 'events', 'fullWidth', 'team', 'wallets');
  ALTER TABLE "public"."pages_locales" ALTER COLUMN "page_template" SET DATA TYPE "public"."enum_pages_page_template" USING "page_template"::"public"."enum_pages_page_template";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_grants_featured_grants_countries_country" AS ENUM('AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'EH', 'YE', 'ZM', 'ZW');
  ALTER TYPE "public"."enum_pages_page_template" ADD VALUE 'grants';
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
  
  DROP TABLE "pages_hero_grants_info_countries";
  DROP TABLE "pages_hero_grants_info_top_categories";
  ALTER TABLE "pages" ADD COLUMN "grants_featured_grants_grants_awarded" numeric;
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
  
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_countries_order_idx" ON "pages_grants_featured_grants_countries" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_countries_parent_id_idx" ON "pages_grants_featured_grants_countries" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_countries_locale_idx" ON "pages_grants_featured_grants_countries" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_order_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_parent_id_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_locale_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_grants_featured_grants_top_categories_type_idx" ON "pages_grants_featured_grants_top_categories" USING btree ("type_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_grants_info_grants_awarded";
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_style" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_style";
  CREATE TYPE "public"."enum_pages_hero_style" AS ENUM('standard', 'protocol');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_style" SET DATA TYPE "public"."enum_pages_hero_style" USING "hero_style"::"public"."enum_pages_hero_style";
  DROP TYPE "public"."enum_pages_hero_grants_info_countries_country";`)
}
