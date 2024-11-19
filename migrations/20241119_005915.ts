import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "steps" (
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
  
  CREATE TABLE IF NOT EXISTS "steps_locales" (
  	"title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "steps_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "steps_steps" ADD CONSTRAINT "steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "steps" ADD CONSTRAINT "steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "steps_locales" ADD CONSTRAINT "steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "steps_steps_order_idx" ON "steps_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "steps_steps_parent_id_idx" ON "steps_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "steps_steps_locale_idx" ON "steps_steps" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "steps_order_idx" ON "steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "steps_parent_id_idx" ON "steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "steps_path_idx" ON "steps" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "steps_steps" CASCADE;
  DROP TABLE "steps" CASCADE;
  DROP TABLE "steps_locales" CASCADE;`)
}
