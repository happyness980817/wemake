ALTER TABLE "teams" ALTER COLUMN "product_stage" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."team_stage";--> statement-breakpoint
CREATE TYPE "public"."team_stage" AS ENUM('idea', 'prototype', 'MVP', 'product', 'enterprise');--> statement-breakpoint
UPDATE "teams" SET "product_stage" = 'MVP' WHERE "product_stage" = 'mvp';--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "product_stage" SET DATA TYPE "public"."team_stage" USING "product_stage"::"public"."team_stage";