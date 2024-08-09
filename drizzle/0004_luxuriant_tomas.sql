ALTER TABLE "players" RENAME COLUMN "idFantacalcio" TO "id_fantacalcio";--> statement-breakpoint
ALTER TABLE "players_teams" RENAME COLUMN "idFantacalcio" TO "id_fantacalcio";--> statement-breakpoint
ALTER TABLE "players_teams" RENAME COLUMN "idTeam" TO "id_team";--> statement-breakpoint
ALTER TABLE "players_teams" RENAME COLUMN "buyAt" TO "buy_at";--> statement-breakpoint
ALTER TABLE "players_teams" DROP CONSTRAINT "players_teams_idFantacalcio_players_idFantacalcio_fk";
--> statement-breakpoint
ALTER TABLE "players_teams" DROP CONSTRAINT "players_teams_idTeam_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "squadra" SET DEFAULT 'team';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players_teams" ADD CONSTRAINT "players_teams_id_fantacalcio_players_id_fantacalcio_fk" FOREIGN KEY ("id_fantacalcio") REFERENCES "public"."players"("id_fantacalcio") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players_teams" ADD CONSTRAINT "players_teams_id_team_teams_id_fk" FOREIGN KEY ("id_team") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
