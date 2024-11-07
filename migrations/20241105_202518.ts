import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_template";
  DROP TYPE "public"."enum_pages_page_template" CASCADE;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'devHub', 'events', 'fullWidth', 'team', 'wallets');
  ALTER TABLE "pages_locales" ADD COLUMN "page_template" "enum_pages_page_template" DEFAULT 'default' NOT NULL;`)
}
