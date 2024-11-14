import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_style" ADD VALUE 'centered';
  ALTER TABLE "pages" ADD COLUMN "hero_hide_eyebrow" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_show_background_video" boolean;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_hide_eyebrow";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_show_background_video";
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_style" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_style";
  CREATE TYPE "public"."enum_pages_hero_style" AS ENUM('standard', 'protocol', 'grants');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_style" SET DATA TYPE "public"."enum_pages_hero_style" USING "hero_style"::"public"."enum_pages_hero_style";`)
}
