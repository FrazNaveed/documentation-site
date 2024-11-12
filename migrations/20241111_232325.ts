import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_marquee_gallery" ADD COLUMN "block_margin_settings" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_marquee_gallery" ADD COLUMN "standard_top_margin" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_marquee_gallery" ADD COLUMN "standard_bottom_margin" boolean DEFAULT false;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_marquee_gallery" DROP COLUMN IF EXISTS "block_margin_settings";
  ALTER TABLE "pages_blocks_marquee_gallery" DROP COLUMN IF EXISTS "standard_top_margin";
  ALTER TABLE "pages_blocks_marquee_gallery" DROP COLUMN IF EXISTS "standard_bottom_margin";`)
}
