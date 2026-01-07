ALTER TABLE IF EXISTS "team" RENAME TO "teams";--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" DROP CONSTRAINT IF EXISTS "team_size_check";--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" DROP CONSTRAINT IF EXISTS "equity_check";--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" DROP CONSTRAINT IF EXISTS "product_description_check";--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" DROP CONSTRAINT IF EXISTS "teams_team_leader_id_profiles_profile_id_fk";--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" ADD COLUMN IF NOT EXISTS "team_leader_id" uuid;--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" ADD CONSTRAINT "teams_team_leader_id_profiles_profile_id_fk" FOREIGN KEY ("team_leader_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" ADD CONSTRAINT "team_size_check" CHECK ("teams"."team_size" BETWEEN 1 AND 100);--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" ADD CONSTRAINT "equity_check" CHECK ("teams"."equity" BETWEEN 0 AND 100);--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" ADD CONSTRAINT "product_description_check" CHECK (LENGTH("teams"."product_description") <= 200);
