import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "news" DROP COLUMN IF EXISTS "pin";
  ALTER TABLE "news" DROP COLUMN IF EXISTS "pinPriority";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_news_pin_priority" AS ENUM('0', '1', '2', '3');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "news" ADD COLUMN "pin" boolean DEFAULT false;
  ALTER TABLE "news" ADD COLUMN "pinPriority" "enum_news_pin_priority" DEFAULT '0';
  ALTER TABLE "news" DROP COLUMN IF EXISTS "featured";`)
}
