import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news_types_locales" RENAME COLUMN "name" TO "title";
  ALTER TABLE "news_sub_types_locales" RENAME COLUMN "name" TO "title";
  DROP INDEX IF EXISTS "news_types_name_idx";
  DROP INDEX IF EXISTS "news_sub_types_name_idx";
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "related_news_type_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_related_news_type_id_news_types_id_fk" FOREIGN KEY ("related_news_type_id") REFERENCES "public"."news_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "news_types_title_idx" ON "news_types_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_sub_types_title_idx" ON "news_sub_types_locales" USING btree ("title","_locale");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "news_types_locales" RENAME COLUMN "title" TO "name";
  ALTER TABLE "news_sub_types_locales" RENAME COLUMN "title" TO "name";
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_related_news_type_id_news_types_id_fk";
  
  DROP INDEX IF EXISTS "news_types_title_idx";
  DROP INDEX IF EXISTS "news_sub_types_title_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "news_types_name_idx" ON "news_types_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_sub_types_name_idx" ON "news_sub_types_locales" USING btree ("name","_locale");
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "related_news_type_id";`)
}
