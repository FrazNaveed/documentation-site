import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_regional_link_grid_links_country" AS ENUM('AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'EH', 'YE', 'ZM', 'ZW');
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points_points_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"link" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_regional_link_grid_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"name" varchar,
  	"translated_name" varchar,
  	"country" "enum_pages_blocks_regional_link_grid_links_country"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_regional_link_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_regional_link_grid_locales" (
  	"title" varchar,
  	"description" jsonb,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_regional_link_grid_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_talking_points_points" ADD COLUMN "add_logos" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_official_channels_locales" ADD COLUMN "text" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_points_logos" ADD CONSTRAINT "pages_blocks_talking_points_points_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_points_logos" ADD CONSTRAINT "pages_blocks_talking_points_points_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talking_points_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_regional_link_grid_links" ADD CONSTRAINT "pages_blocks_regional_link_grid_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_regional_link_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_regional_link_grid" ADD CONSTRAINT "pages_blocks_regional_link_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_regional_link_grid_locales" ADD CONSTRAINT "pages_blocks_regional_link_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_regional_link_grid"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_order_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_parent_id_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_locale_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_logos_logo_idx" ON "pages_blocks_talking_points_points_logos" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_links_order_idx" ON "pages_blocks_regional_link_grid_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_links_parent_id_idx" ON "pages_blocks_regional_link_grid_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_links_locale_idx" ON "pages_blocks_regional_link_grid_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_order_idx" ON "pages_blocks_regional_link_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_parent_id_idx" ON "pages_blocks_regional_link_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_regional_link_grid_path_idx" ON "pages_blocks_regional_link_grid" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_talking_points_points_logos";
  DROP TABLE "pages_blocks_regional_link_grid_links";
  DROP TABLE "pages_blocks_regional_link_grid";
  DROP TABLE "pages_blocks_regional_link_grid_locales";
  ALTER TABLE "pages_blocks_talking_points_points" DROP COLUMN IF EXISTS "add_logos";
  ALTER TABLE "pages_blocks_official_channels_locales" DROP COLUMN IF EXISTS "text";
  DROP TYPE "public"."enum_pages_blocks_regional_link_grid_links_country";`)
}
