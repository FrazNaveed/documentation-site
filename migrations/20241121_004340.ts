import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_page_footer_c_t_a_button_select_social_channels" AS ENUM('discord', 'github', 'linkedin', 'medium', 'telegram', 'x', 'youtube');
  CREATE TABLE IF NOT EXISTS "pages_page_footer_c_t_a_button_select_social_channels" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_page_footer_c_t_a_button_select_social_channels",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "social_channels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "social_channels_locales" (
  	"discord_title" varchar NOT NULL,
  	"discord_url" varchar NOT NULL,
  	"discord_follower_count" varchar,
  	"github_title" varchar NOT NULL,
  	"github_url" varchar NOT NULL,
  	"github_follower_count" varchar,
  	"linkedin_title" varchar NOT NULL,
  	"linkedin_url" varchar NOT NULL,
  	"linkedin_follower_count" varchar,
  	"medium_title" varchar NOT NULL,
  	"medium_url" varchar NOT NULL,
  	"medium_follower_count" varchar,
  	"telegram_title" varchar NOT NULL,
  	"telegram_url" varchar NOT NULL,
  	"telegram_follower_count" varchar,
  	"x_title" varchar NOT NULL,
  	"x_url" varchar NOT NULL,
  	"x_follower_count" varchar,
  	"youtube_title" varchar NOT NULL,
  	"youtube_url" varchar NOT NULL,
  	"youtube_follower_count" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "social_channels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_use_social_media_buttons" boolean DEFAULT false;
  
  DO $$ BEGIN
   ALTER TABLE "pages_page_footer_c_t_a_button_select_social_channels" ADD CONSTRAINT "pages_page_footer_c_t_a_button_select_social_channels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "social_channels_locales" ADD CONSTRAINT "social_channels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_channels"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_page_footer_c_t_a_button_select_social_channels_order_idx" ON "pages_page_footer_c_t_a_button_select_social_channels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_page_footer_c_t_a_button_select_social_channels_parent_idx" ON "pages_page_footer_c_t_a_button_select_social_channels" USING btree ("parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  DROP TABLE "pages_page_footer_c_t_a_button_select_social_channels" CASCADE;
  DROP TABLE "social_channels" CASCADE;
  DROP TABLE "social_channels_locales" CASCADE;
  
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_use_social_media_buttons";
  DROP TYPE "public"."enum_pages_page_footer_c_t_a_button_select_social_channels";`)
}
