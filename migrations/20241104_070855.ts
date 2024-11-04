import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  CREATE TABLE IF NOT EXISTS "pages_blocks_flare_drop_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_flare_drop_dates_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_flare_drop_dates_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_flare_drop_dates" ADD CONSTRAINT "pages_blocks_flare_drop_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_flare_drop_dates_locales" ADD CONSTRAINT "pages_blocks_flare_drop_dates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_flare_drop_dates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_flare_drop_dates_order_idx" ON "pages_blocks_flare_drop_dates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_flare_drop_dates_parent_id_idx" ON "pages_blocks_flare_drop_dates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_flare_drop_dates_path_idx" ON "pages_blocks_flare_drop_dates" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
  DROP TABLE "pages_blocks_flare_drop_dates";
  DROP TABLE "pages_blocks_flare_drop_dates_locales";`)
}
