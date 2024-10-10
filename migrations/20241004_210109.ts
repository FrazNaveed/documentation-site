import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_columns" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_image" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN IF NOT EXISTS "link_text" varchar;
  ALTER TABLE "pages_blocks_stats" ADD COLUMN IF NOT EXISTS "link_text" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_image" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "link_text";`)
}
