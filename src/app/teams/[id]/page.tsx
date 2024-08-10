import { sql, eq, asc} from "drizzle-orm";
import TeamPageData from "~/components/Team/teamPage";
import { db } from "~/server/db";
import { configs, players, players_teams, teams } from "~/server/db/schema";
import { PlayerFullInfo, TeamFullInfo } from "~/utils/types";

export default async function Page({ params }: { params: { id: string } }) { 

    const creditsConfig = await db
    .select({
        creditsConfig: configs.value,
    })
    .from(configs)
    .where(sql`${configs.id} = 1`);

    const infoTeam = await db
        .select({
            creditsLeft: sql<number>`
                ${creditsConfig.at(0)?.creditsConfig} - SUM(CASE WHEN ${players_teams.price} IS NOT NULL THEN ${players_teams.price} ELSE 0 END)`,
            teamId: teams.id,
            teamName: teams.name,
            D: sql<number>`COUNT(CASE WHEN ${players.role} = 'D' THEN 1 END)`,
            C: sql<number>`COUNT(CASE WHEN ${players.role} = 'C' THEN 1 END)`,
            A: sql<number>`COUNT(CASE WHEN ${players.role} = 'A' THEN 1 END)`,
        })
        .from(teams)
        .leftJoin(players_teams, eq(teams.id, players_teams.idTeam))
        .leftJoin(players, eq(players.idFantacalcio, players_teams.idFantacalcio))
        .where(eq(teams.id,Number(params.id)))
        .groupBy(teams.id)

    //"SELECT P.NAME, P.ROLE, P.IDFANTACALCIO, P.SQUADRA, PT.PRICE, PT.IDTEAM FROM PLAYERS P JOIN PLAYERS_TEAMS PT ON P.IDFANTACALCIO = PT.IDPLAYER WHERE PT.IDTEAM = ?"

    const playersTeam = await db
    .select({
        name: players.name,
        role: players.role,
        idFantacalcio: players.idFantacalcio,
        squadra: players.squadra,
        price: players_teams.price,
        idTeam: players_teams.idTeam
    })
    .from(players)
    .fullJoin(players_teams, eq(players.idFantacalcio,players_teams.idFantacalcio))
    .where(eq(players_teams.idTeam,Number(params.id)))

    const teamFullInfoList: TeamFullInfo[] = []
    infoTeam.map(team => {
      teamFullInfoList.push({
        creditsLeft: team.creditsLeft,
        teamId: team.teamId,
        teamName: team.teamName,
        D: team.D,
        C: team.C,
        A: team.A,
      })
    })
    const playersFullInfo : PlayerFullInfo[] = []

    playersTeam.map(player => {
      playersFullInfo.push({
        name: player.name ?? '',
        role: player.role ?? 'Z',
        idFantacalcio: player.idFantacalcio ?? 0,
        squadra: player.squadra ?? '',
        price: player.price ?? 0,
        idTeam: player.idTeam ?? 0,
      })
    })


    return (
      <TeamPageData players={playersFullInfo} team={teamFullInfoList}></TeamPageData>
    )
  }