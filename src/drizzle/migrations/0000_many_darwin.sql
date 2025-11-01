CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'document', 'icon');--> statement-breakpoint
CREATE TABLE "calendar_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"solar_date" date NOT NULL,
	"lunar_date" date NOT NULL,
	"can_chi_day" varchar(10),
	"can_chi_month" varchar(10),
	"can_chi_year" varchar(10),
	CONSTRAINT "calendar_data_solar_date_unique" UNIQUE("solar_date")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"lunar_day" integer NOT NULL,
	"lunar_month" integer NOT NULL,
	"lunar_year" integer NOT NULL,
	"is_leap_month" boolean DEFAULT false,
	"solar_date" date NOT NULL,
	"type" varchar(50) DEFAULT 'personal',
	"is_private" boolean DEFAULT true,
	"reminder_days" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"file_name" varchar(256) NOT NULL,
	"original_name" varchar(256) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"size" integer NOT NULL,
	"path" varchar(512) NOT NULL,
	"type" "media_type" NOT NULL,
	"description" text,
	"is_public" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"password_hash" text,
	"display_name" varchar(256),
	"google_id" varchar(256),
	"phone" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_user_id_idx" ON "events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "events_solar_date_idx" ON "events" USING btree ("solar_date");--> statement-breakpoint
CREATE INDEX "events_type_idx" ON "events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "media_user_id_idx" ON "media" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "media_type_idx" ON "media" USING btree ("type");--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");