CREATE TYPE "public"."user_gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "document" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" "user_gender" NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "birth_date" text NOT NULL;