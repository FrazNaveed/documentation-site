import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'de');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_events_country" AS ENUM('AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'EH', 'YE', 'ZM', 'ZW');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_events_button_button_type" AS ENUM('announcement', 'rsvp');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_style" AS ENUM('standard');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_columns_layout" AS ENUM('equal', 'wideLeft', 'wideRight');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_page_footer_c_t_a_button_background_image_style" AS ENUM('flipped', 'offset');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_page_template" AS ENUM('default', 'devHub', 'events', 'team', 'wallets');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_news_content_type" AS ENUM('video', 'podcast');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_wallets_tags" AS ENUM('wrap', 'delegate', 'stake', 'autoclaim', 'claim', 'voting');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_wallets_platforms" AS ENUM('iOS', 'Android', 'Hardware');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"start_time" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"end_time" timestamp(3) with time zone,
  	"event_link" varchar,
  	"button_buttonType" "enum_events_button_button_type",
  	"button_link" varchar,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "events_locales" (
  	"title" varchar NOT NULL,
  	"country" "enum_events_country" DEFAULT 'US' NOT NULL,
  	"location" varchar NOT NULL,
  	"flare_involvement" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "events_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_col_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_rich_text_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_columns_layout" DEFAULT 'equal',
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_columns_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_image_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_block_locales" (
  	"rich_text" jsonb,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_rich_text_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"stat" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_stats_locales" (
  	"caption" jsonb,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_stats_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers_sections_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"row_label" varchar,
  	"column1_data" jsonb,
  	"column2_data" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_table_drawers_locales" (
  	"column1_header" varchar,
  	"column2_header" varchar,
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_table_drawers_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"header" varchar,
  	"text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"create_side_nav_link" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_talking_points_locales" (
  	"link_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "pages_blocks_talking_points_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_style" "enum_pages_hero_style" DEFAULT 'standard',
  	"hero_button_link" varchar,
  	"hero_background_image_id" integer,
  	"hide_hero" boolean DEFAULT false,
  	"page_banner_toggle_page_banner" boolean DEFAULT false,
  	"page_footer_c_t_a" boolean DEFAULT false,
  	"page_footer_c_t_a_button_button_link" varchar,
  	"page_footer_c_t_a_button_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"title" varchar,
  	"hero_headline" varchar,
  	"hero_eyebrow" varchar,
  	"hero_button_text" varchar,
  	"related_news_type_id" integer,
  	"previous_page_id" integer,
  	"next_page_id" integer,
  	"link_type" varchar,
  	"page_banner_banner_text" jsonb,
  	"team_grid_grid_title" varchar,
  	"wallets_grid_wallets_grid_intro" jsonb,
  	"page_footer_c_t_a_button_button_text" varchar,
  	"pageFooterCTAButton_backgroundImageStyle" "enum_pages_page_footer_c_t_a_button_background_image_style" DEFAULT 'flipped',
  	"pageTemplate" "enum_pages_page_template" DEFAULT 'default' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"wallets_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "media_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "news_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"publish_date" timestamp(3) with time zone NOT NULL,
  	"author_id" integer NOT NULL,
  	"teaser_thumbnail_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"type_id" integer NOT NULL,
  	"subtype_id" integer,
  	"contentType" "enum_news_content_type",
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "news_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"news_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "news_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "news_types_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "news_types_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "news_sub_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "news_sub_types_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "news_sub_types_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar,
  	"headshot_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "people_locales" (
  	"job_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "people_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "wallets_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_wallets_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "wallets_platforms" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_wallets_platforms",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "wallets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"wallet_link" varchar NOT NULL,
  	"flr_functionality" boolean DEFAULT false,
  	"wallet_connect" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "wallets_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "wallets_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"pages_id" integer,
  	"users_id" integer,
  	"media_id" integer,
  	"news_id" integer,
  	"news_types_id" integer,
  	"news_sub_types_id" integer,
  	"people_id" integer,
  	"wallets_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_col_image" ADD CONSTRAINT "pages_blocks_col_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_col_image" ADD CONSTRAINT "pages_blocks_col_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns" ADD CONSTRAINT "pages_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns_locales" ADD CONSTRAINT "pages_blocks_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_locales" ADD CONSTRAINT "pages_blocks_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text_block_locales" ADD CONSTRAINT "pages_blocks_rich_text_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_stats_locales" ADD CONSTRAINT "pages_blocks_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_talking_points_locales" ADD CONSTRAINT "pages_blocks_talking_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_talking_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_page_footer_c_t_a_button_background_image_id_media_id_fk" FOREIGN KEY ("page_footer_c_t_a_button_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_related_news_type_id_news_types_id_fk" FOREIGN KEY ("related_news_type_id") REFERENCES "public"."news_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_previous_page_id_pages_id_fk" FOREIGN KEY ("previous_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_next_page_id_pages_id_fk" FOREIGN KEY ("next_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_wallets_fk" FOREIGN KEY ("wallets_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_logos" ADD CONSTRAINT "news_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_logos" ADD CONSTRAINT "news_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news" ADD CONSTRAINT "news_teaser_thumbnail_id_media_id_fk" FOREIGN KEY ("teaser_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_type_id_news_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."news_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_subtype_id_news_sub_types_id_fk" FOREIGN KEY ("subtype_id") REFERENCES "public"."news_sub_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_types" ADD CONSTRAINT "news_types_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_types_locales" ADD CONSTRAINT "news_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_sub_types" ADD CONSTRAINT "news_sub_types_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "news_sub_types_locales" ADD CONSTRAINT "news_sub_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_sub_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "people" ADD CONSTRAINT "people_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "people_locales" ADD CONSTRAINT "people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets_tags" ADD CONSTRAINT "wallets_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets_platforms" ADD CONSTRAINT "wallets_platforms_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets" ADD CONSTRAINT "wallets_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "wallets_locales" ADD CONSTRAINT "wallets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_types_fk" FOREIGN KEY ("news_types_id") REFERENCES "public"."news_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_sub_types_fk" FOREIGN KEY ("news_sub_types_id") REFERENCES "public"."news_sub_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wallets_fk" FOREIGN KEY ("wallets_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_order_idx" ON "pages_blocks_col_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_parent_id_idx" ON "pages_blocks_col_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_col_image_path_idx" ON "pages_blocks_col_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_order_idx" ON "pages_blocks_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_parent_id_idx" ON "pages_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_path_idx" ON "pages_blocks_columns" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_stats_locale_idx" ON "pages_blocks_stats_stats" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_rows_order_idx" ON "pages_blocks_table_drawers_sections_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_rows_parent_id_idx" ON "pages_blocks_table_drawers_sections_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_rows_locale_idx" ON "pages_blocks_table_drawers_sections_rows" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_order_idx" ON "pages_blocks_table_drawers_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_parent_id_idx" ON "pages_blocks_table_drawers_sections" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_sections_locale_idx" ON "pages_blocks_table_drawers_sections" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_order_idx" ON "pages_blocks_table_drawers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_parent_id_idx" ON "pages_blocks_table_drawers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_table_drawers_path_idx" ON "pages_blocks_table_drawers" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_order_idx" ON "pages_blocks_talking_points_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_parent_id_idx" ON "pages_blocks_talking_points_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_points_locale_idx" ON "pages_blocks_talking_points_points" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_order_idx" ON "pages_blocks_talking_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_parent_id_idx" ON "pages_blocks_talking_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_talking_points_path_idx" ON "pages_blocks_talking_points" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "news_logos_order_idx" ON "news_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "news_logos_parent_id_idx" ON "news_logos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "news_rels_locale_idx" ON "news_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "news_types_created_at_idx" ON "news_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_types_title_idx" ON "news_types_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_types_slug_idx" ON "news_types_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "news_sub_types_created_at_idx" ON "news_sub_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_sub_types_title_idx" ON "news_sub_types_locales" USING btree ("title","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "news_sub_types_slug_idx" ON "news_sub_types_locales" USING btree ("slug","_locale");
  CREATE INDEX IF NOT EXISTS "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "wallets_tags_order_idx" ON "wallets_tags" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "wallets_tags_parent_idx" ON "wallets_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "wallets_platforms_order_idx" ON "wallets_platforms" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "wallets_platforms_parent_idx" ON "wallets_platforms" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "wallets_created_at_idx" ON "wallets" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "events";
  DROP TABLE "events_locales";
  DROP TABLE "pages_blocks_col_image";
  DROP TABLE "pages_blocks_rich_text";
  DROP TABLE "pages_blocks_rich_text_locales";
  DROP TABLE "pages_blocks_columns";
  DROP TABLE "pages_blocks_columns_locales";
  DROP TABLE "pages_blocks_image";
  DROP TABLE "pages_blocks_image_locales";
  DROP TABLE "pages_blocks_rich_text_block";
  DROP TABLE "pages_blocks_rich_text_block_locales";
  DROP TABLE "pages_blocks_stats_stats";
  DROP TABLE "pages_blocks_stats";
  DROP TABLE "pages_blocks_stats_locales";
  DROP TABLE "pages_blocks_table_drawers_sections_rows";
  DROP TABLE "pages_blocks_table_drawers_sections";
  DROP TABLE "pages_blocks_table_drawers";
  DROP TABLE "pages_blocks_table_drawers_locales";
  DROP TABLE "pages_blocks_talking_points_points";
  DROP TABLE "pages_blocks_talking_points";
  DROP TABLE "pages_blocks_talking_points_locales";
  DROP TABLE "pages";
  DROP TABLE "pages_locales";
  DROP TABLE "pages_rels";
  DROP TABLE "users";
  DROP TABLE "media";
  DROP TABLE "media_locales";
  DROP TABLE "news_logos";
  DROP TABLE "news";
  DROP TABLE "news_locales";
  DROP TABLE "news_rels";
  DROP TABLE "news_types";
  DROP TABLE "news_types_locales";
  DROP TABLE "news_sub_types";
  DROP TABLE "news_sub_types_locales";
  DROP TABLE "people";
  DROP TABLE "people_locales";
  DROP TABLE "wallets_tags";
  DROP TABLE "wallets_platforms";
  DROP TABLE "wallets";
  DROP TABLE "wallets_locales";
  DROP TABLE "payload_locked_documents";
  DROP TABLE "payload_locked_documents_rels";
  DROP TABLE "payload_preferences";
  DROP TABLE "payload_preferences_rels";
  DROP TABLE "payload_migrations";`)
}
