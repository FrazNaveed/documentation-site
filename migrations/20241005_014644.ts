import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   
  ALTER TABLE "pages" ALTER COLUMN "hero_style" SET DEFAULT 'standard';`)
}
// removed ALTER TYPE "enum_pages_hero_style" ADD VALUE 'standard'; from above

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_pages_hero_style" ADD VALUE 'Standard';
  ALTER TABLE "pages" ALTER COLUMN "hero_style" SET DEFAULT 'Standard';`)
}
