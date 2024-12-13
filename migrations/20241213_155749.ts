import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "code_solidity" varchar;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "code_js" varchar;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "code_python" varchar;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "code_rust" varchar;
  ALTER TABLE "pages_blocks_code_cta" ADD COLUMN "code_go" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "code_solidity";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "code_js";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "code_python";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "code_rust";
  ALTER TABLE "pages_blocks_code_cta" DROP COLUMN IF EXISTS "code_go";`)
}
