import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_talking_points_variation" AS ENUM('standard', 'wideList');
  CREATE TABLE IF NOT EXISTS "appProcess_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"graphic_title" varchar,
  	"graphic_text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "appProcess" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "appProcess_locales" (
  	"title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "appProcess_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "pages_blocks_talking_points" ADD COLUMN "variation" "enum_pages_blocks_talking_points_variation" DEFAULT 'standard';
  DO $$ BEGIN
   ALTER TABLE "appProcess_steps" ADD CONSTRAINT "appProcess_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."appProcess"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "appProcess" ADD CONSTRAINT "appProcess_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "appProcess_locales" ADD CONSTRAINT "appProcess_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."appProcess"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "appProcess_steps_order_idx" ON "appProcess_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "appProcess_steps_parent_id_idx" ON "appProcess_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "appProcess_steps_locale_idx" ON "appProcess_steps" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "appProcess_order_idx" ON "appProcess" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "appProcess_parent_id_idx" ON "appProcess" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "appProcess_path_idx" ON "appProcess" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "appProcess_steps";
  DROP TABLE "appProcess";
  DROP TABLE "appProcess_locales";
  ALTER TABLE "pages_blocks_talking_points" DROP COLUMN IF EXISTS "variation";
  DROP TYPE "public"."enum_pages_blocks_talking_points_variation";`)
}
