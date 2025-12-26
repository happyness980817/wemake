CREATE TYPE "public"."team_stage" AS ENUM('idea', 'prototype', 'mvp', 'product', 'enterprise');--> statement-breakpoint
CREATE TABLE "team" (
	"team_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "team_team_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"team_size" integer NOT NULL,
	"product_name" text NOT NULL,
	"product_stage" "team_stage" NOT NULL,
	"product_description" text NOT NULL,
	"equity" integer NOT NULL,
	"roles" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_size_check" CHECK ("team"."team_size" BETWEEN 1 AND 100),
	CONSTRAINT "equity_check" CHECK ("team"."equity" BETWEEN 0 AND 100),
	CONSTRAINT "product_description_check" CHECK (LENGTH("team"."product_description") <= 200)
);
