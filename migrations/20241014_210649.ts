import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'wallets', 'events');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "pageTemplate" "enum_pages_page_template" DEFAULT 'default' NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "pageTemplate";`)
}
