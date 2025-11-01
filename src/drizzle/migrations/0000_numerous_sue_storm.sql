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
	"lunar_day" date NOT NULL,
	"solar_date" date NOT NULL,
	"type" varchar(50) DEFAULT 'personal',
	"is_private" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password_hash" text NOT NULL,
	"display_name" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;