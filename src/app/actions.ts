"use server"

import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Papa from 'papaparse';
import {db} from "~/server/db";
import { configs, players, players_teams, teams } from "~/server/db/schema";
import { CsvPlayer } from "~/utils/types";

export async function processCsv(
    prevState: {
        message: string;
      },
    formData: FormData
) {
    var file = formData.get("file") as File;
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const stringFile = fileBuffer.toString();

    let csvPlayers: CsvPlayer[] = [];

    const parsed = Papa.parse(
        stringFile, {
            dynamicTyping: true,
            header: false,
        }
    );

    parsed.data.map(row => {
        if (row instanceof Array) {
            csvPlayers.push(
                {
                    idFantacalcio: row.length >= 0 ? row[0] : 0 ,
                    name: row.length >= 1 ? row[1] : "Name not found",
                    role: row.length >= 3 ? row[3] : "Role not found",
                    team: row.length >= 9 ? row[9] : "Team not found",
                }
            )
        }
    })

    csvPlayers.map(async player => {
        await db.insert(players).values({idFantacalcio: player.idFantacalcio, name: player.name, role: player.role, squadra: player.team});
    })    

    return { message : "Diocane"}
}

export async function addPlayerToTeam(prevState: {formStatus: number,message: string;}, formData: FormData) {

    try {

        let idFantacalcioPlayer = formData.get('idFantacalcioPlayer');
        let idTeam = formData.get('idTeam');
        let price = formData.get('price');

        if (idFantacalcioPlayer === null) {
            return { formStatus: 1, message: "idFantacalcioPlayer è null" };
        }

        if (Number(idFantacalcioPlayer) <= 0) {
            return { formStatus: 1, message: "idFantacalcioPlayer deve essere maggiore di 1" };
        }

        if (idTeam === null) {
            return { formStatus: 1, message: "idTeam è null" };
        }

        if (Number(idTeam) <= 0) {
            return { formStatus: 1, message: "idTeam deve essere almeno 1" };
        }

        if (price === null) {
            return { formStatus: 1, message: "Inserire un prezzo" };
        }

        if (Number(price) < 0) {
            return { formStatus: 1, message: "Il prezzo deve essere almeno 0" };
        }

        const creditsConfig = await db.select({
            creditsConfig: configs.value
        }).from(configs).where(sql`${configs.id} = 1`);

        // Prendo a DB le configurazione.
        const dbAppConfigs = await db.query.configs.findMany();

        const isPlayerAlreadyBought = await db.select().from(players_teams).where(sql`${players_teams.idFantacalcio}=${idFantacalcioPlayer}`)

        if(isPlayerAlreadyBought.length > 0) {
            return { formStatus: 1, message: "Giocatore già acquistato" };
        }

        const playersTeamList = await db.select({
            idFantacalcio: players.idFantacalcio,
            name: players.name,
            role: players.role
        }).from(players_teams).fullJoin(players, eq(players_teams.idFantacalcio, players.idFantacalcio)).where(sql`${players_teams.idTeam}=${idTeam}`);

        const playerDb = await db.select({
            idFantacalcio: players.idFantacalcio,
            role: players.role,
        }).from(players).where(sql`${players.idFantacalcio}=${idFantacalcioPlayer}`)

        const roleMaxValue = dbAppConfigs.filter(conf => conf.name === playerDb.at(0)?.role).at(0)?.value
        const playersTeamsFilteredForRole = playersTeamList.filter(p => p.role === playerDb.at(0)?.role)

        console.log(playersTeamsFilteredForRole)
        
        if (roleMaxValue !== undefined && playersTeamsFilteredForRole.length >= roleMaxValue) {
            return { formStatus: 1, message: "Slot disponibili esauriti" };
        }


    // Risposta -> [ { creditsLeft: '427', D: '1', C: '0', A: '0' } ]

        const infoTeam = await db.select({
            creditsLeft: sql<number>`
                ${creditsConfig.at(0)?.creditsConfig} - SUM(CASE WHEN ${players_teams.price} IS NOT NULL THEN ${players_teams.price} ELSE 0 END)`,
            D: sql<number>`COUNT(CASE WHEN ${players.role} = 'D' THEN 1 END)`,
            C: sql<number>`COUNT(CASE WHEN ${players.role} = 'C' THEN 1 END)`,
            A: sql<number>`COUNT(CASE WHEN ${players.role} = 'A' THEN 1 END)`
        })
            .from(teams)
            .leftJoin(players_teams, eq(teams.id, players_teams.idTeam))
            .leftJoin(players, eq(players.idFantacalcio, players_teams.idFantacalcio))
            .where(sql`${teams.id}=${idTeam}`)
            .groupBy(teams.id);

        if (infoTeam && infoTeam.at(0) && Number(price) > infoTeam.at(0).creditsLeft) {
            return { formStatus: 1, message: "Crediti insufficienti" };
        }

        await db.insert(players_teams).values({ idFantacalcio: Number(idFantacalcioPlayer), idTeam: Number(idTeam), price: Number(price)});
        
    } catch (error) {
        return { formStatus: 1, message: "Internal server error. Riprovare" };
    }

    revalidatePath('/history')
    revalidatePath('/')
    return { formStatus: 2, message: "Operazione eseguita con successo" };
}