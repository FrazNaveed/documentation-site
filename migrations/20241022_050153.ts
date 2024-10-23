import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_dev_hub_link_band_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "dev_hub_link_band_link_band_title" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_dev_hub_link_band_links" ADD CONSTRAINT "pages_dev_hub_link_band_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_dev_hub_link_band_links_order_idx" ON "pages_dev_hub_link_band_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_dev_hub_link_band_links_parent_id_idx" ON "pages_dev_hub_link_band_links" USING btree ("_parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_dev_hub_link_band_links";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "dev_hub_link_band_link_band_title";`)
}
