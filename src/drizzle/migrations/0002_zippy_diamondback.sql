ALTER TABLE "events" ALTER COLUMN "lunar_day" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "lunar_month" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "lunar_year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "is_leap_month" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "reminder_days" integer;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "updated_at" timestamp;