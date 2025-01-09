import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_code_cta_locales" ADD COLUMN "solidity_label_override" varchar;
  ALTER TABLE "pages_blocks_code_cta_locales" ADD COLUMN "java_script_label_override" varchar;
  ALTER TABLE "pages_blocks_code_cta_locales" ADD COLUMN "python_label_override" varchar;
  ALTER TABLE "pages_blocks_code_cta_locales" ADD COLUMN "rust_label_override" varchar;
  ALTER TABLE "pages_blocks_code_cta_locales" ADD COLUMN "go_label_override" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_code_cta_locales" DROP COLUMN IF EXISTS "solidity_label_override";
  ALTER TABLE "pages_blocks_code_cta_locales" DROP COLUMN IF EXISTS "java_script_label_override";
  ALTER TABLE "pages_blocks_code_cta_locales" DROP COLUMN IF EXISTS "python_label_override";
  ALTER TABLE "pages_blocks_code_cta_locales" DROP COLUMN IF EXISTS "rust_label_override";
  ALTER TABLE "pages_blocks_code_cta_locales" DROP COLUMN IF EXISTS "go_label_override";`)
}
