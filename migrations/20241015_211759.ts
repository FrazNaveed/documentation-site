import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    -- Add new values to enums
    ALTER TYPE "enum_pages_page_template" ADD VALUE IF NOT EXISTS 'team';
    ALTER TYPE "enum_wallets_platforms" ADD VALUE IF NOT EXISTS 'iOS';
    ALTER TYPE "enum_wallets_platforms" ADD VALUE IF NOT EXISTS 'Android';
    ALTER TYPE "enum_wallets_platforms" ADD VALUE IF NOT EXISTS 'Hardware';

    -- Create the pages_rels table
    CREATE TABLE IF NOT EXISTS "pages_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "people_id" integer,
      "wallets_id" integer
    );

    -- Ensure the people table exists
    CREATE TABLE IF NOT EXISTS "people" (
      "id" serial PRIMARY KEY NOT NULL,
      "full_name" varchar,
      "headshot_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- Ensure people_locales table exists
    CREATE TABLE IF NOT EXISTS "people_locales" (
      "job_title" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL,
      CONSTRAINT "people_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
    );

    -- Modify existing table columns
    ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "label" DROP NOT NULL;
    ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "stat" DROP NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column1_data" DROP NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column2_data" DROP NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_sections" ALTER COLUMN "name" DROP NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column1_header" DROP NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column2_header" DROP NOT NULL;
    ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "header" DROP NOT NULL;
    ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "text" DROP NOT NULL;

    -- Add new columns to pages_locales
    ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "team_grid_title" varchar;
    ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "wallets_grid_wallets_grid_intro" jsonb;

    -- Add people_id to payload_locked_documents_rels if it doesn't exist
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'payload_locked_documents_rels' 
        AND column_name = 'people_id'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "people_id" integer;
      END IF;
    END $$;

    -- Add foreign key constraints
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'pages_rels'
        AND column_name = 'people_id'
      ) THEN
        ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_wallets_fk" FOREIGN KEY ("wallets_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "people" ADD CONSTRAINT "people_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "people_locales" ADD CONSTRAINT "people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;

    -- Create indexes
    CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "people_created_at_idx" ON "people" USING btree ("created_at");

    -- Foreign key for payload_locked_documents_rels
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TYPE "enum_wallets_platforms" ADD VALUE 'ios';
    ALTER TYPE "enum_wallets_platforms" ADD VALUE 'android';
    ALTER TYPE "enum_wallets_platforms" ADD VALUE 'hardware';

    DROP TABLE IF EXISTS "pages_rels";
    DROP TABLE IF EXISTS "people";
    DROP TABLE IF EXISTS "people_locales";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_people_fk";

    -- Revert changes to columns
    ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "label" SET NOT NULL;
    ALTER TABLE "pages_blocks_stats_stats" ALTER COLUMN "stat" SET NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column1_data" SET NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_sections_rows" ALTER COLUMN "column2_data" SET NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_sections" ALTER COLUMN "name" SET NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column1_header" SET NOT NULL;
    ALTER TABLE "pages_blocks_table_drawers_locales" ALTER COLUMN "column2_header" SET NOT NULL;
    ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "header" SET NOT NULL;
    ALTER TABLE "pages_blocks_talking_points_points" ALTER COLUMN "text" SET NOT NULL;

    ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "team_grid_title";
    ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "wallets_grid_wallets_grid_intro";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "people_id";
  `);
}
