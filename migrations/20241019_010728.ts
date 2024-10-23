import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "developer_guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "developer_guides_locales" (
  	"title" varchar NOT NULL,
  	"short_description" varchar,
  	"product_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "developer_guides_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "developer_guides_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"developer_guide_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "developer_guide_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "developer_guide_tags_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "developer_guide_tags_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"short_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "products_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "developer_guides_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "developer_guide_tags_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "products_id" integer;
  DO $$ BEGIN
   ALTER TABLE "developer_guides_locales" ADD CONSTRAINT "developer_guides_locales_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "developer_guides_locales" ADD CONSTRAINT "developer_guides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."developer_guides"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "developer_guides_rels" ADD CONSTRAINT "developer_guides_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."developer_guides"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "developer_guides_rels" ADD CONSTRAINT "developer_guides_rels_developer_guide_tags_fk" FOREIGN KEY ("developer_guide_tags_id") REFERENCES "public"."developer_guide_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "developer_guide_tags_locales" ADD CONSTRAINT "developer_guide_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."developer_guide_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "developer_guides_created_at_idx" ON "developer_guides" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "developer_guides_rels_order_idx" ON "developer_guides_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "developer_guides_rels_parent_idx" ON "developer_guides_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "developer_guides_rels_path_idx" ON "developer_guides_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "developer_guides_rels_locale_idx" ON "developer_guides_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "developer_guide_tags_created_at_idx" ON "developer_guide_tags" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "developer_guide_tags_title_idx" ON "developer_guide_tags_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "developer_guide_tags_slug_idx" ON "developer_guide_tags_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_title_idx" ON "products_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products_locales" USING btree ("slug","_locale");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_developer_guides_fk" FOREIGN KEY ("developer_guides_id") REFERENCES "public"."developer_guides"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_developer_guide_tags_fk" FOREIGN KEY ("developer_guide_tags_id") REFERENCES "public"."developer_guide_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "developer_guides";
  DROP TABLE "developer_guides_locales";
  DROP TABLE "developer_guides_rels";
  DROP TABLE "developer_guide_tags";
  DROP TABLE "developer_guide_tags_locales";
  DROP TABLE "products";
  DROP TABLE "products_locales";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_developer_guides_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_developer_guide_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "developer_guides_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "developer_guide_tags_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "products_id";`)
}
