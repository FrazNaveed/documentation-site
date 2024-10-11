import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "previous_page_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "next_page_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "link_type" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_previous_page_id_pages_id_fk" FOREIGN KEY ("previous_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_next_page_id_pages_id_fk" FOREIGN KEY ("next_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_previous_page_id_pages_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_next_page_id_pages_id_fk";
  
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "previous_page_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "next_page_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "link_type";`)
}
