import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "pages" ADD COLUMN "page_footer_c_t_a_button_use_social_media_buttons" boolean DEFAULT false;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "page_footer_c_t_a_button_use_social_media_buttons";`)
}
