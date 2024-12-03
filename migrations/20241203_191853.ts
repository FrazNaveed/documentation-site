import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "tokenLink_token_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tokenLink" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_margin_settings" boolean DEFAULT false,
  	"standard_top_margin" boolean DEFAULT false,
  	"standard_bottom_margin" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tokenLink_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "tokenLink_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "tokenLink_token_links" ADD CONSTRAINT "tokenLink_token_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tokenLink_token_links" ADD CONSTRAINT "tokenLink_token_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tokenLink"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tokenLink" ADD CONSTRAINT "tokenLink_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tokenLink_locales" ADD CONSTRAINT "tokenLink_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tokenLink"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tokenLink_token_links_order_idx" ON "tokenLink_token_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tokenLink_token_links_parent_id_idx" ON "tokenLink_token_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tokenLink_token_links_locale_idx" ON "tokenLink_token_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "tokenLink_token_links_icon_idx" ON "tokenLink_token_links" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "tokenLink_order_idx" ON "tokenLink" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tokenLink_parent_id_idx" ON "tokenLink" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tokenLink_path_idx" ON "tokenLink" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "tokenLink_token_links" CASCADE;
  DROP TABLE "tokenLink" CASCADE;
  DROP TABLE "tokenLink_locales" CASCADE;`)
}
