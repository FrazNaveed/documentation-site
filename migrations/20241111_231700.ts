import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_marquee_gallery_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_social_link" boolean DEFAULT false,
  	"image_card_image_id" integer,
  	"image_card_title_overlay" varchar,
  	"image_card_text_overlay" jsonb,
  	"social_channel_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_marquee_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_marquee_gallery_locales" (
  	"title" varchar,
  	"event_card_eyebrow" varchar,
  	"event_card_title" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_marquee_gallery_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "social_links_locales" (
  	"follower_count" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "social_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_marquee_gallery_cards" ADD CONSTRAINT "pages_blocks_marquee_gallery_cards_image_card_image_id_media_id_fk" FOREIGN KEY ("image_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_marquee_gallery_cards" ADD CONSTRAINT "pages_blocks_marquee_gallery_cards_social_channel_id_social_links_id_fk" FOREIGN KEY ("social_channel_id") REFERENCES "public"."social_links"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_marquee_gallery_cards" ADD CONSTRAINT "pages_blocks_marquee_gallery_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_marquee_gallery" ADD CONSTRAINT "pages_blocks_marquee_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_marquee_gallery_locales" ADD CONSTRAINT "pages_blocks_marquee_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "social_links_locales" ADD CONSTRAINT "social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_cards_order_idx" ON "pages_blocks_marquee_gallery_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_cards_parent_id_idx" ON "pages_blocks_marquee_gallery_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_cards_locale_idx" ON "pages_blocks_marquee_gallery_cards" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_cards_image_card_image_card_image_idx" ON "pages_blocks_marquee_gallery_cards" USING btree ("image_card_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_cards_social_channel_idx" ON "pages_blocks_marquee_gallery_cards" USING btree ("social_channel_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_order_idx" ON "pages_blocks_marquee_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_parent_id_idx" ON "pages_blocks_marquee_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_gallery_path_idx" ON "pages_blocks_marquee_gallery" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_marquee_gallery_cards";
  DROP TABLE "pages_blocks_marquee_gallery";
  DROP TABLE "pages_blocks_marquee_gallery_locales";
  DROP TABLE "social_links_locales";`)
}
