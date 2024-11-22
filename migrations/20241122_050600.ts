import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_layer_cake_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header" varchar,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_layer_cake_secondary_column_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_layer_cake" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_layer_cake_locales" (
  	"banner_text" varchar,
  	"primary_column_label" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_layer_cake_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_fast_panel" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_fast_panel_locales" (
  	"text" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_fast_panel_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "decenPanel" (
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
  
  CREATE TABLE IF NOT EXISTS "decenPanel_locales" (
  	"header" varchar,
  	"subheader" varchar,
  	"text" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "decenPanel_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_secure_panel" (
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_secure_panel_locales" (
  	"text" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_secure_panel_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_layer_cake_layers" ADD CONSTRAINT "pages_blocks_layer_cake_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_layer_cake"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_layer_cake_secondary_column_sections" ADD CONSTRAINT "pages_blocks_layer_cake_secondary_column_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_layer_cake"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_layer_cake" ADD CONSTRAINT "pages_blocks_layer_cake_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_layer_cake_locales" ADD CONSTRAINT "pages_blocks_layer_cake_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_layer_cake"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_fast_panel" ADD CONSTRAINT "pages_blocks_fast_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_fast_panel_locales" ADD CONSTRAINT "pages_blocks_fast_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_fast_panel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decenPanel" ADD CONSTRAINT "decenPanel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decenPanel_locales" ADD CONSTRAINT "decenPanel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."decenPanel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_secure_panel" ADD CONSTRAINT "pages_blocks_secure_panel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_secure_panel_locales" ADD CONSTRAINT "pages_blocks_secure_panel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_secure_panel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_layers_order_idx" ON "pages_blocks_layer_cake_layers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_layers_parent_id_idx" ON "pages_blocks_layer_cake_layers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_layers_locale_idx" ON "pages_blocks_layer_cake_layers" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_secondary_column_sections_order_idx" ON "pages_blocks_layer_cake_secondary_column_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_secondary_column_sections_parent_id_idx" ON "pages_blocks_layer_cake_secondary_column_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_secondary_column_sections_locale_idx" ON "pages_blocks_layer_cake_secondary_column_sections" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_order_idx" ON "pages_blocks_layer_cake" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_parent_id_idx" ON "pages_blocks_layer_cake" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_layer_cake_path_idx" ON "pages_blocks_layer_cake" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_fast_panel_order_idx" ON "pages_blocks_fast_panel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_fast_panel_parent_id_idx" ON "pages_blocks_fast_panel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_fast_panel_path_idx" ON "pages_blocks_fast_panel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "decenPanel_order_idx" ON "decenPanel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "decenPanel_parent_id_idx" ON "decenPanel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "decenPanel_path_idx" ON "decenPanel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_secure_panel_order_idx" ON "pages_blocks_secure_panel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_secure_panel_parent_id_idx" ON "pages_blocks_secure_panel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_secure_panel_path_idx" ON "pages_blocks_secure_panel" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_layer_cake_layers" CASCADE;
  DROP TABLE "pages_blocks_layer_cake_secondary_column_sections" CASCADE;
  DROP TABLE "pages_blocks_layer_cake" CASCADE;
  DROP TABLE "pages_blocks_layer_cake_locales" CASCADE;
  DROP TABLE "pages_blocks_fast_panel" CASCADE;
  DROP TABLE "pages_blocks_fast_panel_locales" CASCADE;
  DROP TABLE "decenPanel" CASCADE;
  DROP TABLE "decenPanel_locales" CASCADE;
  DROP TABLE "pages_blocks_secure_panel" CASCADE;
  DROP TABLE "pages_blocks_secure_panel_locales" CASCADE;`)
}
