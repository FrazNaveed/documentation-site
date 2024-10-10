import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_button_link" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "page_footer_c_t_a_button_button_text" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_link";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_button_text";`)
}
