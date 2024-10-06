import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"header" varchar,
  	"text_test" varchar,
  	"text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_points" ADD CONSTRAINT "pages_blocks_talking_points_points_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_points" ADD CONSTRAINT "pages_blocks_talking_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talking_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points" ADD CONSTRAINT "pages_blocks_talking_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_order_idx" ON "pages_blocks_talking_points_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_parent_id_idx" ON "pages_blocks_talking_points_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_locale_idx" ON "pages_blocks_talking_points_points" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_order_idx" ON "pages_blocks_talking_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_parent_id_idx" ON "pages_blocks_talking_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_path_idx" ON "pages_blocks_talking_points" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_talking_points_points";
  DROP TABLE "pages_blocks_talking_points";`)
}
