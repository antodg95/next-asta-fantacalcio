import { asc, eq, sql } from "drizzle-orm";

import Link from "next/link";
import { db } from "~/server/db";
import { configs, players, players_teams, teams } from "~/server/db/schema";

export default async function Teams() {
    const creditsConfig = await db
        .select({
            creditsConfig: configs.value,
        })
        .from(configs)
        .where(sql`${configs.id} = 1`);

    const teamsFull = 2;

    const infoTeams = await db
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
        .groupBy(teams.id)
        .orderBy(asc(sql`lower(${teams.name})`));

    return (
        <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6 mb-20">
            {infoTeams.map((infoTeam) => {
                return (
                    <Link href={"/teams/" + infoTeam.teamId} className="odd:bg-[#e0e7ff] even:bg-[#f5f5f5] border bg-card text-card-foreground relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
                        data-v0-t="card"
                        style={{ cursor: "pointer" }}>
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-[#4B5563]">{infoTeam.teamName}</h3>
                                    <div className="bg-[#4B5563] rounded-full px-3 py-1 text-white text-sm font-medium">
                                        {infoTeam.creditsLeft} Crediti
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="flex flex-col items-center">
                                        <div className="text-2xl font-bold text-[#4B5563]">{infoTeam.D}</div>
                                        <div className="text-sm text-[#6B7280]">Difensori</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-2xl font-bold text-[#4B5563]">{infoTeam.C}</div>
                                        <div className="text-sm text-[#6B7280]">Centrocampisti</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-2xl font-bold text-[#4B5563]">{infoTeam.A}</div>
                                        <div className="text-sm text-[#6B7280]">Attaccanti</div>
                                    </div>
                                </div>
                            </div>
                    </Link>
                );
            })}
        </section>
    );
}