ALTER TABLE "players" ALTER COLUMN "idFantacalcio" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "players_teams" ALTER COLUMN "buyAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "squadra" varchar(100) NOT NULL;