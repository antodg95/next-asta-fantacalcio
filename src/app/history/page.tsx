import { db } from "~/server/db"
import { players, players_teams, teams } from "~/server/db/schema"
import { desc, eq } from 'drizzle-orm';
import { PlayerHistory } from "~/utils/types";
import HistoryTable from "~/components/History/historyTable";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function History() {

    const _cookies = cookies()

    const playerHistoryList = await db.select({
        name: players.name,
        role: players.role,
        idFantacalcio: players.idFantacalcio,
        squadra: players.squadra,
        price: players_teams.price,
        idTeam: players_teams.idTeam,
        teamName: teams.name
    }).from(players).innerJoin(players_teams, eq(players.idFantacalcio,players_teams.idFantacalcio)).innerJoin(teams, eq(players_teams.idTeam, teams.id)).orderBy(desc(players_teams.buyAt)).limit(20);

    const playerHistoryTypeList: PlayerHistory[] = []

    playerHistoryList.map(p =>
        {playerHistoryTypeList.push({
            name: p.name,
            role: p.role,
            idFantacalcio: p.idFantacalcio,
            squadra: p.squadra,
            price: p.price,
            idTeam: p.idTeam,
            teamName: p.teamName
        })}
    )
    
    return (
        <div>
        <div className="grid">
            <div className="w-full">
                <div className="flex flex-col space-y-1.5 p-6 sticky top-0 bg-gray-100 z-10">
                    <h3 className="text-2xl font-bold text-center">Acquisti recenti</h3>
                </div>
            </div>
            <div className="pb-20 z-0">
                <div className="w-full">
                    <HistoryTable playerHistoryList={playerHistoryTypeList}></HistoryTable>
                </div>
            </div>
        </div>
        </div>
    );
}