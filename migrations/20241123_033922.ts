import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_two_column_cta_variation" AS ENUM('standard', 'alternate');
  ALTER TABLE "pages_blocks_two_column_cta" ADD COLUMN "variation" "enum_pages_blocks_two_column_cta_variation" DEFAULT 'standard';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_two_column_cta" DROP COLUMN IF EXISTS "variation";
  DROP TYPE "public"."enum_pages_blocks_two_column_cta_variation";`)
}
