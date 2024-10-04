import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_events_button_button_type" AS ENUM('primary', 'secondary');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "events" ADD COLUMN "button_buttonType" "enum_events_button_button_type";
  ALTER TABLE "events" ADD COLUMN "button_link" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "events" DROP COLUMN IF EXISTS "button_buttonType";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "button_link";`)
}
