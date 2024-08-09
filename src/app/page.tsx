import {notInArray, sql } from "drizzle-orm";
import HomePageData from "~/components/HomePageData";
import {db} from "~/server/db";
import { players, players_teams } from "~/server/db/schema";
import { CsvPlayer, Team } from "~/utils/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {

    const bought = db.select({idFantacalcio: players_teams.idFantacalcio}).from(players_teams);
    const playersOrdered = await db.select({name: players.name, role: players.role, idFantacalcio: players.idFantacalcio, team: players.squadra}).from(players)
        .where(notInArray(players.idFantacalcio, bought)).orderBy(sql`CASE ROLE WHEN 'P' THEN 1 WHEN 'D' THEN 2 WHEN 'C' THEN 3 WHEN 'A' THEN 4 ELSE 5 END, NAME asc`);
    const csvPlayers: CsvPlayer[] = [];
    const teams = await db.query.teams.findMany();
    const teamsList : Team[] = []


    playersOrdered.map(player => {
        csvPlayers.push({
            idFantacalcio: player.idFantacalcio,
            name: player.name,
            role: player.role,
            team: player.team,
        })
    })

    teams.map( team => {
        teamsList.push({
            id: team.id,
            name: team.name,
        })
    })

  return (
    <main className="">
        <HomePageData players={csvPlayers} teams={teamsList}/>
    </main>
  );
}