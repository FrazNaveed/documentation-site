import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_footerCtaSocials_select_social_channels" AS ENUM('discord', 'github', 'linkedin', 'medium', 'telegram', 'x', 'youtube');
  CREATE TABLE IF NOT EXISTS "footerCtaSocials_select_social_channels" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_footerCtaSocials_select_social_channels",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footerCtaSocials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DROP TABLE "pages_page_footer_c_t_a_button_select_social_channels" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "footerCtaSocials_select_social_channels" ADD CONSTRAINT "footerCtaSocials_select_social_channels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footerCtaSocials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footerCtaSocials_select_social_channels_order_idx" ON "footerCtaSocials_select_social_channels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "footerCtaSocials_select_social_channels_parent_idx" ON "footerCtaSocials_select_social_channels" USING btree ("parent_id");
  DROP TYPE "public"."enum_pages_page_footer_c_t_a_button_select_social_channels";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_page_footer_c_t_a_button_select_social_channels" AS ENUM('discord', 'github', 'linkedin', 'medium', 'telegram', 'x', 'youtube');
  CREATE TABLE IF NOT EXISTS "pages_page_footer_c_t_a_button_select_social_channels" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_page_footer_c_t_a_button_select_social_channels",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  DROP TABLE "footerCtaSocials_select_social_channels" CASCADE;
  DROP TABLE "footerCtaSocials" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "pages_page_footer_c_t_a_button_select_social_channels" ADD CONSTRAINT "pages_page_footer_c_t_a_button_select_social_channels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_page_footer_c_t_a_button_select_social_channels_order_idx" ON "pages_page_footer_c_t_a_button_select_social_channels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_page_footer_c_t_a_button_select_social_channels_parent_idx" ON "pages_page_footer_c_t_a_button_select_social_channels" USING btree ("parent_id");
  DROP TYPE "public"."enum_footerCtaSocials_select_social_channels";`)
}
