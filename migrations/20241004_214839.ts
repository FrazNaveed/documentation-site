import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_events_button_button_type" ADD VALUE 'announcement';
  ALTER TYPE "enum_events_button_button_type" ADD VALUE 'rsvp';
  ALTER TABLE "events" ADD COLUMN "end_time" timestamp(3) with time zone;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "enum_events_button_button_type" ADD VALUE 'primary';
  ALTER TYPE "enum_events_button_button_type" ADD VALUE 'secondary';
  ALTER TABLE "events" DROP COLUMN IF EXISTS "end_time";`)
}
