CREATE TABLE IF NOT EXISTS "players_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"idFantacalcio" integer NOT NULL,
	"idTeam" integer NOT NULL,
	"price" integer NOT NULL,
	"buyAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "players" RENAME COLUMN "id" TO "idFantacalcio";--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "role" varchar(1) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players_teams" ADD CONSTRAINT "players_teams_idFantacalcio_players_idFantacalcio_fk" FOREIGN KEY ("idFantacalcio") REFERENCES "public"."players"("idFantacalcio") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players_teams" ADD CONSTRAINT "players_teams_idTeam_teams_id_fk" FOREIGN KEY ("idTeam") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
