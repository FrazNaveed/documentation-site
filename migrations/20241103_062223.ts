import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TYPE "public"."enum_pages_blocks_talking_points_variation" ADD VALUE 'textualGrid' BEFORE 'wideList';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  ALTER TABLE "public"."pages_blocks_talking_points" ALTER COLUMN "variation" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_talking_points_variation";
  CREATE TYPE "public"."enum_pages_blocks_talking_points_variation" AS ENUM('standard', 'wideList');
  ALTER TABLE "public"."pages_blocks_talking_points" ALTER COLUMN "variation" SET DATA TYPE "public"."enum_pages_blocks_talking_points_variation" USING "variation"::"public"."enum_pages_blocks_talking_points_variation";`)
}
