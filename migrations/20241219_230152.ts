import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "public"."enum_pages_page_template" ADD VALUE 'careers';
  ALTER TABLE "pages_blocks_newsletter_signup_form" RENAME TO "newsletterForm";
  ALTER TABLE "pages_blocks_newsletter_signup_form_locales" RENAME TO "newsletterForm_locales";
  ALTER TABLE "careers_locales" RENAME COLUMN "job_title" TO "title";
  ALTER TABLE "careers_locales" RENAME COLUMN "locations_locations_remote" TO "locations_remote";
  ALTER TABLE "careers_locales" RENAME COLUMN "locations_locations_europe" TO "locations_europe";
  ALTER TABLE "careers_locales" RENAME COLUMN "locations_locations_asia" TO "locations_asia";
  ALTER TABLE "careers_locales" RENAME COLUMN "locations_locations_americas" TO "locations_americas";
  ALTER TABLE "newsletterForm_locales" DROP CONSTRAINT "pages_blocks_newsletter_signup_form_locales_locale_parent_id_unique";
  ALTER TABLE "newsletterForm" DROP CONSTRAINT "pages_blocks_newsletter_signup_form_parent_id_fk";
  
  ALTER TABLE "newsletterForm_locales" DROP CONSTRAINT "pages_blocks_newsletter_signup_form_locales_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_newsletter_signup_form_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_newsletter_signup_form_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_newsletter_signup_form_path_idx";
  ALTER TABLE "pages_locales" ADD COLUMN "careers_page_title" varchar DEFAULT 'Open Roles';
  ALTER TABLE "pages_locales" ADD COLUMN "careers_content" jsonb;
  ALTER TABLE "pages_locales" ADD COLUMN "careers_empty_listings_text" jsonb;
  ALTER TABLE "careers" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "careers_locales" ADD COLUMN "excerpt" varchar;
  DO $$ BEGIN
   ALTER TABLE "newsletterForm" ADD CONSTRAINT "newsletterForm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "newsletterForm_locales" ADD CONSTRAINT "newsletterForm_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."newsletterForm"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "newsletterForm_order_idx" ON "newsletterForm" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "newsletterForm_parent_id_idx" ON "newsletterForm" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "newsletterForm_path_idx" ON "newsletterForm" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "careers_slug_idx" ON "careers" USING btree ("slug");
  ALTER TABLE "newsletterForm_locales" ADD CONSTRAINT "newsletterForm_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_newsletter_signup_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_margin_settings" boolean DEFAULT false,
  	"standard_top_margin" boolean DEFAULT false,
  	"standard_bottom_margin" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_newsletter_signup_form_locales" (
  	"title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_newsletter_signup_form_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "newsletterForm" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "newsletterForm_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "newsletterForm" CASCADE;
  DROP TABLE "newsletterForm_locales" CASCADE;
  DROP INDEX IF EXISTS "careers_slug_idx";
  ALTER TABLE "careers_locales" ADD COLUMN "job_title" varchar NOT NULL;
  ALTER TABLE "careers_locales" ADD COLUMN "locations_locations_remote" boolean;
  ALTER TABLE "careers_locales" ADD COLUMN "locations_locations_europe" boolean;
  ALTER TABLE "careers_locales" ADD COLUMN "locations_locations_asia" boolean;
  ALTER TABLE "careers_locales" ADD COLUMN "locations_locations_americas" boolean;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_newsletter_signup_form" ADD CONSTRAINT "pages_blocks_newsletter_signup_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_newsletter_signup_form_locales" ADD CONSTRAINT "pages_blocks_newsletter_signup_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter_signup_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_newsletter_signup_form_order_idx" ON "pages_blocks_newsletter_signup_form" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_newsletter_signup_form_parent_id_idx" ON "pages_blocks_newsletter_signup_form" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_newsletter_signup_form_path_idx" ON "pages_blocks_newsletter_signup_form" USING btree ("_path");
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "careers_page_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "careers_content";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "careers_empty_listings_text";
  ALTER TABLE "careers" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "careers_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "careers_locales" DROP COLUMN IF EXISTS "excerpt";
  ALTER TABLE "careers_locales" DROP COLUMN IF EXISTS "locations_remote";
  ALTER TABLE "careers_locales" DROP COLUMN IF EXISTS "locations_europe";
  ALTER TABLE "careers_locales" DROP COLUMN IF EXISTS "locations_asia";
  ALTER TABLE "careers_locales" DROP COLUMN IF EXISTS "locations_americas";
  ALTER TABLE "public"."pages_locales" ALTER COLUMN "page_template" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_page_template";
  CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'devHub', 'events', 'fullWidth', 'team', 'wallets');
  ALTER TABLE "public"."pages_locales" ALTER COLUMN "page_template" SET DATA TYPE "public"."enum_pages_page_template" USING "page_template"::"public"."enum_pages_page_template";`)
}
