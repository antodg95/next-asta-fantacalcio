CREATE TABLE IF NOT EXISTS "configs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"value" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "players_teams" ADD CONSTRAINT "players_teams_id_fantacalcio_unique" UNIQUE("id_fantacalcio");