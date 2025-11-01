CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'document', 'icon');--> statement-breakpoint
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
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;