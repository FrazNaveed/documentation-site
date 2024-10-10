import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"row_label" varchar,
  	"column1_data" jsonb NOT NULL,
  	"column2_data" jsonb NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"link_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers_locales" (
  	"column1_header" varchar NOT NULL,
  	"column2_header" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_table_drawers_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_table_drawers_sections_rows" ADD CONSTRAINT "pages_blocks_table_drawers_sections_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table_drawers_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_table_drawers_sections" ADD CONSTRAINT "pages_blocks_table_drawers_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table_drawers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_table_drawers" ADD CONSTRAINT "pages_blocks_table_drawers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_table_drawers_locales" ADD CONSTRAINT "pages_blocks_table_drawers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table_drawers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_rows_order_idx" ON "pages_blocks_table_drawers_sections_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_rows_parent_id_idx" ON "pages_blocks_table_drawers_sections_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_rows_locale_idx" ON "pages_blocks_table_drawers_sections_rows" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_order_idx" ON "pages_blocks_table_drawers_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_parent_id_idx" ON "pages_blocks_table_drawers_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_locale_idx" ON "pages_blocks_table_drawers_sections" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_order_idx" ON "pages_blocks_table_drawers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_parent_id_idx" ON "pages_blocks_table_drawers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_path_idx" ON "pages_blocks_table_drawers" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_table_drawers_sections_rows";
  DROP TABLE "pages_blocks_table_drawers_sections";
  DROP TABLE "pages_blocks_table_drawers";
  DROP TABLE "pages_blocks_table_drawers_locales";`)
}
