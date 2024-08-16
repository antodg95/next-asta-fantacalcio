import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { players, players_teams, teams } from '~/server/db/schema';

export async function GET() {
    const playersTeamList = await db.select({
        idFantacalcio: players.idFantacalcio,
        teamName: teams.name,
        teamId: teams.id,
        price: players_teams.price
    }).from(players_teams).leftJoin(players, eq(players_teams.idFantacalcio, players.idFantacalcio)).leftJoin(teams, eq(players_teams.idTeam, teams.id));

    const teamsFromDb = await db.query.teams.findMany();

    let csv = ""

    teamsFromDb.map(team => {
        csv += "$,$,$\r\n"
        playersTeamList.map(player => {
            if (player.teamId === team.id) {
                csv += player.teamName + "," + player.idFantacalcio + "," + player.price + "\r\n"
            }
        })
    })

    return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          "Content-Disposition": `attachment; filename="rose_`+Date.now()+`.csv"`,
        },
      });
}