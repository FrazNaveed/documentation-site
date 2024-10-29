import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_talking_points_variation" AS ENUM('standard', 'wideList');
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN "variation" "enum_pages_blocks_talking_points_variation" DEFAULT 'standard';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "variation";
  DROP TYPE "public"."enum_pages_blocks_talking_points_variation";`)
}
