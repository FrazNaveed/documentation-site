import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "pull_from_api" boolean;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "pull_from_api";`)
}
